import React, { Component } from 'react';
import link from '../link';
import { Button,Modal } from 'react-bootstrap';
class ListeFacture extends Component {
    constructor(){
        super();
        this.state={
            idShop:sessionStorage.getItem("idShop"),
            listeFactures:[]
        }
        this.getListeFacture();
    }
    getListeFacture(){
        fetch(link+"/ipm/getListeFacture",{
            method:"post",
            body:"idShop="+this.state.idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep => rep.json()).then(text =>{
            console.log(text);
            this.setState({listeFactures:text});
            
        });
    }
    detail(event,el){
        event.preventDefault()
        console.log(el);
    }
    displayFacture(){
        let l=this.state.listeFactures.map((el,i)=>{
            console.log(JSON.parse(el.client));
            return( 
            <tr key={i}>
                <td>{i+1}</td>
                <td>{JSON.parse(el.shop).shop}</td>
                <td>{JSON.parse(el.client).prenom+" "+JSON.parse(el.client).nom}</td>
                <td><Detail style={{display:"inline"}} info={el} /><input style={{display:"inline"}} type="button" className="btn btn-success" value="renvoyer" /></td>
            </tr>
            )
        })
        return l;
    }
    render() { 
        return ( 
            <div>
                 <table boder="2" className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}} >
                        <tr key="-1">
                            <th>#</th>
                            <th>Pharmacie</th>
                            <th>client</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {this.displayFacture()}
                    </tbody>
                    
                </table>
            </div>
         );
    }
}
 
