import React, { Component } from 'react';
import Produit from './produit';
import link from '../link';
//import { Table } from 'antd';
class Ecom extends Component {
    constructor(){
        super();
        this.state={
            prod:[],

        }
        this.getProductEcom();
    }
    state = {  }
    displayProduct(){
        let p=this.state.prod;
        return p.map((el,index)=>{
            return(
                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <Produit p={el} src="http://www.cloudpharma.org/images/laboratory-313864_640.jpg" />
                </div>
            )
        });
    }
    getProductEcom(){
        fetch(link+"/ecom/getproduct").then(rep =>rep.json()).then(t =>{
           console.log(t);
           this.setState({prod:t.prod});
           console.log(this.state.prod);
       })
   }
    render() { 
        const columnprod=[
            {
                title:'produit',
                width:100,
                dataIndex:'prod',
                key:'prod'
            },
            {
                title:'quantite',
                width:100,
                dataIndex:'qt',
                key:'qt'
            },
            {
                title:'prix',
                width:100,
                dataIndex:'prix',
                key:'prix'
            },
            {
                title:'action',
                width:100,
                
            }
        ]
        return ( 
            <div>
                <div style={{marginLeft:"2em",textAlign:"center",marginBottom:"0.3em"}}>
                        <input style={{width:"80%",borderRadius:"2em"}} type="search" placeholder=" Taper le nom d'un produit" />
                </div>
                <div style={{backgroundColor:"white",marginLeft:"2em"}} className="row">
                    
                </div>
            </div>
         );
    }
}
 
export default Ecom;