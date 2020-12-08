
import State from '../GameState.json';
import React,{useState} from 'react';
import { useLocation, useHistory  } from 'react-router-dom';

import './GamePage.css'
import Lang from "../English.json"
import rock  from '../images/piedra.png'
import paper   from '../images/papel.png'
import scissors  from '../images/tijera.png'
import lizard from '../images/lagarto.png'
import spock   from '../images/spock.png'

function GamePage(){
    
    const location = useLocation();
    
    let history = useHistory();
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    const [turn, setTurn] = useState(1);

    const verificarGanador = content =>{}

    const configureMode = () => {
        switch(mode) {
            case "player": {
                State.player1 = 'Jugador 1';
                State.player2 = 'Jugador 2';
            } break;
            case "computer": {
                State.player1 = 'Jugador';
                State.player2 = "Computador";
            }
        }
    }
    const handleHomeClik = event=>{
        event.preventDefault();
        history.push("/");
    }
    const togglePlay= (play) =>{
        switch(turn) {
            case 1: {
                State.electionP1 = play
                
                if(State.player2 === "Computador") {
                    jugadaDePC();
                }
            } break; 

            case 2: {
                State.electionP2 = play;
            } break;
        }
    }

    const jugadaDePC = () => {
        let eleccion = randomInt1to5();
        switch(eleccion){
            case 0: {this.pcEligio(Lang.spock   )} break
            case 1: {this.pcEligio(Lang.rock    )} break
            case 2: {this.pcEligio(Lang.paper   )} break
            case 3: {this.pcEligio(Lang.scissors)} break
            case 4: {this.pcEligio(Lang.lizard  )} break
        }
    }

    const pcEligio= jugada => {
        State.electionP2 = jugada
    }

    return(
        <div className="background-container">
            <div className="container">
                <div className="game-titulo" >
                    <p className="title-style">Piedra Papel Tijera Lagarto Spock</p>
                </div>
                <div className="subcontainer">Elija un modo de juego</div>
                <div className="subcontainer">
                    <div className="flex justify-center">
                        <img className="selection" alt="Piedra" 
                            src={rock} onClick={() => togglePlay("Piedra")}/>
                        <img className="selection" alt="Papel" 
                            src={paper} onClick={() => togglePlay("Papel")}/>
                        <img className="selection" alt="Tijeras" 
                            src={scissors} onClick={() => togglePlay("Tijeras")}/>
                        <img className="selection" alt="Lagarto" 
                            src={lizard} onClick={() => togglePlay("Lagarto")}/>
                        <img className="selection" alt="Spock" 
                            src={spock} onClick={() => togglePlay("Spock")}/>
                    </div>
                </div>
                <div className="return-container">
                    <button type="button" onClick={handleHomeClik} className="btn btn-link register-footer">Regresar</button>
                </div>  
            </div>
        </div>
    );
}
function randomInt1to5() {
    return Math.floor(Math.random() * 5);
}

export default GamePage;