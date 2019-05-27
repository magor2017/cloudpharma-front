import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class Content extends Component {
    state = {  }
    
   
    render() { 
        return ( 
            
            
            <Switch>
                    <Route exact path="/" component={P} />
                    <Route exact path="/login/" component={Login} />
                    <Route exact path="/ac/" component={Ac} />
            </Switch>
            
            
         );
    }
}
 
export default Content;
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