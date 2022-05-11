import "./PokemonTable.css"
import {gql} from 'graphql-tag'
import {useLazyQuery, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import Spinner from "./Spinner";

const PokemonTable = () => {

    const GET_POKEMONS = gql`
        query getPokemos {
            pokemon_v2_pokemonspecies(offset: 0, limit: 25, order_by: {id: asc}) {
        capture_rate
        id
        is_legendary
        name
        is_mythical
        generation_id
      }
    }`;

    const[list ,setList] = useState([
        {name:"Pikachu"},
        {name:"Charmander"}
    ]);

    const [getPokemonList,{data,loading}]=useLazyQuery(GET_POKEMONS,
        {
            onCompleted:  r => {
                setList(r.pokemon_v2_pokemonspecies)
            },
    });

    useEffect(() => {
        getPokemonList().then(r => r);
    },[]);


    const listPokemons=list.map((pokemon,index)=> <button className="item" key={index}>{pokemon.name}</button>);

    return (
        !loading?
        <div className="container">
            <h1>CokemonPedia</h1>
            <input className="searchBar" placeholder="Search your Pokemon..."></input>
            <div className="list">
                {listPokemons}
            </div>
        </div>:
            <Spinner></Spinner>
    );
};

export default PokemonTable;
