
import React from 'react';
import {useHistory } from 'react-router-dom';
import RPSLS  from '../images/RPSLS.png'

function HomePage(){
    
    let history = useHistory();

    const handle1Player=(event)=>{
        event.preventDefault();
        history.push("/game?mode=computerplayer");
      }

    const handle2Player=(event)=>{
        event.preventDefault();
        history.push("/game?mode=player");
    }

    return(
        
        <div className="background-container">
            <div className="container">
                <div className="titulo" >
                    <p className="title-style">Piedra Papel Tijera Lagarto Spock</p>
                </div>
                <div className="results-container">
                    <div className="button-container">
                        <div className="sub-titulo"><span>Eleji un modo de juego</span><br/></div>
                        <div className="subcontainer">
                            <button type="button" onClick={handle1Player} className="button">1 Jugador  </button>
                            <button type="button" onClick={handle2Player} className="button">2 Jugadores</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;