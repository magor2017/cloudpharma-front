import React, { Component } from 'react';
import './fournisseur.css';
import {BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import link from '../link';

class Fournisseur extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div style={{backgroundColor:"white"}}>
                    <p style={{color:"black",textAlign:"center"}}>FOURNISSEUR</p>
                </div>
                <Router>
                    <div style={{marginTop:"1.5em"}}>
                        <ul className="menuul">
                            <Link className="menuli" to="/superviseur/fournisseur">
                                <li  >Liste Fournisseur</li>
                            </Link> 
                            <Link className="menuli" to="/superviseur/listeFourniseur">
                                <li  >Nouveau Fournisseur</li>
                            </Link>
                            
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/superviseur/fournisseur" component={Liste}/>
                        <Route exact path="/superviseur/listeFourniseur" component={NewFournisseur} />
                    </Switch>
                </Router>
               
            </div>
            
         );
    }
}
 
export default Fournisseur;
class Liste extends Component{
    constructor(){
        super();
        this.getFournisseurs();
        this.state={
            fournisseurs:[],
        }
    }
    getFournisseurs(){
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+"/fournisseur/liste",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>{
            if(rep.status===500){
                return new Promise((resolve,reject)=>{
                    resolve(JSON.stringify({liste:[]}))
                });
            }
            return rep.text();
        }).then(text=>{
           // console.log(text)
            this.setState({fournisseurs:JSON.parse(text).liste})
        });
    }
    render(){
        
        return(
            <div>
                <table className="table table-striped table-condensed">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                        <tr>
                            <th>Nom</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {this.state.fournisseurs.map((el,i)=>{
                            return(
                                <tr key={i}>
                                    <th>{el.nom}</th>
                                    <th>{el.adresse}</th>
                                    <th><button className="btn btn-success">modifier</button></th>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        )
    }
}
class NewFournisseur extends Component{
    constructor(){
        super();
        this.state={
            nom:"",
            adresse:"",
            telephone:"",
            fde:false,
            fe:false,//fournisseur enregistre
            fo:false,
            ps:false,//problem au niveau du serveur
        };
    }
    handleNom(event){
        event.preventDefault();
        this.setState({nom:event.target.value});
    }
    handleAdresse(event){
        event.preventDefault();
        this.setState({adresse:event.target.value});
    }
    handleTel(event){
        event.preventDefault();
        this.setState({telephone:event.target.value});
    }
    addNewFournisseur(event){
        event.preventDefault();
        let token=sessionStorage.getItem("token");
        let id=sessionStorage.getItem("id");
        let fournisseur=JSON.stringify({nom:this.state.nom,adresse:this.state.adresse,tel:this.state.telephone});
        if(this.state.nom!=="" && this.state.nom!=undefined){
            fetch(link+'/fournisseur/addFournisseur',{
                method:"post",
                body:"token="+token+"&id="+id+"&fournisseur="+fournisseur,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>{
                if(rep.status===500){
                    return new Promise((resolve,reject)=>{
                        resolve(JSON.stringify({status:500}));
                    });
                }
                return rep.text();
            }).then(text=>{
                let reponse=JSON.parse(text)
                switch(parseInt(reponse.status)){
                    case 1:{
                        this.setState({fe:true});
                        setTimeout(()=>this.setState({fe:false}),5000)
                        break;
                    }
                    case -1:{
                        this.setState({fde:true});
                        setTimeout(()=>this.setState({fde:false}),5000);
                        break;
                    }
                    default:{
                        this.setState({ps:true});
                        setTimeout(()=>this.setState({ps:false}),5000);

                    }

                }
                //console.log(text);
            });
        }else{
            this.setState({fo:true});
            setTimeout(()=>this.setState({fo:false}),5000);
        }
    }
    render(){
        return(
            <div>
                <p style={{display:this.state.fe?"block":"none"}} className="alert alert-success">fournisseur enregistre</p>
                <p style={{display:this.state.fde?"block":"none"}} className="alert alert-danger">Fournisseur deja enregistre</p>
                <p style={{display:this.state.fo?"block":"none"}} className="alert alert-danger">le champ nom fournisseur est obligatoire</p>
                <p style={{display:this.state.ps?"block":"none"}} className="alert alert-danger">problem au niveau du serveur</p>
                <form className="form">
                    <div className="form-group">
                        <label>Nom Fournisseur :</label>
                        <input onChange={(event)=>this.handleNom(event)} value={this.state.nom} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Adresse :</label>
                        <input onChange={(event)=>this.handleAdresse(event)} value={this.state.adresse} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Telephone :</label>
                        <input onChange={(event)=>this.handleTel(event)} value={this.state.telephone} type="text" className="form-control" />
                    </div>
                    <button onClick={(event)=>this.addNewFournisseur(event)} className="btn btn-success">Enregistrer</button>
                </form>
            </div>
        )
    }
}