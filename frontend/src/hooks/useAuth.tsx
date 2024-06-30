import { ReactNode, createContext, useMemo, useState } from "react";
import { User } from "../types";

interface AuthState {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => {
    const login = async (data: User) => {
      setUser(data);
    };

    const logout = () => {
      setUser(null);
    };

    return {
      user,
      login,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
