import React,{Component} from 'react';
import link from '../link';
import { thisExpression } from '@babel/types';
class Historique extends Component {
    constructor(){
        super();
        this.state={
            commandes:[],
        }
        this.getCommandes();
    }
    getCommandes(){
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+"/ecom/getCommandes",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(json=>{
            this.setState({commandes:json});
            console.log(json);
        })

    }
    displayEtat(etat){
        let rep;
        switch(parseInt(etat)){
            case 0:{
                rep=<span style={{color:"red"}}>en cour de traitement</span>;
                break;
            }
            case 1:{
                rep=<span style={{color:"orange"}}>avec le livreur</span>;
                break;
            }
            case 2:{
                rep=<span style={{color:"green"}}>livre</span>
                break;
            }
        }
        return rep;
    }
    displayCommandes(){
        let p=this.state.commandes.map((p,i)=>{
            let prod=JSON.parse(p.produit)
            return(<tr key={i}>
                <td>{i+1}</td>
                <td>{prod.ProductTitle}</td>
                <td>{p.quantite}</td>
                <td>{p.prixAchat}</td>
                <td>{p.quantite*p.prixAchat}</td>
                <td>{this.displayEtat(p.etat)}</td>
            </tr>)
        });
        return(
        <table style={{backgroundColor:"white",color:"#1F838D"}} className="table table-striped table-condensed">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Produit</th>
                            <th>Quantite</th>
                            <th>P.U</th>
                            <th>P.T</th>
                            <th>Etat</th>
                        </tr>
                    </thead>
                
                <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                    {p}
                </tbody>
                
            </table>
        );
    }
    render() { 
        return (
            <div>
                {this.displayCommandes()}
            </div>
          );
    }
}
 
export default Historique;