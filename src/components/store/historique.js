import React,{Component} from 'react';
import link from '../link';
import { thisExpression } from '@babel/types';
import { post } from '../service';
import { Table } from 'antd'; 
//import { Table } from 'react-bootstrap';
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
        let body="idPharm="+idShop;
        post('/produit/getBuyedProducts',body).then(rep=>{
            console.log(rep.data.pa);
           /* let pa=rep.data.pa.map((el,i)=>{
                return {produit:el.}
            });*/
            this.setState({commandes:rep.data.pa});
        });
       /* fetch(link+"/ecom/getCommandes",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(json=>{
            this.setState({commandes:json});
            console.log(json);
        })*/

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
        const columns=[
            {
                title:"Produit",
                dataIndex:"produit",
                key:"produit"
            },
            {
                title:"Quantite",
                dataIndex:"qt",
                key:"qt"
            },
            {
                title:"P.u",
                dataIndex:"pu",
                key:"pu"
            },
            {
                title:"P.t",
                dataIndex:"pt",
                key:"pt"
            },
            {
                title:"Etat",
                dataIndex:"etat",
                key:"etat",
                render:(text,record)=>{
                    if(record.etat===0){
                        return <span style={{color:'red'}}>en cour de traitement</span>;
                    }
                    if(record.etat===1){
                        return <span style={{color:'yellow'}}>avec le livreur</span>;
                    }
                    if(record.etat===2){
                        return <span style={{color:'green'}}>livré</span>;
                    }
                }
            }
        ];
        return (
                <Table columns={columns} dataSource={this.state.commandes} ></Table>
          );
    }
}
 
export default Historique;