import "./App.css";
import { Buttons } from "./components/global/button";
import { Inputs } from './components/global/inputs';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <h1>APP</h1>
      <Buttons />
      <Inputs name="Dani" placeholder='Insert name'/>
      <Home />
    </>
  );
}

export default App;
