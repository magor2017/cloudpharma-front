import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Vente from './vente';
import Historique from './historique';
import './content.css';
class Content extends Component {
    constructor(){
        super();
        this.state={
            level:sessionStorage.getItem("level")==="1"?"/vendeur":"/superviseur",
        }
    }
    
   
    render() { 
        return ( 
            <Router>
                <div style={{border:"2px solid white",textAlign:"center"}}>
                    <div onClick={(event)=>this.hideAutocom(event)}>
                        <div id="enteteVente">
                            <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                            <span>Vente</span>
                        </div>
                    </div>
                    <div id="menu">
                        <div>
                            <Link to={this.state.level+"/vente/content"}><i class="fas fa-shopping-cart fa-2x"></i>Vente</Link>
                        </div>
                        <div>
                            <Link to={this.state.level+"/vente/content/historique"}><i class="fas fa-history fa-2x"></i>Historique</Link>
                        </div>
                    </div>
                    
                        <Switch>
                            <Route exact path={this.state.level+"/vente/content/historique"} component={Historique} />
                            <Route exact path={this.state.level+"/vente/content"} component={Vente} />
                        </Switch>
                    
                </div>
            </Router>
         );
    }
}
 
export default Content;

