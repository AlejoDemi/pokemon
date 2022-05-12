import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gql} from "graphql-tag";
import {useLazyQuery} from "@apollo/client";
import {compact} from "@apollo/client/utilities";
import "./PokemonData.css";



const PokemonData = (props) => {

    const {id}=useParams();

    const [pokemon,setPokemon] = useState();

    const GET_POKEMON_BY_ID =gql `
        query loadAPokemon ($pokeId: Int) {
          pokemon_v2_pokemonspeciesname(where: {id: {_eq: $pokeId}}) {
            pokemon_v2_pokemonspecy {
              base_happiness
              is_legendary
              is_mythical
              generation_id
              name
            }
         
          }
        }
        `

    const [getPokemon,{loading}]=useLazyQuery(GET_POKEMON_BY_ID,
        {
            onCompleted: r => {
                setPokemon(r)
            }
        });

    useEffect(()=>{
        getPokemon({variables:{pokeId:id}}).then(r => console.log(r.data));

    },[id]);

        return (
                <div className="card">
                    { props.image?
                    <img src={props.image}  alt="Loaging..."/>:
                        null
                    }
                </div>

        );
    };

export default PokemonData;
