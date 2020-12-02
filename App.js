import { BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component{
    render(){
      return(
        <BrowserRouter>
            <Switch>
                <Route path="/game" component={GamePage}/>
                <Route path="/" component={MainPage}/>
                <Route path="*" component={ErrorPage}/>
            </Switch>
        </BrowserRouter>
      );
    }
}

export default App;