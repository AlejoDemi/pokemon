import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import PokemonTable from "./components/PokemonTable";

function App() {
  return (
    <Routes>
      <Route path="/"
      element={<PokemonTable></PokemonTable>}/>
    </Routes>
  );
}

export default App;
