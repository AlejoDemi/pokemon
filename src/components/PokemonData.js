import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gql} from "graphql-tag";
import {useLazyQuery} from "@apollo/client";
import "./PokemonData.css";
import Spinner from "./Spinner";



const PokemonData = (props) => {

    const {id}=useParams();

    const [pokemon,setPokemon] = useState();

    const GET_POKEMON_BY_ID =gql `
        query getPokemon ($pokeId:Int) {
          pokemon_v2_pokemon(where: {id: {_eq: $pokeId}}) {
            id
            name
            height
            base_experience
            order
            pokemon_species_id
            is_default
            weight
          }
        }
        `

    const [getPokemon,{loading}]=useLazyQuery(GET_POKEMON_BY_ID,
        {
            onCompleted: r => {
                setPokemon(r.pokemon_v2_pokemon[0])
            }
        });


    useEffect(()=>{
        getPokemon({variables:{pokeId:id}}).then(r => r);


    },[id]);

        return (
            pokemon &&
            !loading?
                <div className="pokemonInfo">
                    <h1>{pokemon.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}/>
                    <div className="dataContainer">
                        <h3 className="data">-id: {pokemon.id}</h3>
                        <h3 className="data">-height: {pokemon.height}</h3>
                        <h3 className="data">-weight: {pokemon.weight}</h3>
                        <h3 className="data">-base experience: {pokemon.base_experience}</h3>
                        <h3 className="data">-order: {pokemon.order}</h3>
                        <h3 className="data"></h3>
                    </div>

                </div>

           :
                <Spinner></Spinner>
        );
    };

export default PokemonData;
