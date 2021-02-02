import React, { Component } from 'react';
import { post } from '../service';
import { Table,Button} from 'antd';
class MyProducts extends Component {
    constructor(){
        super();
        this.state={
            products:[]
        }
        this.getProducts();
    }
    getProducts(){
        let idShop=sessionStorage.getItem("idShop");
        let body="idPharm="+idShop;
        post('/produit/getMyProducts',body).then(rep=>{
            console.log(rep);
            let p=rep.data.pav.map((el,i)=>{
                return {produit:el.nom,qt:el.quantite,qtr:el.qtr,pu:el.newPrice,pt:el.quantite*el.newPrice,peremption:el.peremption};
            });
            this.setState({products:p});
        });
       /* fetch(link+"/ecom/getMyProducts",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep =>rep.json()).then(json=>{
            console.log(json);
            this.setState({products:json});
        });*/
    }
    displayProducts(){
        let p=this.state.products.map((p,i)=>{
            return(<tr key={i}>
                <td>{p.productName}</td>
                <td>{p.quantite}</td>
                <td>{this.calculprice(p.prix)}</td>
                <td>{this.calculprice(p.prix)*p.quantite}</td>
                <td>{p.peremption}</td>
                <td><input type="button" value="annuler" className="btn btn-danger" /></td>
            </tr>)
        })
        return(
            <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
            {p}
        </tbody>
        )
    }
    calculprice(prix){
        return (prix-(prix*5)/100);
    }
    render() { 
        const columns=[
            {
                title:'Produit',
                dataIndex:'produit',
                key:'produit'
            },
            {
                title:'Quantite',
                dataIndex:'qt',
                key:'qt'
            },
            {
                title:'Quantite restant',
                dataIndex:'qtr',
                key:'qtr'
            },
            {
                title:'P.u',
                dataIndex:'pu',
                key:'pu'
            },
            {
                title:'P.t',
                dataIndex:'pt',
                key:'pt'
            },
            {
                title:'Peremption',
                dataIndex:'peremption',
                key:'peremption'
            },
            {
                title:'Action',
                dataIndex:'action',
                key:'action',
                render:()=>{
                    return(
                        <>
                            <Button type="danger">Annuler</Button>
                            <Button type="primary">Modifier</Button>
                        </>
                    );
                }
            }
        ];
        return ( 
            
            <Table columns={columns} dataSource={this.state.products}></Table>
         );
    }
}
 
export default MyProducts;