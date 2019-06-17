import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';
class ModalUpdate extends Component {
    constructor(){
        super();
        this.state={
            show:false,
        }
    }
    handleClose() {
        //event.preventDefault();
        this.setState({ show: false });
      }
    
      handleShow(event) {
          event.preventDefault();
          this.setState({ show: true });
          //this.setState({products:JSON.parse(this.props.products.InfoSup)});
          //console.log(this.props.products);
      }
    render() { 
        return ( 
            <>
            <span style={{cursor:"pointer"}} onClick={(event)=>this.handleShow(event)}><i className="fas fa-edit fa-2x"></i></span>
            <Modal show={this.state.show} onHide={()=>this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Modifucation d'un produit </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 the update form here
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" >
                  valider
                </Button>
                <Button variant="primary" >
                  annuler
                </Button>
              </Modal.Footer>
            </Modal>
          </>
         );
    }
}
 
export default ModalUpdate;