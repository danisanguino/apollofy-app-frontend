import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/approutes';
import { UserContextProvider } from './context/useUserContext';
import { SongContextProvider } from './context/useSongContext';

function App() {
  return (
    <UserContextProvider>
      <SongContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SongContextProvider>
    </UserContextProvider>
  );
}

export default App;
