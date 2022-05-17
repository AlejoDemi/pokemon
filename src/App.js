import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from "./components/screens/Home/Home";
import PokemonData from "./components/screens/card/PokemonData";
import ItemData from "./components/screens/card/ItemData";

function App() {

  return (
    <Routes>
      <Route path="/"
               element={<Home></Home>}/>

        <Route path="/data/pokemon/:data"
               element={<PokemonData></PokemonData>}/>

        <Route path="/data/item/:data"
               element={<ItemData></ItemData>}/>

    </Routes>
  );
}

export default App;
