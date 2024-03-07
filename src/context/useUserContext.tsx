import { ReactNode, createContext, useContext, useState } from 'react';
import { User } from '../utils/interfaces/user';

interface UserContextType {
  user: User;
  setUser: Function;
}

interface IUserContextProps {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: IUserContextProps) {
  const usernameLocalStorage = localStorage.getItem('user')!;
  const [user, setUser] = useState<User>(JSON.parse(usernameLocalStorage));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserContext  must be used within a DataContextProvider'
    );
  }

  return context;
}
