import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/interfaces/user";
import { useAuth0, User as userAuth } from "@auth0/auth0-react";

interface UserContextType {
  user: User | userAuth | undefined;
  setUser: Function;
  getAccessTokenSilently: () => Promise<string>;
}

interface IUserContextProps {
  children: ReactNode;
}

//Contexto
const UserContext = createContext({} as UserContextType);

//Provider, se pone en app abranzando routes
export function UserContextProvider(props: IUserContextProps) {
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState(auth0User);

  // useEffect(() => {
  //   if (auth0User) {
  //     setUser(auth0User);
  //   }
  // }, [auth0User]);

  useEffect(() => {
    console.log("el token se ha recargado", getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return (
    <UserContext.Provider value={{ user, setUser, getAccessTokenSilently }}>
      {props.children}
    </UserContext.Provider>
  );
}

//Hook, se usa en la app
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext  must be used within a DataContextProvider"
    );
  }

  return context;
}
