import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import PokemonTable from "./components/PokemonTable";
import PokemonData from "./components/PokemonData";

function App() {
  return (
    <Routes>
      <Route path="/"
      element={<PokemonTable></PokemonTable>}/>

        <Route path="/data/:id"
      element={<PokemonData></PokemonData>}/>

    </Routes>
  );
}

export default App;
