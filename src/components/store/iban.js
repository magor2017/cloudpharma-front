import React, { Component } from 'react';
import link from '../link';
import { Button,Modal } from 'react-bootstrap';
class Iban extends Component {
    constructor(){
        super();
        this.state={
            ibans:[],
        }
        this.displayIban();
    }
    displayIban(){
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+"/ecom/getIban",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(json =>{
            this.setState({ibans:json});
            console.log(json);
        })
    }
    displayEtat(etat){
        switch(parseInt(etat)){
            case 0:{
                return "En cour de traitement";
            }
            case 1:{
                return "Traité";
            }
            case -1:{
                return "Annulé";
            }
        }

    }
    afficheIban(){
        let p=this.state.ibans.map((p,i)=>{
            return(<tr key={i}>
                <td>{i+1}</td>
                <td>{p.montant}</td>
                <td>{p.date}</td>
                <td>{this.displayEtat(p.etat)}</td>
                <td><input style={{display:parseInt(p.etat)===0?"block":"none"}} type="button" onClick={(event)=>this.annulerIban(event,p.id,p.montant)} value="annuler" className="btn btn-danger" /></td>
            </tr>)
        })
        return(
            <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
            {p}
        </tbody>
        )
    }
    annulerIban(event,idIban,montant){
        event.preventDefault();
        let idShop=sessionStorage.getItem("idShop");
        if(window.confirm("Etes-vous sure de vouloir annuler.")){
            fetch(link+"/ecom/annulerIban",{
                method:"POST",
                body:"idShop="+idShop+"&idIban="+idIban+"&montant="+montant,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>rep.json()).then(json=>{
                console.log(json);
                if(json.rep===1){
                    alert("demande annulé");
                }
            });
        }
    }
    
    render() { 
        return ( 
            <div>
                 <table style={{backgroundColor:"white",color:"#1F838D"}} className="table table-striped table-condensed">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Montant</th>
                            <th>Date</th>
                            <th>Etat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                {this.afficheIban()}
            </table>
            <ModalIban displayIban={()=>this.displayIban()} />
            </div>
         );
    }
}
 
export default Iban;
class ModalIban extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            montant:0,
        }
    }
    handleShow(event) {
        event.preventDefault();
        this.setState({ show: true });
       // console.log(this.props);
        
    }
    handleHide(event) {
        event.preventDefault();
        this.setState({ show: false ,valideAchat:false});
       // console.log(this.props.produit);
    }
    handleMontant(event){
        event.preventDefault();
        this.setState({montant:event.target.value});
    }
    nouvelleDemande(){
        let idUser=sessionStorage.getItem("id");
        let idShop=sessionStorage.getItem("idShop");
        let montant=this.state.montant;
        if(parseInt(montant)>0){
            if(window.confirm("Etes-vous sure de voulour recuperer  "+montant+ " FCFA.")){
                fetch(link+"/ecom/nouvelleDemande",{
                    method:"POST",
                    body:"idUser="+idUser+"&idShop="+idShop+"&montant="+montant,
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).then(rep=>rep.json()).then(json=>{
                    switch(json.rep){
                        case 1:{
                            this.props.displayIban();
                            alert("Demande enregistre.");
                            this.setState({ show: false ,valideAchat:false});
                            break;
                        }
                        case -1:{
                            alert("Impossible de retirer cette somme");
                        }
                    }
                    
                })

            }
        }else{
            alert("montant incorrect.");
        }


    }
    render(){
        return(
            <div>
            <button className="btn btn-success" onClick={(event)=>this.handleShow(event)}>Faire une nouvelle demande.</button>
                 <Modal show={this.state.show} onHide={()=>this.handleHide}>
            <Modal.Header closeButton>
              <Modal.Title>Nouvelle demande </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="form-group">
                   <span>Montant :</span>
                   <input value={this.state.montant} onChange={(event)=>this.handleMontant(event)} type="text" className="form-control" />
               </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={()=>this.nouvelleDemande()} >
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