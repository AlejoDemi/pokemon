import "./PokemonTable.css"
import {gql} from 'graphql-tag'
import {useLazyQuery, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import Spinner from "./Spinner"
import {useNavigate} from "react-router-dom";
import PokemonData from "./PokemonData";
import HomePokemons from "./HomePokemons";

const PokemonTable = () => {

    const navigate=useNavigate();
    const [search,setSearch] = useState("");

    const GET_POKEMONS = gql`
        query getPokemos {
            pokemon_v2_pokemonspecies(offset: 0, limit: 10000, order_by: {id: asc}) {
        id
        name
      }
    }`;

    const[list ,setList] = useState([
        {name:"Pikachu"},
        {name:"Charmander"}
    ]);

    const [getPokemonList,{loading}]=useLazyQuery(GET_POKEMONS,
        {
            onCompleted:  r => {
                setList(r.pokemon_v2_pokemonspecies)
            },
    });

    useEffect(() => {
        getPokemonList().then(r => r);
    },[]);


    const listPokemons=
        search.length>0? list.filter((val)=> {
          if (search==="")return val;
          else if (val.name.toLowerCase().includes(search.toLowerCase()))return val
        }).map((pokemon,index)=>
        (index<10 && <button className="item" key={index} onClick={()=>navigate("/data/"+pokemon.id)}>{pokemon.id} {pokemon.name}</button>)):null;

    return (
        !loading?
        <div className="container">
            <div className="header">
                <h1>CokemonPedia</h1>
                <input className="searchBar"  type="text" placeholder="Search your Pokemon..."
                       onChange={(e)=> setSearch(e.target.value)}></input>
            </div>
            <div className="body">


            {
                search==="" ?
                    <div className="containerData">
                        <HomePokemons image="http://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png" id="25"></HomePokemons>
                        <HomePokemons image="https://www.pngmart.com/files/13/Charmander-PNG-HD.png" id="4"></HomePokemons>
                        <HomePokemons image="http://assets.stickpng.com/images/580b57fcd9996e24bc43c31a.png" id="1"></HomePokemons>
                        <HomePokemons image="https://i.pinimg.com/originals/1f/55/53/1f55538dc19bc9d31b5844a4fd7b704e.png" id="7"></HomePokemons>
                    </div>
                    :
                    <div className="list">
                        {listPokemons}
                    </div>

            }
            </div>

        </div>
            :
            <Spinner></Spinner>
    );
};


export default PokemonTable;