export default ListeFacture;
class Detail extends Component{
    constructor(){
        super()
        this.state={
            show:false,
            pharmacie:{},
            client:{},
            products:[],
            exper:false,
            mesCorrecteur:[],
            pCore:{},
            core:{},
        }
    }
    accepter(event,p){
        event.preventDefault();
        let idIpm=sessionStorage.getItem("idShop");
        if(window.confirm("Etes-vous sure de vouloir accepter ce produit?")){
            fetch(link+'/ipm/accepterUnProduit',{
                method:"post",
                body:"param="+JSON.stringify({"idIpm":idIpm,"idBill":this.props.info.idBill,"productId":p.ProductId,"productName":p.ProductTitle,"note":"","etat":1}),
                "headers":{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep => rep.json()).then(text =>{
                switch(parseInt(text.rep)){
                    case 1:{
                        alert("produit accepté.");
                        break;
                    }
                    case 0:{
                        alert("problem au niveau du serveur.");
                        break;
                    }
                    case -1:{
                        alert("produit déjà accepté.");
                        break;

                    }
                    default:{
                        alert("erreur inconnue!");
                    }
                }
            });
        }
    }
    reject(event,p){
        event.preventDefault();
        let idIpm=sessionStorage.getItem("idShop");
        if(window.confirm("Etes-vous sure de vouloir rejeter ce produit?")){
            fetch(link+'/ipm/rejectUnProduit',{
                method:"post",
                body:"param="+JSON.stringify({"idIpm":idIpm,"idBill":this.props.info.idBill,"productId":p.ProductId,"productName":p.ProductTitle,"note":"","etat":1}),
                "headers":{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep => rep.json()).then(text =>{
                switch(parseInt(text.rep)){
                    case 1:{
                        alert("produit rejeté.");
                        break;
                    }
                    case 0:{
                        alert("problem au niveau du serveur.");
                        break;
                    }
                    case -1:{
                        alert("produit déjà rejeté.");
                        break;

                    }
                    default:{
                        alert("erreur inconnue!");
                    }
                }
            });
        }

    }
    expertise(event,p){
        event.preventDefault();
        this.getMyCorrecteur();
        this.setState({exper:true,pCore:p});
    }
    ShowModal(event){
        event.preventDefault();
        console.log(this.props.info);
        this.setState({show:true,pharmacie:JSON.parse(this.props.info.shop),client:JSON.parse(this.props.info.client),products:JSON.parse(this.props.info.infoSup)});
    }
    hideModal(event){
        event.preventDefault();
        this.setState({show:false});
    }
    getMyCorrecteur(){
        fetch(link+'/ipm/getMyCorrecteur',{
            method:"post",
            body:"idIpm="+sessionStorage.getItem("id"),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(text=>{
            this.setState({mesCorrecteur:text});
            console.log(text);
        });

    }
    choisirCore(event,c){
        event.preventDefault();
        this.setState({core:c});
    }
    retour(event){
        event.preventDefault();
        this.setState({exper:false});
    }
    sendCorrection(event){
        event.preventDefault();
        if(window.confirm("Etes-vous sure de vouloir envoyer cette demande de correction?")){
            let idIpm=sessionStorage.getItem("idShop");
            if(this.state.core.idCorrecteur>0){
                fetch(link+"/ipm/sendCorrection",{
                    method:"post",
                    body:"idIpm="+idIpm+"&idBill="+this.props.info.idBill+"&idProduct="+this.state.pCore.ProductId+"&idCorrecteur="+this.state.core.idCorrecteur+"&productName="+this.state.pCore.ProductTitle,
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).then(rep =>rep.json()).then(text =>{
                    if(text.rep1 && text.rep2){
                        alert("Demande envoyé.")
                    }else{
                        alert("problem au niveau du serveur.");
                    }
                   // console.log(text);
                });
            }else{
                alert("veuillez choisir un correcteur.");
            }
        }
    }
    render() {
        return (
            <div>
                <input onClick={(event)=>this.ShowModal(event)} type="button" className="btn btn-primary" value="detail" />
                <Modal size="lg"  show={this.state.show}>
            <Modal.Header closeButton>
              <Modal.Title ><b style={{textAlign:"center"}}>DETAILS FACTURE IPM</b> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display:this.state.exper===false?"block":"none"}}>
                <div>
                    <h1>Informations pharmacie</h1>
                    <h4>Pharmacie : {this.state.pharmacie.shop}</h4>
                    <h4>Adresse : {this.state.pharmacie.adresse}</h4>
                    <h4>Telephone : {this.state.pharmacie.tel}</h4>
                </div>
                <hr />
                <div>
                    <h1>Informations client</h1>
                    <h4>Prenom : {this.state.client.prenom}</h4>
                    <h4>Nom : {this.state.client.nom}</h4>
                    <h4>Matricule : {this.state.client.matricule}</h4>
                </div>
                <hr />
                <div>
                    <h1>Produits concernés</h1>
                    <table className="table table-striped table-condensed commentBox">
                        <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                            <tr key="1">
                                <th>#</th>
                                <th>medicament</th>
                                <th>quantite</th>
                                <th>prix</th>
                                <th>prix total</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((p,i)=>{
                                return(
                                    <tr key={i+1}>
                                        <td>{i+1}</td>
                                        <td>{p.ProductTitle}</td>
                                        <td>{p.quantite}</td>
                                        <td>{p.SellingPriceOfUnit}</td>
                                        <td>{p.quantite*p.SellingPriceOfUnit}</td>
                                        <td><input onClick={(event)=>this.accepter(event,p)} type="button" value="accepter" className="btn btn-success" /><input onClick={(event)=>this.reject(event,p)} type="button" value="rejeter" className="btn btn-danger" /><input onClick={(event)=>this.expertise(event,p)} type="button" className="btn btn-primary" value="expertise" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
                <div style={{display:this.state.exper===true?"block":"none"}}>
                    <div><span>Produit : {this.state.pCore.ProductTitle}</span></div>
                    <div><span>Correcteur : {this.state.core.prenom}</span></div>
                    <div><input onClick={(event)=>this.sendCorrection(event)} type="button" value="envoyer une demande correction" className="btn btn-success" /></div>
                    <table className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                        <tr>
                            <th>#</th>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {
                            this.state.mesCorrecteur.map((el,i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{el.prenom}</td>
                                    <td>{el.nom}</td>
                                    <td><input onClick={(event)=>this.choisirCore(event,el)} type="button" value="choisire" className="btn btn-success" /></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
             <input style={{display:this.state.exper===true?"block":"none"}} onClick={(event)=>this.retour(event)} type="button" value="retour" className="btn btn-success" />
              <Button variant="primary" onClick={(event)=>this.hideModal(event)}>
                annuler
              </Button>
              
            </Modal.Footer>
          </Modal>
            </div>
            
        );
    }
}