import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import "./FeatureData.css";
import Spinner from "../../common/Spinner";
import {GET_EVOLUTION_CHAIN, GET_POKEMON_BY_ID} from "../../../Queries/PokemonQueries"
import {AiFillHome} from "react-icons/ai";



const PokemonData = () => {

    const navigate=useNavigate();
    const {data}=useParams();
    const[showBack , setShowBack] = useState(false);
    const [pokemon,setPokemon] = useState([]);
    const [evolutionList ,setEvolutionList]= useState([]);


    const [getEvolution] = useLazyQuery(GET_EVOLUTION_CHAIN,
        {
            onCompleted:r =>{
                setEvolutionList (r.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies)
            }
        })



    const [getPokemon,{loading}]=useLazyQuery(GET_POKEMON_BY_ID,
        {
            onCompleted: r => {
                setPokemon(r.pokemon_v2_pokemon[0])
                getEvolution({variables:{id:r.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.evolution_chain_id}})
            }
        });


    const evolvePokemon =() =>{
        const index = evolutionList.findIndex(p=>p.id===pokemon.id);
        if (index!== -1 && index<evolutionList.length-1) navigate("/data/pokemon/"+evolutionList[index+1].id);
    }


    useEffect(()=>{
        getPokemon({variables:{pokeId:data}}).then(r => r);
        },[data]);




    const toggleBack=()=>{
        setShowBack(!showBack)
    }


    return (
            pokemon &&
                (!loading)?
                <div className="pokemonInfo">
                    <div className={"header"}>
                        <AiFillHome onClick={()=>navigate("/")} size={30} className={"icon"}></AiFillHome>
                    </div>
                        <div className={"pokeCard"}>
                            <div className="name">
                                    <h1>{pokemon.name}</h1>

                            </div>
                            <div className="imageContainer">
                                {showBack ?
                                    <img onMouseEnter={toggleBack} onMouseLeave={() => setShowBack(false)}
                                         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data}.png`}/> :
                                    <img onMouseEnter={toggleBack}
                                         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data}.png`}/>
                                }
                                {
                                }
                            </div>


                            <div className="pokeData">
                                    <div>
                                    <h3 >-height: {pokemon.height}</h3>
                                    <h3 >-weight: {pokemon.weight}</h3>
                                    <h3 >-base experience: {pokemon.base_experience}</h3>
                                    <h3 >-order: {pokemon.order}</h3>
                                        <button onClick={evolvePokemon}>Evolve</button>
                                    </div>
                            </div>

                        </div>
                </div>

           :
                <Spinner></Spinner>
        );
    };

export default PokemonData;
