import React, { Component } from 'react';
import link from '../link';
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
        fetch(link+"/ecom/getMyProducts",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep =>rep.json()).then(json=>{
            console.log(json);
            this.setState({products:json});
        });
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
        return ( 
            
            <table style={{backgroundColor:"white",color:"#1F838D"}} className="table table-striped table-condensed">
                <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantite</th>
                            <th>P.U</th>
                            <th>P.T</th>
                            <th>Peremption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                {this.displayProducts()}
            </table>
         );
    }
}
 
export default MyProducts;