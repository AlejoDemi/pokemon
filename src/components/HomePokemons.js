import React from 'react';
import "./HomePokemons.css";
import {useNavigate} from "react-router-dom";

const HomePokemons = (props) => {

    const navigate=useNavigate();

    const goToData=()=>{
        navigate("/data/"+props.id)
    }

    return (
        <div className="card">
            { props.image?
                <button onClick={goToData}>
                    <img src={props.image}  alt="Loaging..."/>
                </button>
                : null
            }
        </div>

    );
};

export default HomePokemons;
