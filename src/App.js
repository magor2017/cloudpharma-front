import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './components/vendeur/accueil';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import Content from './components/vendeur/content';


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/vendeur" component={Accueil} />
        </Switch>
    </Router>
  );
}
function Login(){
  return(
    <p>login bi fiila</p>
  )
}

export default App;
