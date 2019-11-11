import React, { Component } from 'react';
import { stat } from 'fs';
import ListProd from './listProd';
import axios from 'axios';
import link from '../link';


class ListeProduit extends Component {
    constructor(){
        super();
        this.state={
            products:[],
            offset:10,
            index:0,
            link:'http://127.0.0.1:8000/',
            filterName:'',
        }
        this.getListProduct();
    }
    getListProduct(){
        let id=sessionStorage.getItem("id");
        let token=sessionStorage.getItem("token");
        let idShop=sessionStorage.getItem("idShop");
        axios({
            url:link+'/stock/listProduct',
            method:'post',
            data:"id="+id+"&token="+token+"&idShop="+idShop
        })
        .then((rep)=>{
            if(rep.status===200){
                console.log(rep);
                this.setState({products:rep.data.data});
            }else{
                this.setState({products:[]});
            }
           
        })
    }
    next(nb=0){
        if(nb===0){
            console.log(this.state.index);
            let length=this.state.products.length;
            let newIndex=length+this.state.offset;
            if(length>=newIndex){
                this.setState({index:this.state.index+this.state.offset});
            }
            
        }else{
            this.setState({index:nb*this.state.offset-this.state.offset});
        }
    }
    getli(){
        if(this.state.products.length>0){
            let nb=Math.ceil(this.state.products.length/this.state.offset);
            let tab=Array(nb).fill(0);
            return tab.map((el,index)=>{
                return(
                    <li key={index} className="page-item">
                        <span onClick={()=>this.next(index+1)} className="page-link" href="#">{index+1}</span>
                    </li>
                )
            });
        }else{
            console.log('products tab is empty');
        }
    }
    filterByName(){

    }
    handleFilterName(e){
        e.preventDefault();
        if(e.target.value!==""){
            this.setState({filterName:e.target.value});
            let p=this.state.products.filter((p,index)=>p.ProductTitle.includes(e.target.value)===true);
            this.setState({products:p});
            console.log(p);
        }else{
            this.setState({filterName:e.target.value});
            this.getListProduct();
        }
    }
    handleFilterRayon(e){
        e.preventDefault();
        axios.post(this.state.link+'stock/listProductByRayon/',{"rayon":e.target.value})
        .then(rep=>{
            if(rep.status===200){
                this.setState({products:rep.data.data})
                console.log(rep.data);
            }
        })

    }
    render() { 
        return ( 
            <div>
                <div style={{marginBottom:"10px"}}>
                    <div style={{display:"inline-Block"}}>
                        <label>Nom Product</label>
                        <input value={this.state.filterName} onChange={(event)=>this.handleFilterName(event)} type="text" placeholder="filtre" className="form-control" />
                    </div>
                    <div style={{display:"inline-Block",marginLeft:"15px"}}>
                        <label>Rayon</label>
                        <select onChange={(event)=>this.handleFilterRayon(event)} className="form-control">
                            <option value="0">Tout</option>
                        </select>
                    </div>
                </div>
                <table style={{backgroundColor:"white",color:"#1F838D"}} className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Quantite</th>
                            <th>P.V</th>
                            <th>Tva(18%)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <ListProd data={this.state.products} offset={this.state.offset} index={this.state.index}/>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        {this.getli()}
                        <li class="page-item">
                            <span class="page-link" onClick={()=>{this.next()}} >Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
         );
    }
}
 
export default ListeProduit;
