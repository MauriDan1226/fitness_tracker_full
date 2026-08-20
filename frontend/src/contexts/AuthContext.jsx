import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../utils/api';

const TOKEN_KEY = 'jwt';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [currentUser, setCurrentUser] = useState(null);
  // mientras se comprueba el token guardado no se pinta ninguna ruta protegida
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  // al abrir la aplicacion se recupera la sesion si hay un token valido
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) return;

    api
      .getCurrentUser(savedToken)
      .then((user) => {
        setCurrentUser(user);
        setToken(savedToken);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setCurrentUser(null);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const saveSession = useCallback((data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setCurrentUser(data.user);
  }, []);

  const register = useCallback(
    async (credentials) => {
      const data = await api.signup(credentials);
      saveSession(data);
      return data.user;
    },
    [saveSession],
  );

  const login = useCallback(
    async (credentials) => {
      const data = await api.signin(credentials);
      saveSession(data);
      return data.user;
    },
    [saveSession],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCurrentUser(null);
  }, []);

  const updateUser = useCallback(
    async (updates) => {
      const user = await api.updateProfile(updates, token);
      setCurrentUser(user);
      return user;
    },
    [token],
  );

  const value = useMemo(
    () => ({
      token,
      currentUser,
      isLoggedIn: Boolean(token && currentUser),
      isCheckingAuth,
      register,
      login,
      logout,
      updateUser,
    }),
    [token, currentUser, isCheckingAuth, register, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
