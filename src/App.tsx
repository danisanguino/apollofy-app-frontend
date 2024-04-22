import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/approutes';
import { UserContextProvider } from './context/useUserContext';
import { SongContextProvider } from './context/useSongContext';
import { Auth0Provider } from '@auth0/auth0-react';

const {
  VITE_AUTH0_DOMAIN: domain,
  VITE_AUTH0_CLIENT_ID: clientId,
  VITE_AUTH0_AUDIENCE: audience,
} = import.meta.env;

function App() {
  return (
    <SongContextProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin + '/welcome',
        }}
      >
        <UserContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserContextProvider>
      </Auth0Provider>
    </SongContextProvider>
  );
}

export default App;
