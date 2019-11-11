import React,{Component} from 'react';
import { Button,Modal } from 'react-bootstrap';
import link from '../link';

class ModalModificationCompte extends Component {
    constructor(props){
        super(props);
        console.log(this.props.id)
        this.handleClose = this.handleClose.bind(this);
        this.state={
            show:false,
            vente:"",
            historique:"",
            reappro:"",
            password:"",
            rpassword:"",
            passbool:false,
            passboolSuc:false,
        }
        
    }
    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow(event) {
          event.preventDefault();
          this.getPrivilege();
          this.setState({ show: true });
    }
    getPrivilege(){
       // event.preventDefault();
        let rep1=fetch(link+'/compte/getPrivilege',{
            body:"id="+this.props.id.idCompte,
            method:"post",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
        });
        rep1.then(r=>r.json()).then(r2=>{
            console.log(r2.privilege);
            if(r2.privilege.vente===1){
                this.setState({vente:"ckecked"});
            }
            if(r2.privilege.historique===1){
                this.setState({historique:"ckecked"});
            }
            if(r2.privilege.reappro===1){
                this.setState({reappro:"ckecked"});
            }
        });
    }
    changerPassword(event,idCompte){
        event.preventDefault();
        console.log(idCompte);
        if(this.state.password===this.state.rpassword && this.state.password!=="" && this.state.password!==undefined){
            console.log("mot de pass modifie");
            fetch(link+"/compte/changerPassword",{
                method:"post",
                body:"password="+this.state.password+"&idCompte="+idCompte,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>{
                console.log(rep)
                if(rep.status===500){
                    return new Promise((resolve,reject)=>{
                        resolve(JSON.stringify({status:500}));
                    });

                }else{
                    return rep.json();
                }
            }).then(repjson=>{
                console.log(repjson);
                switch(repjson.status){
                    case 1:{
                        this.setState({passboolSuc:true});
                        setTimeout(()=>{
                            this.setState({passboolSuc:false});
                        },5000);
                        break;
                    }
                    case 0:{
                        break;
                    }
                    case 500:{
                        alert("erreur au niveau du serveur veuillez reessayer plus tard")
                        break;
                    }
                    default:{
                        
                    }
                }
            });

        }else{
            if(this.state.password!==this.state.rpassword){
                this.setState({passbool:true});
            }
        }   
    }
    handlePassword(event){
        event.preventDefault();
        this.setState({password:event.target.value,passbool:false});
    }
    handleRpassword(event){
        event.preventDefault();
        this.setState({rpassword:event.target.value,passbool:false});
    }
    render() { 
        return ( 
            <>
            <span style={{cursor:"pointer"}} onClick={(event)=>this.handleShow(event)}><button className="btn btn-primary">Modifier</button></span>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Creation D'un nouveau Component</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div>
                      <p>Password </p>
                      <hr />
                      <div className="form-group">
                          <span>nouveau password :</span>
                          <input onChange={(event)=>this.handlePassword(event)} value={this.state.password} type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                          <span>repeter nouveau password :</span>
                          <input onChange={(event)=>this.handleRpassword(event)} value={this.state.rpassword} type="password" className="form-control" />
                      </div>
                      <p style={{display:this.state.passbool?"block":"none"}} className="alert alert-danger">les mots de passes ne corresondent pas</p>
                      <p style={{display:this.state.passboolSuc?"block":"none"}} className="alert alert-success">modification reussie</p>
                      <button onClick={(event)=>this.changerPassword(event,this.props.id.idCompte)} className="btn btn-success">Changer password</button>
                  </div>
                  <div>
                      <p>Privileges</p>
                      <hr />
                      <div className="row">
                          <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span>Vente </span>
                              <input type="checkbox" checked={this.state.vente===""?false:true}/>
                          </div>
                          <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span>Historique </span>
                              <input type="checkbox" checked={this.state.historique===""?false:true} />
                          </div>
                          <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span>Reappro </span>
                              <input type="checkbox" checked={this.state.reappro===""?false:true} />
                          </div>
                      </div>
                      
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
          </>
         );
    }
}
 
export default ModalModificationCompte;