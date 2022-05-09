import "./PokemonTable.css"
import {gql} from 'graphql-tag'
import {useLazyQuery, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import Spinner from "./Spinner";

const PokemonTable = () => {

    const GET_POKEMONS = gql`
        query getPokemos {
            pokemon_v2_pokemonspecies(offset: 10, limit: 10, order_by: {id: asc}) {
        capture_rate
        id
        is_legendary
        name
        is_mythical
        generation_id
      }
    }`;

    const[list ,setList] = useState([]);

    const [getPokemonList,{loading}]=useLazyQuery(GET_POKEMONS,
        {
            onCompleted:  r => setList(r.data.pokemon_v2_pokemonspecies),
    });

    useEffect(() => {
        getPokemonList().then(r => r);
    },[]);


    const listPokemons=list.map((pokemon,index)=> <button className="item" key={index}>{index+1}- {pokemon.name}</button>);

    return (
        !loading?
        <div className="container">
            <h1>Cokemon Pedia</h1>
            <input className="searchBar" placeholder="Search your Pokemon..."></input>
            <div className="list">
                {listPokemons}
            </div>
        </div>:
            <Spinner></Spinner>
    );
};

export default PokemonTable;
