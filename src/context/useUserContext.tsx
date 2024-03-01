import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../utils/interfaces/user';
import { getUsers } from '../utils/functions';

interface UserContextType {
  user: User | null;
  setUser: Function;
}

interface IUserContextProps {
  children: ReactNode;
}

const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: IUserContextProps) {
  const usernameLocalStorage = localStorage.getItem('user');
  const [users, setUsers] = useState([] as User[]);
  const foundUser =
    users.find((u) => u.username === usernameLocalStorage) ?? null;
  const [user, setUser] = useState<User | null>(foundUser);

  useEffect(() => {
    async function getUsersAPI() {
      const users = await getUsers();
      setUsers(users);
    }
    getUsersAPI();
  }, []);

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
