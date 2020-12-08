
import React,{useState} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
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
                <div className="subcontainer">Elija un modo de juego</div>
                <div className="subcontainer">
                    <button type="button" onClick={handle1Player} className="btn btn-link register-footer">1 Jugador  </button>
                    <button type="button" onClick={handle2Player} className="btn btn-link register-footer">2 Jugadores</button>
                </div>
                <div className="subcontainer">
                    <img className="rpsls" alt="help" src={RPSLS}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;