import "./Home.css"
import {useLazyQuery, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import Spinner from "../../common/Spinner"
import {useNavigate} from "react-router-dom";
import HomePokemons from "./HomePokemons";
import {GET_POKEMONS,GET_ITEMS} from "../../../Queries/PokemonQueries";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = (props) => {
    const navigate=useNavigate();
    const [search,setSearch] = useState("");
    const[pokemonList ,setPokemonList] = useState([]);
    const[itemList ,setItemList] = useState([]);

    const [getPokemonList]=useLazyQuery(GET_POKEMONS,
        {
            onCompleted:  r => {
                setPokemonList(r.pokemon_v2_pokemonspecies)
            },
    });

    const [getItemsList ,{loading}] = useLazyQuery(GET_ITEMS,
        {
            onCompleted: r=> {
                setItemList(r.pokemon_v2_item)
            }
        })


    useEffect(() => {
        getPokemonList().then(r => r);
        getItemsList().then(r=>r);
    },[]);



    const goToData=(feature)=>{
        if(feature.is_baby!==undefined) navigate("/data/pokemon/"+feature.id);
        else navigate("/data/item/"+feature.id);

    }


    const listPokemons=
        search.length>0? pokemonList.concat(itemList).filter((val)=> {
          if (search==="")return val;
          else if (val.name.toLowerCase().includes(search.toLowerCase()))return val
        }).map((feature,index)=>
        (index<10 && <button className="item" key={index} onClick={()=>goToData(feature)}>{feature.name}</button>)):null;

    return (
        !loading?
        <div className="container">
            <div className="headerHome">
                <h1>PokemonPedia</h1>
                <input className="searchBar"  type="text" placeholder="Search your Pokemon..."
                       onChange={(e)=> setSearch(e.target.value)}></input>
            </div>
            <div className="body">


            {
                search==="" ?
                    <Carousel className={"carousel"} interval={3000} showArrows={false} showIndicators={false} showThumbs={false} autoPlay={true} autoFocus={true} infiniteLoop={true} showStatus={false}>
                        <div>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}/>
                        </div>
                        <div>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}/>
                        </div>
                        <div>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}/>
                        </div>
                        <div>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" }/>
                        </div>
                    </Carousel>

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


export default Home;
