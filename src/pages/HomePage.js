
import React from 'react';
import {useHistory } from 'react-router-dom';
import './HomePage.css'

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

      const help=(event)=>{
          event.preventDefault();
          history.push("/help");
      }

    return(
        <div className="background-container">
            <div className="container">
                <div className="titulo">
                    <p>Piedra Papel Tijera Lagarto Spock</p>
                </div>
                <div className="results-container">
                    <div className="button-container">
                        <div className="sub-titulo"><span>Elegí un modo de juego</span><br/></div>
                        <div className="subcontainer">
                            <button type="button" onClick={handle1Player} className="button">1 Jugador  </button>
                            <button type="button" onClick={handle2Player} className="button">2 Jugadores</button>
                        </div>
                    </div>
                </div>
                <div className="container">
                <button type="button" onClick={help} className="button">Ayuda</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;