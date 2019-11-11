import React, { Component } from 'react';
import link from '../link';
import { white } from 'ansi-colors';
import { statement } from '@babel/template';
import './profil.css';
class Profil extends Component {
    constructor(){
        super();
        this.state={
            success:false,
            errrorusername:false,
            profil:{
                prenom:"",
                nom:"",
                username:"",
                password:"",
                rpassword:"",
          },
          profilT:{
              prenom:"",
              nom:"",
              username:""
          },
          valeur:{},
          keys:[],
    }
        this.getProfil();
    }
    getProfil(){
        let id=sessionStorage.getItem("id");
        let token=sessionStorage.getItem("token");
        let level=sessionStorage.getItem("level");
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+'/profil',{
            method:"post",
            body:"id="+id+"&token="+token+"&level="+level+"&idShop="+idShop,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(rep =>{
            if(rep.status===200){
                rep.json().then(j =>{
                    this.setState({profil:{prenom:j.prenom,nom:j.nom,username:j.username}});
                    this.setState({profilT:{prenom:j.prenom,nom:j.nom,username:j.username}});
                    
                    console.log(j);
                });
            }
        });
    }
    handlePrenom(event){
        event.preventDefault();
        let p=this.state.profil;
        p.prenom=event.target.value;
        this.setState({profil:p});
        console.log(this.state.profil);
    }
    handleNom(event){
        event.preventDefault();
        let p=this.state.profil;
        p.nom=event.target.value;
        this.setState({profil:p});
    }
    handleUsername(event){
        event.preventDefault();
        let p=this.state.profil;
        p.username=event.target.value;
        this.setState({profil:p});
    }
    handlePassword(event){
        event.preventDefault();
        let p=this.state.profil;
        p.password=event.target.value;
        this.setState({profil:p});
    }
    handleRpassword(event){
        event.preventDefault();
        let p=this.state.profil;
        p.rpassword=event.target.value;
        this.setState({profil:p});
    }
    updateProfil(event){
        event.preventDefault();
        this.checkDiff();
        if(this.state.keys.length>0){
            let id=sessionStorage.getItem("id");
            let keys=JSON.stringify(this.state.keys);
            let valeur=JSON.stringify(this.state.valeur);
            let reponse=fetch(link+'/profil/updateProfil',{
                method:"post",
                body:"id="+id+"&keys="+keys+"&valeur="+valeur,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            });
            reponse.then(rep =>{
                rep.json().then(tontou =>{
                    let rep=tontou.reponse;
                    let keys=tontou.cles;
                    console.log(tontou);
                    let t=rep.every((el,i) =>{
                        return el[1]==true;        
                    });
                    if(t){
                        this.setState({keys:[]});
                       // this.setState({profil:{prenom:"",nom:"",username:"",password:"",rpassword:""}});
                        this.setState({success:true});
                        setTimeout(()=>{
                            this.setState({success:false});
                        },5000);
                        console.log(tontou);
                        
                    }else{
                        rep.forEach(el=>{
                            if(el[0]==="username" && el[1]===-1){
                                this.setState({errrorusername:true});
                                setTimeout(()=>{
                                    this.setState({errrorusername:false});
                                },5000);
                               // console.log("ce password exist deja");
                            }
                        })

                        
                    }
                });
            });
      }else{
          console.log("pas de modification");
      }
    }
    checkDiff(){
        let p1=this.state.profil;
        let p2=this.state.profilT;
        console.log(p1);
        console.log(p2);
        if(p1.prenom!==p2.prenom || p1.nom!==p2.nom || p1.username!==p2.username || (p1.password!=="" && p1.password!==undefined && p1.rpassword!=="" && p1.rpassword!==undefined)){
            if(p1.prenom!==p2.prenom){
                let key=this.state.keys;
                key.push("prenom");
                let val=this.state.valeur;
                val.prenom=p1.prenom;
                this.setState({keys:key,valeur:val});
               // this.state.keys.push("prenom");

               // this.state.valeur.prenom=p1.prenom;
            }
            if(p1.nom!==p2.nom){
                let key=this.state.keys;
                key.push("nom");
                let val=this.state.valeur;
                val.nom=p1.nom;
                this.setState({keys:key,valeur:val})
                //this.state.keys.push("nom");
               // this.state.valeur.nom=p1.nom;
            }
            if(p1.username!==p2.username){
                let key=this.state.keys;
                key.push("username");
                let val=this.state.valeur;
                val.username=p1.username;
                this.setState({keys:key,valeur:val});
               // this.state.keys.push("username");
                //this.state.valeur.username=p1.username;
            }
            if(p1.password!=="" && p1.password!==undefined && p1.rpassword!=="" && p1.rpassword!==undefined && p1.rpassword===p1.password){
                let key=this.state.keys;
                key.push("password");
                let val=this.state.valeur;
                val.password=p1.password;
                this.setState({keys:key,valeur:val});
               // this.state.keys.push("password");
                //this.state.valeur.password=p1.password;

            }
            if(p1.password!=="" && p1.password!==undefined && p1.rpassword!=="" && p1.rpassword!==undefined && p1.rpassword!==p1.password){
               // this.state.keys.push("password");
               // this.state.valeur.password=p1.password;
               alert("les mot de passe sont differant");
               this.setState({keys:[]});

            }

        }
    }

    render() { 
        return ( 
            <div>
                <div style={{backgroundColor:white}}>
                    <p style={{color:"blue"}}>profil page</p>
                </div>
                <form className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                    <fieldset>
                        <legend>Profil</legend>
                        <div className="form-group">
                            <label>Prenom</label>
                            <input onChange={(event)=>this.handlePrenom(event)} className="form-control" type="text" value={this.state.profil.prenom} />
                        </div>
                        <div className="form-group">
                            <label>Nom</label>
                            <input onChange={(event)=>this.handleNom(event)} className="form-control" type="text" value={this.state.profil.nom} />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input onChange={(event)=>this.handleUsername(event)} className="form-control" type="text" value={this.state.profil.username} />
                            <p className={this.state.errrorusername===true?"alert alert-danger show":"hide"}>l'identifiant choisi exist deja veuillez choisir un autre svp.</p>
                        </div>
                        <div className="form-group">
                            <label>Nouveau Mot de Passe</label>
                            <input onChange={(event)=>this.handlePassword(event)} value={this.state.password} type="password" className="form-control" className="form-control" />
                            
                        </div>
                        <div className="form-group">
                            <label>Repeter Nouveau Mot de Passe</label>
                            <input onChange={(event)=>this.handleRpassword(event)} value={this.state.rpassword} type="password" className="form-control" className="form-control" />
                        </div>
                        <p className={this.state.success===true?"alert alert-success show":"hide"}>modification effectue(s)</p><br/>
                        <button onClick={(event)=>this.updateProfil(event)} className="btn btn-success">valider modification</button>
                    </fieldset>
                </form>
            </div> 
         );
    }
}
 
export default Profil;