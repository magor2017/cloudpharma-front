import React,{Component} from 'react';
import { Button,Modal } from 'react-bootstrap';
import link from '../link';
import { resolve } from 'upath';
class ModalNouveauCompte extends Component {
    constructor(){
        super();
        this.handleClose = this.handleClose.bind(this);
        this.state={
            show:false,
            compte:{
                prenom:"",
                nom:"",
                username:"",
                password:"",
            },
            showsuccesMessage:false,
            showerrorMessage:false,
        }
    }
    addNewCompte(event){
        event.preventDefault();
        if(!this.testData()){
            alert("veuillez remplire tous les champs");
            return;
        }
        let id=sessionStorage.getItem("id");
        let idShop=sessionStorage.getItem("idShop");
        let compte=JSON.stringify({"prenom":this.state.compte.prenom,"nom":this.state.compte.nom,"username":this.state.compte.username,"password":this.state.compte.password});
        fetch(link+'/compte/addCompte',{
            method:'post',
            body:'id='+id+'&idShop='+idShop+'&compte='+compte,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
        }).then(rep=>{
            console.log(rep);
            if(rep.status===200){
               return rep.json();
            }
            if(rep.status===500){
                return new Promise((resole,reject)=>{
                    let ton={status:500};
                    reject("500");
                });
            }

        }).then(json=>{
            
            if(json.status===1 && json.tontou===true){
                this.props.onCompteChange();
                this.setState({showsuccesMessage:true});
                this.setState({compte:{prenom:"",nom:"",username:"",password:""}});
                setTimeout(()=>{
                    this.setState({showsuccesMessage:false});
                },5000);
            }
            if(json.status===-1){
                this.setState({showerrorMessage:true});
                setTimeout(()=>{
                    this.setState({showerrorMessage:false});
                },5000);
            }
           
          //  console.log(json);
        }).catch(rep=>{
            alert("problem au niveau du serveur veuillez reessayer plustard");
        });
       // console.log(compte);
    }
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow(event) {
          event.preventDefault();
          this.setState({ show: true });
      }
      handlePrenom(event){
          event.preventDefault();
          let compte=this.state.compte;
          compte.prenom=event.target.value;
          this.setState({compte:compte});
      }
      handleNom(event){
        event.preventDefault();
        let compte=this.state.compte;
        compte.nom=event.target.value;
        this.setState({compte:compte});

      }
      handleUsername(event){
        event.preventDefault();
        let compte=this.state.compte;
        compte.username=event.target.value;
        this.setState({compte:compte});
      }
      handlePassword(event){
        event.preventDefault();
        let compte=this.state.compte;
        compte.password=event.target.value;
        this.setState({compte:compte});

      }
      testData(){
          let p=this.state.compte;
          if(p.prenom!=="" && p.prenom!==undefined && p.nom!=="" && p.nom!==undefined && p.username!=="" && p.username!==undefined && p.password!=="" && p.password!==undefined){
              return true

          }else{
              return false;
          }
      }
    render() { 
        return ( 
            <>
          <span style={{cursor:"pointer"}} onClick={(event)=>this.handleShow(event)}><button className="btn btn-primary">Ajouter un compte</button></span>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Creation D'un nouveau Component</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{display:this.state.showsuccesMessage===false?"none":"inline-block"}} className="alert alert-success">utilisateur ajoute</p>
                <p style={{display:this.state.showerrorMessage===false?"none":"inline-block"}} className="alert alert-danger">le username choisi exist deja veuillez choisir un autre</p>
                <form className="form">
                    <div className="form-group">
                        <span>Prenom :</span>
                        <input value={this.state.compte.prenom} onChange={(event)=>this.handlePrenom(event)} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <span>Nom :</span>
                        <input value={this.state.compte.nom} onChange={(event)=>this.handleNom(event)} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <span>Username :</span>
                        <input value={this.state.compte.username} onChange={(event)=>this.handleUsername(event)} className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <span>Password :</span>
                        <input value={this.state.compte.password} onChange={(event)=>this.handlePassword(event)} className="form-control" type="text" />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={(event)=>this.addNewCompte(event)}>
                Valider
              </Button>
            </Modal.Footer>
          </Modal>
        </>
         );
    }
}
 
export default ModalNouveauCompte;