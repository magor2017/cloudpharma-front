import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './connexion.css';
import logo from './images/SNETC2.png';
import group15 from './images/Groupe15.png';
import link from '../link';
class Connexion extends Component {
    constructor(){
        super();
        this.state={
            dis:0,
            prenom:"",
            nom:"",
            tel:"",
            adresse:"",
            username:"",
            password:"",
            pharmacie:"",
        }
    }
    handlePrenom(event){
        event.preventDefault();
        this.setState({prenom:event.target.value});
    }
    handleNom(event){
        event.preventDefault();
        this.setState({nom:event.target.value});
    }
    handleTel(event){
        event.preventDefault();
        this.setState({tel:event.target.value});
    }
    handleAdresse(event){
        event.preventDefault();
        this.setState({adresse:event.target.value});
    }
    handlePassword(event){
        event.preventDefault();
        this.setState({password:event.target.value})
    }
    handleUsername(event){
        event.preventDefault();
        this.setState({username:event.target.value});
    }
    saveNewShop(event){
        event.preventDefault();
        if(this.state.prenom!=="" && this.state.nom!=="" && this.state.tel!=="" && this.state.adresse!=="" && this.state.password!=="" && this.state.username!=="" && this.state.pharmacie!==""){
            fetch(link+"/login/newShop",{
                method:"POST",
                body:"prenom="+this.state.prenom+"&nom="+this.state.nom+"&tel="+this.state.tel+"&adresse="+this.state.adresse+"&password="+this.state.password+"&username="+this.state.username+"&pharmacie="+this.state.pharmacie,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>rep.json()).then(json=>{
                switch(parseInt(json.rep)){
                    case 1:{
                        alert("Inscription reussie vous serai contacter bientot");
                        this.setState({prenom:"",nom:"",tel:"",adresse:"",username:"",password:"",pharmacie:""});
                        break;
                    }
                    case 0:{
                        alert("problem d'insertion a la base de donnee veuillez reessayer plus tard");
                        break;
                    }
                    case -1:{
                        alert("username deja utilise");
                        break;
                    }

                }
                
            });
       }else{
           alert("veuillez remplire les champs vides");
       }
    }
    handlePharmacie(event){
        event.preventDefault();
        this.setState({pharmacie:event.target.value});
    }
    display(){
        switch(this.state.dis){
            case 0:{
                return(
                    <div>
                        <span style={{textAlign:"center"}}>GESTION DES VENTES</span>
                        <p>
                        Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum, ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.
                        </p>
                    </div>
                );
            }
            case 1:{
                return(
                    <div>
                        <span style={{textAlign:"center"}}>GESTION DES CLIENTS</span>
                        <p>
                        Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum, ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.
                        </p>
                    </div>
                )
            }
            case 2:{
                return(
                    <div>
                        <span style={{textAlign:"center"}}>GESTION DU STOCK</span>
                        <p>
                        Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum, ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.
                        </p>
                    </div>
                )
            }
            case 3:{
                return(
                    <div>
                        <span style={{textAlign:"center"}}>E-COMMERCE</span>
                        <p>
                        Et olim licet otiosae sint tribus pacataeque centuriae et nulla suffragiorum certamina set Pompiliani redierit securitas temporis, per omnes tamen quotquot sunt partes terrarum, ut domina suscipitur et regina et ubique patrum reverenda cum auctoritate canities populique Romani nomen circumspectum et verecundum.
                        </p>
                    </div>
                )
            }
            case 4:{
                return(
                    <form  className="form" style={{padding:"0.2em"}}>
                        <div className="form-group">
                            <span>Prenom :</span>
                            <input value={this.state.prenom} onChange={(event)=>this.handlePrenom(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <span>Nom :</span>
                            <input value={this.state.nom} onChange={(event)=>this.handleNom(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <span style={{display:"block"}}>Telephone :</span>
                            <input value={this.state.tel} onChange={(event)=>this.handleTel(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <span>Nom Pharmacie :</span>
                            <input type="text" value={this.state.pharmacie} onChange={(event)=>this.handlePharmacie(event)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <span>Adresse Pharmacie :</span>
                            <input value={this.state.adresse} onChange={(event)=>this.handleAdresse(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <span>Username :</span>
                            <input value={this.state.username} onChange={(event)=>this.handleUsername(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <span>Password :</span>
                            <input value={this.state.password} onChange={(event)=>this.handlePassword(event)} type="password" className="form-control"/>
                        </div>
                        <button onClick={(event)=>this.saveNewShop(event)} className="btn btn-success" >valider</button>
                    </form>
                )
            }
        }
    }
    menu(event,num){
        event.preventDefault();
        this.setState({dis:parseInt(num)});
    }
    render() { 
        return ( 
            <div style={{backgroundColor:"white"}}>
                <div id="containermenu">
                    <img id="logoP" src={logo} />
                    <ul id="menu1">
                        <li style={{marginRight:"0.9em"}}><img id="logo" src={logo} alt="logo"/></li>
                        <li className="liorlogo" onClick={(event)=>this.menu(event,0)} style={{backgroundColor:this.state.dis===0?"#1F838D":"white",color:this.state.dis===0?"white":"#1F838D"}}>GESTION DE VENTE</li>
                        <li className="liorlogo" onClick={(event)=>this.menu(event,1)} style={{backgroundColor:this.state.dis===1?"#1F838D":"white",color:this.state.dis===1?"white":"#1F838D"}}>GESTION DES CLIENTS</li>
                        <li className="liorlogo" onClick={(event)=>this.menu(event,2)} style={{backgroundColor:this.state.dis===2?"#1F838D":"white",color:this.state.dis===2?"white":"#1F838D"}}>GESTION DE STOCK</li>
                        <li className="liorlogo" onClick={(event)=>this.menu(event,3)} style={{backgroundColor:this.state.dis===3?"#1F838D":"white",color:this.state.dis===3?"white":"#1F838D"}}>E-COMMERCE</li>
                        <li className="liorlogo" onClick={(event)=>this.menu(event,4)} style={{backgroundColor:this.state.dis===4?"#1F838D":"white",color:this.state.dis===4?"white":"#1F838D"}}>INSCRIPTION</li>
                        <li><span><Link to="/login">CONNEXION</Link></span></li>
                    </ul>
                </div>
                <div style={{padding:"0px"}} id="body" >
                    <div id="left">
                        <img src={group15} alt="cloud" />
                    </div>
                    <div id="display" >
                        <span><i className="fas fa-info-circle fa-2x"></i></span>
                        {this.display()}
                    </div>
                </div>
            </div>
            
         );
    }
}
 
export default Connexion;
//<Link to="/login" >login bi fiila</Link>
//<br/>
//<Link to="/vendeur" >espace vendeur</Link>
//<Link to="/login" >login bi fiila</Link>
//<Link to="/vendeur" >espace vendeur</Link>
function old(){
    return(
        <div className="row">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="row btncnrow" >
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <button><Link to="/login">CONNEXION</Link></button>
                  </div>
                </div>
                <div className="row vrtlinerow" >
                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 colon1">
          
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 colon2">
            
                    </div>
                </div>
                <div className="row ">
                    <div className="col-lg-2 col-md-2 col-xs-2 col-sm-2 ">
                    </div>
                    <div className="col-lg-8 col-md-8 col-xs-8 col-sm-8 ">
                        <div className="row srvlinerow">
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE STOCK</b></span>
                          </div>
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE VENTE</b></span>
                          </div>
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE CIENTS</b></span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    )
}