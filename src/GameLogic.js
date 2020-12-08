import Lang from "./English.json"
import State from './GameState.json';

const GameLogic={

    calcularResultadoDeJugadaParcial(){
        let resultado;
        let jugada1 = State.electionP1
        /*Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors*/
        switch(jugada1){
            case Lang.rock:     {resultado = this.calcularResultadoDeJugadaFinal(Lang.lizard,   Lang.scissors)}; break
            case Lang.paper:    {resultado = this.calcularResultadoDeJugadaFinal(Lang.rock,     Lang.spock   )}; break
            case Lang.scissors: {resultado = this.calcularResultadoDeJugadaFinal(Lang.paper,    Lang.lizard  )}; break
            case Lang.lizard:   {resultado = this.calcularResultadoDeJugadaFinal(Lang.spock,    Lang.paper   )}; break
            case Lang.spock:    {resultado = this.calcularResultadoDeJugadaFinal(Lang.scissors, Lang.rock    )}; break
        }
        return resultado
    },
 
    calcularResultadoDeJugadaFinal(opcion1, opcion2){
        let resultado;
        let jugada1 = State.electionP1
        let jugada2 = State.electionP2

        switch(jugada2){
            case opcion1: {resultado = {winner: State.player1, choice: State.electionP1}} break
            case opcion2: {resultado = {winner: State.player1, choice: State.electionP1}} break
            case jugada1: {resultado = {winner: "Tie",         choice: State.electionP1}} break
            default:      {resultado = {winner: State.player2, choice: State.electionP2}} break
        }
        return resultado
    },

    jugadaDePC(){
        let eleccion = randomInt1to5();
        switch(eleccion){
            case 0: {this.pcEligio(Lang.spock   )} break
            case 1: {this.pcEligio(Lang.rock    )} break
            case 2: {this.pcEligio(Lang.paper   )} break
            case 3: {this.pcEligio(Lang.scissors)} break
            case 4: {this.pcEligio(Lang.lizard  )} break
        }
    },

    pcEligio(jugada){
        State.electionP2 = jugada
    }
}

function randomInt1to5() {
    return Math.floor(Math.random() * 5);
}
