
import React,{useState} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import GamePage  from './Page/GamePage.js'
import HomePage  from './Page/HomePage.js'
import ErrorPage from './Page/ErrorPage.js'

class App extends React.Component{
    render(){
      return(
        <BrowserRouter>
            <Switch>
                <Route path="/game" component = {GamePage }/>
                <Route path="/"     component = {HomePage }/>
                <Route path="*"     component = {ErrorPage}/>
            </Switch>
        </BrowserRouter>
      );
    }
}

export default App;