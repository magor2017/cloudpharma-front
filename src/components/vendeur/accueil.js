import React, { Component } from 'react';
import Content from './content';
import {BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';

class Accueil extends Component {
    constructor(){
        super();
        
    }
    state = { 
        menu:[
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-history fa-2x"></i></div>
                <a style={{"display":"inline-block"}}><Link to="/vendeur/ac" >Historique</Link></a>
            </div>,
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-headset fa-2x"></i></div>
                <a style={{"display":"inline-block"}}>Support</a>
           </div>,
           
        ]
     }
     
     Menu(){

    }
    entete(){
        return(
            <div style={{"backgroundColor":"white","color":"#066A74","padding":"20px"}}>
                <span>CLOUDPHARMA</span>
            </div>
        );
    }
    heade(){
        return(
            <div style={{"color":"white","backgroundColor":"red","padding":"20px","textAlign":"center"}}>
                <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
                <span>Deconnexion</span>
            </div>
        );

    }
    render() { 
        return ( 
            <Router>
                <div className="row">
                    <div style={{"padding":"0px"}}  className="col-lg-2 col-md-2 col-xs-2 col-sm-2">{this.entete()}<div>{this.state.menu}</div>{this.heade()}</div>
                    <div  className="col-lg-9 col-md-9 col-xs-9 col-sm-9">
                        <Switch>
                            <Route exact path="/vendeur" component={P} />
                            <Route exact path="/vendeur/login" component={Login} />
                            <Route exact path="/vendeur/ac" component={Ac} />
                        </Switch>
                    </div>
                </div> 
            </Router>
        
        );
    }
}
 
export default Accueil;
function P(){
    return(
        <div>accueil
             
        </div>
    );
}
function Login(){
    return(
        <div>this is login</div>
    );
}
function Ac(){
    return(
        <div>this is acc</div>
    );
}