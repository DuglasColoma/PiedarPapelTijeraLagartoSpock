
import React from 'react';
import {useHistory } from 'react-router-dom';
import RPSLS  from '../images/RPSLS.png'
import './HelpPage.css'

function HelpPage(){
    
  let history = useHistory();
  
    
  const handleHomeClik = event=>{
    event.preventDefault();
    history.push("/");
}


  return(
    <div className="background-container">
        <div className="container">
          <div className="titulo" >
              <p>Piedra Papel Tijera Lagarto Spock</p>
          </div>
          <div className="ayuda-container" >
            <img className="ayuda-image" alt="Ayuda" src={RPSLS}/>
          </div>
        </div>
        <div className="return-container">
            <button type="button" onClick={handleHomeClik} className="button">Regresar</button>
        </div>  
    </div>
    );
}

export default HelpPage;