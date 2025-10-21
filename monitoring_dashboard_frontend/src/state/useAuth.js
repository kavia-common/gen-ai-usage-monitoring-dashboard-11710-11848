import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { generateMockToken, isSessionValid, restoreSession, persistSession, clearSession } from '../services/auth';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  expiresAt: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_SESSION':
      return { ...state, ...action.payload, loading: false };
    case 'LOGIN':
      return { ...state, ...action.payload, error: null };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    case 'ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app and provides mock authentication:
 * - Users: admin@example.com, viewer@example.com
 * - Password is required to be at least 6 chars (mock, not validated server-side)
 * - Session persists to localStorage with 8h expiry
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore persisted session on load
  useEffect(() => {
    const session = restoreSession();
    if (session && isSessionValid(session)) {
      dispatch({ type: 'RESTORE_SESSION', payload: { ...session, loading: false } });
    } else {
      clearSession();
      dispatch({ type: 'RESTORE_SESSION', payload: { user: null, token: null, expiresAt: null } });
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    try {
      const allowed = ['admin@example.com', 'viewer@example.com'];
      if (!email || !allowed.includes(email.toLowerCase())) {
        throw new Error('Invalid email. Use admin@example.com or viewer@example.com.');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters (mock requirement).');
      }
      const { token, expiresAt } = generateMockToken(email);
      const user = { email };
      const session = { user, token, expiresAt };
      persistSession(session);
      dispatch({ type: 'LOGIN', payload: session });
      return session;
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e.message });
      throw e;
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    clearSession();
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
