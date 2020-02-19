import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';
import link from '../link';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';

import './produit.css';
class Produit extends Component {
    constructor(){
        super();
        this.state={
            nb:1,
            show:false,
        }
        
    }
    state = {  }
    modal(){
        console.log("modal");
        this.setState({show:true});
        console.log(this.props.p);
    }
    handleQt(event){
        event.preventDefault();
        this.setState({nb:event.target.value});
    }
    computePrice(p){
        return p.SellingPriceOfUnit;
    }
    render() { 
        //let pt=<div id="pt">P.T : {this.computePrice(this.props.p)*parseInt(this.state.nb)}</div>;
        return ( 
            <div id="produit"  >
                <div style={{padding:"0px"}}><img height="300px" width="100%" src={this.props.src} alt="logo" /></div>
                <div id="description"> {this.props.p.ProductTitle}</div>
                <div id="peremption">Peremption : {this.props.p.peremption}</div>
                <div id="price">P.U :{this.computePrice(this.props.p)} FCFA</div>
                <div id="qr">Quantite restante : {this.props.p.UnitsInStock}</div>
                <div><input onChange={(event)=>this.handleQt(event)} value={this.state.nb} className="col-lg-5 col-md-5 col-xs-12 col-sm-12" type="number" min="1" /><Modalmag quantite={this.state.nb} produit={this.props.p} /></div>
                
            </div>
         );
    }
}
 
export default Produit;
class Modalmag extends Component{
    constructor(){
        super();
        this.state = {
            show: false,
            valideAchat:false,
            
        };
    }
    handleShow(event) {
        event.preventDefault();
        this.setState({ show: true });
        console.log(this.props);
        
    }
    handleHide(event) {
        event.preventDefault();
        this.setState({ show: false ,valideAchat:false});
       // console.log(this.props.produit);
        
    }
    validerAchat(p,quantite){
        console.log(p);
        let idAcheteur=sessionStorage.getItem("idShop");
        if(parseInt(p.UnitsInStock)>=parseInt(quantite)){
            fetch(link+"/ecom/validerVente",{
                method:"POST",
                body:"idVendeur="+p.idShop+"&idAcheteur="+idAcheteur+"&produit="+JSON.stringify(p)+"&quantite="+quantite+"&prix="+p.SellingPriceOfUnit,
                headers:{
                    "Content-type":"application/x-www-form-urlencoded"
                }
            }).then(rep =>rep.json()).then(jsonRep =>{
                console.log(jsonRep);
                if(jsonRep.rep===1){
                    this.setState({valideAchat:true});
                    setTimeout(()=>{this.setState({ show: false ,valideAchat:false})},5000);
                }else{
                    if(jsonRep.rep===-1){
                        alert("la quantite est superieur a la quantite disponible.");
                    }
                }
            });
       }else{
           alert("la quantite est superieur a la quantite disponible.");
       }
    }
    
    render(){
        return(
            <div>
            <button onClick={(event)=>this.handleShow(event)}>Acheter</button>
                 <Modal show={this.state.show} onHide={()=>this.handleHide}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation achat de produit </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display:this.state.valideAchat===false?"none":"block"}} className="alert alert-success">Achat valide, nous vous contacterons pour la livraison.</div>
                <div>Produit : {this.props.produit.ProductTitle}</div>
                <div>Quantite : {this.props.quantite}</div>
                <div>Prix Unitaire: {this.props.produit.SellingPriceOfUnit}</div>
                <div>Prix Total : {this.props.produit.SellingPriceOfUnit*this.props.quantite}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={()=>this.validerAchat(this.props.produit,this.props.quantite)}>
                Valider
              </Button>
              <button className="btn btn-danger" onClick={(event)=>this.handleHide(event)}>
                Annuler
              </button>
            </Modal.Footer>
          </Modal>
            </div>
        );
        
    }
}