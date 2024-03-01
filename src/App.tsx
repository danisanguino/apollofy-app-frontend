import './App.css';
import { Inputs } from './components/global/inputs';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <Inputs name="Dani" placeholder='Insert name'/>
      <Home />
    </>
  );
}

export default App;
