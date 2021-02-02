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
import 'antd/dist/antd.css';
import Vendre from './vendre';
class Accueilstore extends Component {
    constructor(props){
        super(props);
        this.state={
            prod:[],
            solde:null,
            level:sessionStorage.getItem("level")==="1"?"/vendeur":"/superviseur",
        };
       // sessionStorage.setItem('solde',20000);
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
    
    
    getSolde(){
        let idShop=sessionStorage.getItem("idShop");
        console.log(idShop);
        fetch(link+"/produit/getSolde",{
            method:"POST",
            body:"idShop="+parseInt(sessionStorage.getItem("idShop")),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep =>rep.json()).then(t =>{
           console.log(t);
           this.setState({solde:t});
           //console.log(this.state.solde);
           //773893613
       })

    }
    render() { 
        return ( 
            <Router>
                <div>
                    <span style={{fontSize:"1.5em",color:"black",backgroundColor:"white"}}><b>Solde : {this.state.solde} FCFA</b></span>
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
                    <Route exact path={this.state.level}   >
                        <Ecom data="rasta" getSolde={()=>this.getSolde()} />
                    </Route>
                    <Route exact path={this.state.level+"/store"}   >
                        <Ecom data="rasta" getSolde={()=>this.getSolde()} />
                    </Route>
                    <Route exact path={this.state.level+"/store/myproducts"} component={MyProduct} />
                    <Route exact path={this.state.level+"/store/iban"} component={Iban}/>
                    <Route exact path={this.state.level+"/store/historique"} component={Historique} />
                </Switch>
            </Router>
         );
    }
}
 
export default Accueilstore;