import React, { Component } from 'react';
import Produit from './produit';
import './accueil.css';
import link from '../link';
class Accueilstore extends Component {
    constructor(){
        super();
        this.state={prod:[]};
        this.getProductEcom();
        
    }
    getProductEcom(){
         fetch(link+"/ecom/getproduct").then(rep =>rep.json()).then(t =>{
            console.log(t);
            this.setState({prod:t.prod});
            console.log(this.state.prod);
        })
    }
    displayProduct(){
        let p=this.state.prod;
        return p.map((el,index)=>{
            return(
                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <Produit p={el} src="http://127.0.0.1:3000/images/laboratory-313864_640.jpg" />
                </div>
            )
        });
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
    render() { 
        return ( 
            <div>
                <div style={{paddingTop:"0.2em"}}>
                    <ul id="menustore">
                        <li>ecommerce</li>
                        <li>vendre</li>
                    </ul>
                </div>
                <div style={{marginLeft:"2em",textAlign:"center",marginBottom:"0.3em"}}>
                    <input style={{width:"80%",borderRadius:"2em"}} type="search" placeholder=" Taper le nom d'un produit" />
                </div>
                <div style={{backgroundColor:"white",marginLeft:"2em"}} className="row">
                    {this.displayProduct()}
                </div>
            </div>
         );
    }
}
 
export default Accueilstore;