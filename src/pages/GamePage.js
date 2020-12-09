
import React,{useState, useEffect } from 'react';
import { useLocation, useHistory  } from 'react-router-dom';

import './GamePage.css'
import State    from '../GameState.json';
import rock     from '../images/piedra.png'
import paper    from '../images/papel.png'
import scissors from '../images/tijera.png'
import lizard   from '../images/lagarto.png'
import spock    from '../images/spock.png'

function GamePage(){
    
    const location = useLocation();
    
    let history = useHistory();
    const [playerTurn, setPlayerTurn] = useState("");
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    const [turn, setTurn] = useState(1);
    const [turnCount, setTurnCount] = useState(1);
    const [resultsJson, setResultsJson] = useState({});
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [computerTurn, setComputerTurn] = useState(false);
    const [endgame, setEndgame] = useState(false);

    const resetElections = () => {
        State.electionP1 = "";
        State.electionP2 = "";
    }

    const resetScore = () => {
        State.score1 = 0;
        State.score2 = 0;
    }

    const saveChoice = (player, election) => {
        if (player == 1){
            State.electionP1 = election
        }
        else{
            State.electionP2 = election
        }
    }

    const updateScoreFor = player => {
        if (player == 1){
            State.score1 ++
        }
        else{
            State.score2 ++
        }
    }

    const updateScore = (result) => {
        console.log(result, getPlayer(2),getPlayer(1))
        if((result.winner == getPlayer(2))) {
            updateScoreFor(2);
            setScore2(getScore(2));
        } else if(result.winner == getPlayer(1)) {
            updateScoreFor(1); 
            setScore1(getScore(1));
        }
    }

    const getScore = player => {
        let res = State.score2;
        if (player == 1) {
            res = State.score1;
        }
        console.log(77, player, res)
        return res;
    }

    const getPlayer = number => {
        let res = State.player2;
        if (number == 1){
            res = State.player1
        }
        return res;
    }
    
    const configureMode = () => {
        if (mode == "player"){
            State.player1 = 'Jugador 1';
            State.player2 = 'Jugador 2';
        }
        else{
            State.player1 = 'Jugador';
            State.player2 = "Computador";
        }
    }
    
    const handleHomeClik = event=>{
        event.preventDefault();
        resetScore() 
        history.push("/");
    }

    const resetState = () => {
        resetElections();
        setEndgame(false);
        setPlayerTurn(getPlayer(1));
        setTurn(1);
        setTurnCount(1);
        setComputerTurn(false);
        setResultsJson({});
    }

    const handleClickRestart = () =>{
        resetScore() 
        history.push("/");
    }

    const togglePlay= play =>{
        switch(turn) {
            case 1: {
                saveChoice(1, play);
                setPlayerTurn(getPlayer(2));
                setTurn(2);
                
                if(getPlayer(2) === "Computador") {
                    setComputerTurn(true);
                    jugadaDePC();
                }
            } break; 

            default: {
                saveChoice(2, play);
            } break;
        }

        setTurnCount(turnCount+1);

        if(turnCount === 2) {
            let result = calcularResultadoDeJugadaParcial();
            setResultsJson(result);
            setEndgame(true);
            updateScore(result);
        }
    }

    const calcularResultadoDeJugadaParcial = ()=> {
        
        let resultado;
        let jugada1 = State.electionP1
        let jugada2 = State.electionP2
        
        /*Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors*/
        switch(jugada1){
            case 'Piedra':  {resultado = calcularResultadoDeJugadaFinal(jugada1, jugada2, 'Lagarto', 'Tijeras')}; break
            case 'Papel':   {resultado = calcularResultadoDeJugadaFinal(jugada1, jugada2, 'Piedra',  'Spock'  )}; break
            case 'Tijeras': {resultado = calcularResultadoDeJugadaFinal(jugada1, jugada2, 'Papel',   'Lagarto')}; break
            case 'Lagarto': {resultado = calcularResultadoDeJugadaFinal(jugada1, jugada2, 'Spock',   'Papel'  )}; break
            default:        {resultado = calcularResultadoDeJugadaFinal(jugada1, jugada2, 'Tijeras', 'Piedra' )};
        }
        return resultado
    }

    const calcularResultadoDeJugadaFinal = (jugada1, jugada2, opcion1, opcion2) => {
        let resultado;
        switch(jugada2){
            case opcion1: {resultado = {winner: State.player1, choice: jugada1}} break
            case opcion2: {resultado = {winner: State.player1, choice: jugada1}} break
            case jugada1: {resultado = {winner: false,         choice: jugada1}} break
            default:      {resultado = {winner: State.player2, choice: jugada2}} break
        }
        return resultado
    }

    const jugadaDePC = () => {
        let eleccion = randomInt1to5();
        switch(eleccion){
            case 0:  {pcEligio('Spock'   )} break
            case 1:  {pcEligio('Piedra'    )} break
            case 2:  {pcEligio('Papel'   )} break
            case 3:  {pcEligio('Tijeras')} break
            default: {pcEligio('Lagarto'  )}
        }
        setTimeout(() => {
            let result = calcularResultadoDeJugadaParcial();
            setResultsJson(result);
            setEndgame(true);
            console.log(190, result)
            updateScore(result);
        }, 1500);
    }

    const pcEligio= jugada => {
        State.electionP2 = jugada
    }

    useEffect(() => {
        configureMode(mode);
        setPlayerTurn(getPlayer(1));
        setScore1(getScore(1));
        setScore2(getScore(2));
        if(turn === 2) {
            setPlayerTurn(getPlayer(2));
        }
    }, []);

    function EndGameMsg(props){
        return(
            <div>
                {props.results.winner? 
                <div className="subcontainer">
                    <span>
                        HA GANADO EL {props.results.winner} !!!!
                    </span><br/>
                    <span>
                        El {props.results.winner} ganó eligiendo &ldquo;{props.results.choice}&ldquo;.
                    </span>
                </div>
                : 
                <div>
                    <span className="subcontainer">
                        HA OCURRIDO UN EMPATE!
                    </span><br/>
                    <span>
                        Eligieron &ldquo;{props.results.choice}&ldquo;.
                    </span>
                </div>
                }
            </div>
        ) 
    }

    return(
        <div className="background-container">
            <div className="container">
                <div className="game-titulo" >
                    <p>Piedra Papel Tijera Lagarto Spock</p>
                </div>
                <div className="score">
                    <div className="player-score-container">
                        <span>{getPlayer(1)}<br/>{score1}</span>
                    </div> 
                    <div className="player-score-container">
                        <span>{getPlayer(2)}<br/>{score2}</span>
                    </div> 
                </div>
                <div className="results-container">
                { !endgame ? (
                <div className="button-container">
                    { playerTurn.length?
                        <div className="subcontainer">
                            <span>Turno del {playerTurn}</span></div>
                        : <div></div>
                    }
                    <div className="px-12 py-8">
                        {computerTurn ? (
                            <div className="subcontainer">
                                <span><p>La Computadora está pensando. Espere por favor...</p></span> 
                            </div>
                        ) : (
                            <div className="subcontainer">
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
                        )}
                    </div>
                </div>
                ) : (
                <div className="button-container">
                    <EndGameMsg results={resultsJson} />
                    <button className="button" onClick={() => resetState()}>
                        Jugar otra Ronda
                    </button>
                    <button className="button" onClick={() => handleClickRestart()}>
                        Jugar una Nueva Partida
                    </button>
                </div>
                )}
                </div>
                <div className="return-container">
                    <button type="button" onClick={handleHomeClik} className="button">Regresar</button>
                </div>  
            </div>
        </div>
    );
}
function randomInt1to5() {
    return Math.floor(Math.random() * 5);
}

export default GamePage;