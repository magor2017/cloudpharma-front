import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ModalUpdateProd from './modalUpdateProd';
import axios from 'axios';
import link from '../link';

class ListProd extends Component {
    constructor(){
        super();
        this.state={
            link:'http://127.0.0.1:8000/',
        }
    }
    static propTypes = {
        data: PropTypes.array.isRequired,
        
    };
    deleteProduct(event,p){
        event.preventDefault();
        console.log(p);
        axios.post(link+'stock/deleteProduct/',{"id":p.ProductId})
        .then(rep =>{
            if(rep.status===200){
                if(rep.data.data===-1){
                    alert("impossible de supprimer ce produit");
                }else{
                    if(rep.data.data>0){
                        alert("produit supprime");
                    }
                }
               // console.log(rep.data);
            }
        });

    }
    render() { 
        let l="";
        if(this.props.data.length>0){
            let f=this.props.data.filter((el,index)=>(index>=parseInt(this.props.index) && index<parseInt(this.props.offset)+parseInt(this.props.index)));
            l=f.map((p,index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{p.ProductTitle}</td>
                        <td>{p.UnitsInStock}</td>
                        <td>{p.SellingPriceOfUnit}</td>
                        <td>{parseInt(p.Tva)===0?"Non":"Oui"}</td>
                        <td><span><ModalUpdateProd produit={p} /><i onClick={(event)=>this.deleteProduct(event,p)} style={{cursor:"pointer"}} className="far fa-trash-alt fa-2x"></i></span></td>
                    </tr>);
            });
       }
        return ( 
            <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                {l}
            </tbody>
        );
    }
}
 
export default ListProd;