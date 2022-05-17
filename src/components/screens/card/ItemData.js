import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_ITEM_BY_ID} from "../../../Queries/PokemonQueries";
import Spinner from "../../common/Spinner";
import {AiFillHome} from "react-icons/ai";

const ItemData = () => {

    const navigate=useNavigate();
    const {data}=useParams();
    const [item,setItem] = useState([]);

    const [getItem ,{loading}]= useLazyQuery(GET_ITEM_BY_ID,
        {
            onCompleted:r => {
                setItem(r.pokemon_v2_item[0])
            }
        })

    useEffect(()=>{
        getItem({variables:{itemId:data}}).then(r=>r);
    },[data]);

    return (

         loading?
                <Spinner></Spinner> :
                <div className={"pokemonInfo"}>
                    <div className={"header"}>
                        <AiFillHome onClick={()=>navigate("/")} size={30} className={"icon"}></AiFillHome>
                    </div>
                    <div className={"itemCard"}>
                        <div className="name">
                            <h1>{item.name}</h1>
                        </div>
                        <div className="imageContainer">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}/>
                        </div>
                        <div className="pokeData">
                            <div>
                                <h3 >-cost: {item.cost}</h3>
                            </div>
                        </div>

                    </div>
                </div>




    );
};

export default ItemData;
