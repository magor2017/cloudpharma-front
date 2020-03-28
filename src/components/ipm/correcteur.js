import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import MesCorrecteur from './mescorrecteur';
import NewCorrecteur from './newCorrecteur';
import link from '../link';
class Correcteur extends Component {
    constructor(){
        super();
        
    }
    
    
    render() { 
        return ( 
            <Router>
                <div>
                    <div>
                        <ul>
                            <li><Link to="/ipm/correcteur">Mes correcteurs</Link></li>
                            <li><Link to="/ipm/correcteur/newcorrecteur"> Ajouter correcteur</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/ipm/correcteur" component={MesCorrecteur} />
                        <Route exact path="/ipm/correcteur/newcorrecteur" component={NewCorrecteur} />
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default Correcteur;