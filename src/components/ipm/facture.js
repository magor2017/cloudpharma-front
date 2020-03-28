import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import ListeFacture from './listeFacture';
import Historique from './historique';
class Facture extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <div>
                <div>
                    <ul>
                        <li><Link to="/ipm" >facture en cour de traitement</Link></li>
                        <li><Link to="/ipm/historique" >historique</Link></li>
                    </ul>
                </div>
                    <Switch>
                        <Route exact path="/ipm" component={ListeFacture} />
                        <Route exact path="/ipm/historique" component={Historique} />
                    </Switch>
                </div>

            </Router>
            
         );
    }
}
 
export default Facture;