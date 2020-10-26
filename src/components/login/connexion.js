import React, { Component } from 'react';
import './connexion.css';
import logo from './images/SNETC2.png';
import group15 from './images/Groupe15.png';
import link from '../link';
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';
import {BrowserRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
                   <div>
                       <p>ipm ici</p>
                   </div>
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
                    <div className="row" id="containermenu">
                        <div className="col-lg-10 col-md-10 col-xs-10 col-sm-10">
                            <img id="logoP" src={logo} />
                            <ul id="menu1">
                                <li style={{marginRight:"0.9em"}}><img id="logo" src={logo} alt="logo"/></li>
                                <li className="liorlogo" onClick={(event)=>this.menu(event,0)} style={{backgroundColor:this.state.dis===0?"#1F838D":"white",color:this.state.dis===0?"white":"#1F838D"}}>GESTION DE VENTE</li>
                                <li className="liorlogo" onClick={(event)=>this.menu(event,1)} style={{backgroundColor:this.state.dis===1?"#1F838D":"white",color:this.state.dis===1?"white":"#1F838D"}}>GESTION DES CLIENTS</li>
                                <li className="liorlogo" onClick={(event)=>this.menu(event,2)} style={{backgroundColor:this.state.dis===2?"#1F838D":"white",color:this.state.dis===2?"white":"#1F838D"}}>GESTION DE STOCK</li>
                                <li className="liorlogo" onClick={(event)=>this.menu(event,3)} style={{backgroundColor:this.state.dis===3?"#1F838D":"white",color:this.state.dis===3?"white":"#1F838D"}}>E-COMMERCE</li>
                                <li className="liorlogo" onClick={(event)=>this.menu(event,4)} style={{backgroundColor:this.state.dis===4?"#1F838D":"white",color:this.state.dis===4?"white":"#1F838D"}}>IPM</li>
                                
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-2 col-xs-2 col-sm-2">
                            <Log />
                        </div>
                    </div>
                <div style={{padding:"0px"}} id="body" >
                    <div><LettreGarrantie /></div>
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
class LettreGarrantie extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            Date: null,
            date:null,
            matricule:"",
            idIpm:"",
            idStructure:"",
            timeOute:1,
            ipm:[]
            
        }
        this.getIpm();
    }
    onchange = date => {
        let d=date.toLocaleDateString().split('/');
        let day=d[2]+'-'+d[1]+'-'+d[0];
        let datetime=day+' '+date.toLocaleTimeString();
        //let day=date.getFullYear()+'-'+date.getMonth()+'-'+date.getUTCDay();
        console.log(datetime);
        this.setState({date:date});
       return this.setState({ Date:datetime });
    }
    show(event){
        event.preventDefault();
        this.setState({show:true});
    }
    handleMatricule(event){
        event.preventDefault();
        this.setState({matricule:event.target.value});
        console.log(this.state.matricule);
    }
    handleStructure(event){
        event.preventDefault();
        this.setState({idStructure:event.target.value});
    }
    handeIdIpm(event){
        event.preventDefault();
        this.setState({idIpm:event.target.value});
        console.log(this.state.idIpm);
    }
    hide(event){
        event.preventDefault();
        this.setState({show:false});
    }
    getIpm(){
        fetch(link+'/ipm/recupereIpm',{
            method:'get'
        }).then(rep =>rep.json()).then(tontou=>{
            console.log(tontou);
            this.setState({ipm:tontou});
        })
    }
    save(event){
        event.preventDefault();
       // console.log(this.state.date);
        //console.log(this.state.date.toLocaleDateString());
        //console.log(this.state.date.toLocaleTimeString());
        this.setState({timeOute:1000000});
        if(this.state.matricule!=="" && this.state.idIpm!=="" && this.state.idStructure!==""){
            fetch(link+'/ipm/newlettredegarantie',{
                method:"post",
                body:"idIpm="+this.state.idIpm+"&idStructure="+this.state.idStructure+"&date="+this.state.Date+"&matricule="+this.state.matricule,
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>rep.text()).then(tontou=>{
                console.log(tontou)
                this.setState({timeOute:2000});
                alert("demande enregistré");
            });
        }else{
            alert('veuillez remplir les champs vide.');
        }
    }
    render(){
        return(
            <div>
                <button onClick={(event)=>this.show(event)} className="btn btn-success">Lettre de garrantie</button>
                <Modal size="lg"  show={this.state.show}>
                    <Modal.Header onClick={(event)=>this.hide(event)} closeButton>
                    <Modal.Title ><b style={{textAlign:"center"}}>Demande de lettre de garrantie</b> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Loader
                            style={{"position":"absolute","top":"40%","left":"30%"}}
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={this.state.timeOute} //3 secs
                    
                        />
                        <form>
                            <div className="form-group">
                                <span>Matricule</span>
                                <input onChange={(event)=>this.handleMatricule(event)} type="text" className="form-control" />
                            </div>
                            <select onChange={(event)=>this.handeIdIpm(event)} className="form-control">
                                <option value="0">Veuillez Choisire votre ipm</option>
                                {
                                    this.state.ipm.map((el,i)=>{
                                        return(<option key={i} value={el.id}>{el.ipm}</option>)
                                    })
                                }
                                
                            </select><br/>
                            <select onChange={(event)=>this.handleStructure(event)} className="form-control">
                                <option value="0">Veuillez Choisire votre structure sanitaire</option>
                                <option value="1">Chez alice</option>
                                <option value="2">Chez Mbeurgou</option>
                                <option value="3">cloudpharma</option>
                            </select><br/>
                            <div>
                                <DateTimePicker
                                onChange={this.onchange}
                                value={this.state.date}
                                />
                            </div><br/>
                            <button onClick={(event)=>this.save(event)} className="btn btn-success">Valider</button>
                            <button onClick={(event)=>this.hide(event)} className="btn btn-danger">Annuler</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
class Log extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            password:'',
            id:'',
            error: null,
            errorc:false,
            compte:"",
            redirect:false,
            isLoaded: false,
            items: [],
            con:true,
            pharmacie:"",
            passIns:"",
            usernameIns:"",
            adresse:"",
            tel:"",
            prenom:"",
            nom:"",
            categorie:0,
        }
    }
    handleCategorie(event){
        event.preventDefault();
        console.log(event.target.value);
        this.setState({categorie:event.target.value});
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
    handlePasswordIns(event){
        event.preventDefault();
        this.setState({passIns:event.target.value})
    }
    handleUsername(event){
        event.preventDefault();
        this.setState({usernameIns:event.target.value});
    }
    handlePharmacie(event){
        event.preventDefault();
        this.setState({pharmacie:event.target.value});
    }
    hideModal(event){
        event.preventDefault();
        this.setState({show:false});
    }
    ShowModal(event){
        event.preventDefault();
        this.setState({show:true});
     }
     handleId(event){
        event.preventDefault();
        let val=event.target.value;
        this.setState({id:val});
     }
    handlePassword(event){
        event.preventDefault();
        let val=event.target.value;
        this.setState({password:val});
    }
    saveNewShop(event){
        event.preventDefault();
        if(this.state.prenom!=="" && this.state.nom!=="" && this.state.tel!=="" && this.state.adresse!=="" && this.state.passIns!=="" && this.state.usernameIns!=="" && this.state.pharmacie!=="" && this.state.categorie!==0){
            fetch(link+"/login/newShop",{
                method:"POST",
                body:"prenom="+this.state.prenom+"&nom="+this.state.nom+"&tel="+this.state.tel+"&adresse="+this.state.adresse+"&password="+this.state.passIns+"&username="+this.state.usernameIns+"&pharmacie="+this.state.pharmacie+"&categorie="+this.state.categorie,
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
    auth = (event)=> {
        event.preventDefault();
    	
        let id=this.state.id;
        let password=this.state.password;
        let body = {"id":id, "password": password};
        if(id!==undefined && id!=="" && password!=undefined && password!==""){
            axios({
                url:link+'/login/connexion',
                method:'post',
                data:'id='+id+'&password='+password
            }).then(rep=>{
                if(rep.status===200){
                    let data=rep.data;
                    
                    if(data.status===1){
                        sessionStorage.setItem("id",rep.data.id);//id de l'utilisateur
                        sessionStorage.setItem("token",rep.data.token)
                        sessionStorage.setItem("level",rep.data.level);
                        sessionStorage.setItem("idShop",rep.data.idShop);//id de la boutique
                        sessionStorage.setItem("vente",1);
                        switch(parseInt(rep.data.level)){
                            case 1:{
                                this.setState({compte:"/vendeur"})
                                this.setState({redirect:true});
                                break;
                            }
                            case 2:{
                                this.setState({compte:"/superviseur"})
                                this.setState({redirect:true});
                                break;	
                            }
                            case 5:{
                                this.setState({compte:"/ipm"})
                                this.setState({redirect:true});
                            }
                            default:{
                                this.setState({redirect:false});
                            }

                        }
                    
                    }else{
                        if(data.status===0){
                            this.setState({errorc:true});
                            setInterval(()=>{
                                this.setState({errorc:false});
                            },5000);
                        }
                    }
                }
                console.log(rep);
            });

        }else{
            if(id===undefined || id===""){

            }else{

            }
        }
        
}
    inscription(event,val){
        event.preventDefault();
        this.setState({con:val});
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.compte} />
         }
        return (
            <div>
                <input onClick={(event)=>this.ShowModal(event)} type="button" className="btn btn-primary" value="connexion/inscription" />
                <Modal size="lg"  show={this.state.show}>
                    <Modal.Header closeButton>
                    <Modal.Title ><b style={{textAlign:"center"}}>Connexion/Inscription</b> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form style={{display:this.state.con===true?"block":"none"}}>
                            <button onClick={(event)=>this.inscription(event,false)} className="btn btn-primary">s'inscrire</button>
                            <div className="form-group">
                                <span>Identifiant :</span>
                                <input onChange={(event)=>this.handleId(event)} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <span>Password :</span>
                                <input onChange={(event)=>{this.handlePassword(event)}}  value={this.state.password} type="password" className="form-control" />
                            </div>
                            <div>
                                <p className={this.state.errorc===false?"hide":"alert alert-danger show"}><b>Identifiant ou Mot de Passe Incorrect</b></p>
                            </div>
                            <div>
                                <button onClick={(event)=>this.auth(event)} className="btn btn-success">Valider</button>
                                <button onClick={(event)=>this.hideModal(event)} className="btn btn-danger">Annuler</button>
                            </div>

                        </form>
                        <form style={{display:this.state.con===false?"block":"none"}}>
                            <button onClick={(event)=>this.inscription(event,true)} className="btn btn-primary">se connecter</button>
                            <div className="row">
                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
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
                                    <span>Structure :</span>
                                    <select onChange={(event)=>this.handleCategorie(event)} className="form-control">
                                        <option value="0">--choisir la categorie de votre structure--</option>
                                        <option value="1">Pharmacie</option>
                                        <option value="2">Ipm</option>
                                    </select>
                                </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                            <div className="form-group">
                                <span>Nom structure(pharmacie/ipm) :</span>
                                <input type="text" value={this.state.pharmacie} onChange={(event)=>this.handlePharmacie(event)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <span>Adresse structure(pharmacie/ipm) :</span>
                                <input value={this.state.adresse} onChange={(event)=>this.handleAdresse(event)} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <span>Username :</span>
                                <input value={this.state.usernameIns} onChange={(event)=>this.handleUsername(event)} type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <span>Password :</span>
                                <input value={this.state.passwordIns} onChange={(event)=>this.handlePasswordIns(event)} type="password" className="form-control"/>
                            </div>
                        </div>
                        </div>
                            <div>
                                <button onClick={(event)=>this.saveNewShop(event)} className="btn btn-success">Valider</button>
                                <button onClick={(event)=>this.hideModal(event)} className="btn btn-danger">Annuler</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    }
}
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