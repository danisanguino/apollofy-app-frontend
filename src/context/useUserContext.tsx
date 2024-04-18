import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../utils/interfaces/user';
import { useAuth0 } from '@auth0/auth0-react';

interface UserContextType {
  user: User | any;
  setUser: Function;
}

interface IUserContextProps {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: IUserContextProps) {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState(auth0User);

  useEffect(() => {
    setUser(auth0User);
  }, [auth0User]);

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
