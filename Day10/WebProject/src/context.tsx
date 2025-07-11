import { createContext } from 'react';

// Nếu muốn đơn giản: user chỉ là string hoặc null
export type user = string | null;

type LoginContextType = {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>>;
};

export const LoginContext = createContext<LoginContextType>({
  user: null,
  setUser: () => {},
});
