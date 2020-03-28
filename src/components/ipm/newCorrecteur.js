import React, { Component } from 'react';
import link from '../link';
class NewCorrecteur extends Component {
    constructor(){
        super();
        this.state={
            correcteurs:[],
        }
        this.getCorrecteur();
    }
    getCorrecteur(){
        fetch(link+"/ipm/getCorrecteur",{
            method:"post",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep =>rep.json()).then(text=>{
            this.setState({correcteurs:text});
            console.log(text);
        });
    }
    AjouterCorrecteur(event,idCorrecteur){
        event.preventDefault();
        let idIpm=sessionStorage.getItem("id");
        if(window.confirm("voulez vous ajouter ce correcteur?")){
            fetch(link+'/ipm/addCorrecteur',{
                method:"post",
                body:"idIpm="+idIpm+"&idCorrecteur="+idCorrecteur,
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>rep.json()).then(text=>{
                if(text.rep===true){
                    alert("correcteur ajoute.");
                }else{
                    alert("correcteur deja ajoute.")
                }
            })
        }
    }
    displayAllCorrecteur(){
        let c=this.state.correcteurs.map((el,i)=>{
            return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{el.prenom}</td>
                        <td>{el.nom}</td>
                        <td><input type="button" onClick={(event)=>this.AjouterCorrecteur(event,el.idUser)} className="btn btn-success" value="ajouter" /></td>
                    </tr>
        });
        return c;
    }
    render() { 
        return ( 
            <div>
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
                        {this.displayAllCorrecteur()}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default NewCorrecteur;