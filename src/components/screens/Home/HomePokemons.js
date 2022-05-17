import React from 'react';
import "./HomePokemons.css";
import {useNavigate} from "react-router-dom";

const HomePokemons = (props) => {

    const navigate=useNavigate();


    return (
        <div className="card">
            { props.image?
                <img src={props.image}  alt="Loading..."/>
                : null
            }
        </div>

    );
};

export default HomePokemons;
