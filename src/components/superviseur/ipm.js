import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import link from '../link';
import HistoriqueFactureIpm from './historiqueFactureIpm';
import HistoriqueCorrectionIpm from './historiqueCorrectionIpm';
class IpmSup extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div> IPM MANAGER</div>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/superviseur/ipm" >A corriger</Link></li>
                            <li><Link to="/superviseur/ipm/historiqueCorrection">Historique Correction</Link></li>
                            <li><Link to="/superviseur/ipm/historiqueFacture" >Historique Facture</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/superviseur/ipm" component={Acorriger} />
                        <Route exact path="/superviseur/ipm/historiqueCorrection" component={HistoriqueCorrectionIpm} />
                        <Route exat path="/superviseur/ipm/historiqueFacture" component={HistoriqueFactureIpm} />
                    </Switch>
                </Router>
                
            </div>
         );
    }
}
 
export default IpmSup;
class Acorriger extends Component{
    constructor(){
        super();
        this.state={
            pac:[],
            note:'',
        }
        this.getProduitAcorriger();
    }
    getProduitAcorriger(){
        fetch(link+"/ipm/getProduitAcorriger",{
            method:"post",
            body:"idCorrecteur="+sessionStorage.getItem("id"),
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(text=>{
            this.setState({pac:text});
            console.log(text);
        });
    }
    handleNote(event,i){
        event.preventDefault();
       // console.log(this.state.pac);
        let eles=this.state.pac;
        eles[i].note=event.target.value;
        this.setState({pac:eles});
       // console.log(this.state.pac);
    }
    validerNote(event,i){
        event.preventDefault();
        console.log(this.state.pac[i].note);
        if(this.state.pac[i].note!=="" && this.state.pac[i].note!==undefined){
            if(window.confirm("Etes-vous sure de vouloir enregistrer cette note.")){
                fetch(link+"/ipm/validerNote",{
                    method:"post",
                    body:"prod="+JSON.stringify(this.state.pac[i]),
                    headers:{
                        "content-Type":"application/x-www-form-urlencoded"
                    }
                }).then(rep =>rep.json()).then(text=>{
                    console.log(text);
                    if(text.rep){
                        alert("note enregistrée.");
                    }else{
                        alert("problem avec le serveur.");
                    }
                });
            }
        }else{
            alert("veulliez remplire le champ note svp.")
        }
        
    }
    render(){
        return(
            <div>
                <table boder="2" className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}} >
                        <tr key="-1">
                            <th>#</th>
                            <th>Produit</th>
                            <th>Ipm</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {
                            this.state.pac.map((el,i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{el.productName}</td>
                                    <td>{JSON.parse(el.ipm).ipm}</td>
                                    <td><textarea value={this.state.pac[i].note} onChange={(event)=>this.handleNote(event,i)} rows="2" cols="20" placeholder="votre commentaire ici"  ></textarea></td>
                                    <td><input onClick={(event)=>this.validerNote(event,i)} type="button" value="valider" className="btn btn-success" /></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}