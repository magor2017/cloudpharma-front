import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil  from './components/vendeur/accueil';
import Login  from './components/login/login';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import Content from './components/vendeur/content';
import Connexion from './components/login/connexion';
import AcceuilSup from './components/superviseur/acceuil';

class App extends Component {
  state = {  }
   
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Connexion} />
          <Route exact path="/vendeur" component={Accueil} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/superviseur" component={AcceuilSup} />
        </Switch>
      </Router>
     );
  }
}
 
export default App;

/*
<Router>
        <Switch>
          <Route exact path="/" component={Connexion} />
          <Route exact path="/vendeur" component={Accueil} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
function Ap() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Connexion} />
          <Route exact path="/vendeur" component={Accueil} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
  );
}
function Connexion(){
  return(
    <div className="container">
        <div className="row">
          <div className="col-12">
              <div className="row btncnrow" >
                <div className="col-12">
                    <button>CONNEXION</button>
                </div>
              </div>
              <div className="row vrtlinerow" >
                  <div className="col-6 colon1">
        
                  </div>
                  <div className="col-6 colon2">
          
                  </div>
              </div>
              <div className="row ">
                  <div className="col-2 ">
                  </div>
                  <div className="col-8 ">
                      <div className="row srvlinerow">
                        <div className="col-4">
                            <span><b>GESTION DE STOCK</b></span>
                        </div>
                        <div className="col-4">
                            <span><b>GESTION DE VENTE</b></span>
                        </div>
                        <div className="col-4">
                            <span><b>GESTION DE CIENTS</b></span>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <Link to="/login" >login bi fiila</Link>
        <br/>
        <Link to="/vendeur" >espace vendeur</Link>
    </div>
    
  )
}

export default App;*/
