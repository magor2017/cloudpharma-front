import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';

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
    computePrice(){
        return 5000;
    }
    render() { 
        return ( 
            <div id="produit"  >
                <div style={{padding:"0px"}}><img height="300px" width="100%" src={this.props.src} alt="logo" /></div>
                <div id="description"> {this.props.p.ProductTitle}</div>
                <div id="peremption">Peremption : 25/11/2019</div>
                <div id="price">P.U :5000 FCFA</div>
                <div id="pt">P.T : {this.computePrice()*parseInt(this.state.nb)}</div>
                <div><input onChange={(event)=>this.handleQt(event)} value={this.state.nb} className="col-lg-3 col-md-3 col-xs-12 col-sm-12" type="number" min="1" /><Modalmag quantite={this.state.nb} produit={this.props.p} /></div>
                
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
            
        };
    }
    handleShow(event) {
        event.preventDefault();
        this.setState({ show: true });
        console.log(this.props);
        
    }
    handleHide(event) {
        event.preventDefault();
        this.setState({ show: false });
       // console.log(this.props.produit);
        
    }
    validerAchat(p){
        console.log(p);

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
                <div>Produit : {this.props.produit.ProductTitle}</div>
                <div>Quantite : {this.props.quantite}</div>
                <div>Prix Unitaire: 5000</div>
                <div>Prix Total : 5000</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={()=>this.validerAchat(this.props.produit)}>
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