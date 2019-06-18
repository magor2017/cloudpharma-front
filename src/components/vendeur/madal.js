import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';
class Modalsn extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        products:[]
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow(event) {
        event.preventDefault();
        this.setState({ show: true });
        this.setState({products:JSON.parse(this.props.products.InfoSup)});
        console.log(this.props.products);
    }
    displayProducts(){
        let liste= this.state.products.map((p,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{p.name}</td>
                    <td>{p.quantite}</td>
                    <td>{p.prix}</td>
                    <td>{p.prix*p.quantite}</td>
                    <td><span style={{cursor:"pointer"}}><i className="far fa-trash-alt"></i></span></td>
                </tr>
            )
        });
        return liste;
    }
  
    render() {
      return (
        <>
          <span style={{cursor:"pointer"}} onClick={(event)=>this.handleShow(event)}><i className="fas fa-eye fa-2x"></i></span>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Details Facture Numero {this.props.products.BILLNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-codensed table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Produit(s)</th>
                            <th>Quantite</th>
                            <th>Prix</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                        {this.displayProducts()}
                    </thead>
                </table>
                <span>Total : {this.props.products.TotalPrice}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Imprimer
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  export default Modalsn;
  
