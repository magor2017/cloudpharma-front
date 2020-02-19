import React, { Component } from 'react';
import Produit from './produit';
import './accueil.css';
import link from '../link';
import Ecom from './ecom';
import VenteEcom from './venteEcom';
import Panier from './panier';
import MyProduct from './myProducts';
import Iban from './iban';
import Historique from './historique';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
class Accueilstore extends Component {
    constructor(){
        super();
        this.state={
            prod:[],
            solde:null,
            level:sessionStorage.getItem("level")==="1"?"/vendeur":"/superviseur",
        };
        this.getSolde();
       // this.getProductEcom();
        
    }
    getProductEcom(){
         fetch(link+"/ecom/getproduct",{
             method:"POST",
             body:"idShop="+parseInt(sessionStorage.getItem("idShop")),
             headers:{
                 "Content-Type":"application/x-www-form-urlencoded"
             }
         }).then(rep =>rep.json()).then(t =>{
            console.log(t);
            this.setState({prod:t.prod,solde:t.solde});
            console.log(this.state.prod);
        })
    }
    
    log(){
                  return(
                  <div><div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <Produit src="http://127.0.0.1:3000/images/laboratory-313864_640.jpg" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <Produit src="http://127.0.0.1:3000/images/medications-257346_640.jpg" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <Produit src="http://127.0.0.1:3000/images/medications-257349_640.jpg" />
                    </div>
                    </div>);
    }
    getSolde(){
        let idShop=sessionStorage.getItem("idShop");
        console.log(idShop);
        fetch(link+"/ecom/getSolde",{
            method:"POST",
            body:"idShop="+parseInt(sessionStorage.getItem("idShop")),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep =>rep.json()).then(t =>{
           console.log(t);
           this.setState({solde:t.solde});
           console.log(this.state.solde);
           //773893613
       })

    }
    render() { 
        return ( 
            <Router>
                <div>
                    <span style={{fontSize:"1.5em",color:"black",backgroundColor:this.state.solde>=0?"white":"red"}}><b>Solde : {this.state.solde} FCFA</b></span>
                </div>
                <div style={{paddingTop:"0.2em"}}>
                    <ul id="menustore">
                        <Link className="menuEcom" to={this.state.level+"/store"} >Ecommerce</Link>
                        <Link className="menuEcom" to={this.state.level+"/store/myproducts"} >Mes produits</Link>
                        <Link className="menuEcom" to={this.state.level+"/store/historique"} >Historique</Link>
                        <Link className="menuEcom" to={this.state.level+"/store/iban"}>IBAN</Link>
                        
                    </ul>
                </div>
                
                    
                <Switch>
                    <Route exact path={this.state.level+"/store"} component={Ecom} />
                    <Route exact path={this.state.level+"/store/myproducts"} component={MyProduct} />
                    <Route exact path={this.state.level+"/store/iban"} component={Iban}/>
                    <Route exact path={this.state.level+"/store/historique"} component={Historique} />
                </Switch>
            </Router>
         );
    }
}
 
export default Accueilstore;