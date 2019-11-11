import React, { Component } from 'react';
import './historique.css';
import ListProd from './listProd';
import axios from 'axios';
import link from '../link';
//import ReactPaginate from 'react-paginate';

class Historique extends Component {
    constructor(){
        super();
        this.state={
            products:[],
            index:0,
            offset:10,
            date1:"",
            date2:"",
            date3:"",
        }
        this.getProductsByDate("");
    }
    getProductsByDate(date){
        let d="";
        if(date!==""){
            d=date.replace(/\'-/g,"/");
        }
        let id=sessionStorage.getItem('id');
        let idShop=sessionStorage.getItem('idShop');
        axios({
            url:link+'/vente/getProductByDate',
            method:'post',
            data:'date='+d+'&id='+id+'&idShop='+idShop,
        })
        .then((rep)=>{
           if(rep.status===200){
              // console.log(rep);
               this.setState({products:rep.data})
           }
           
        });
    }
    getProductsByInterval(date1,date2){
        //let d1=date1.replace(/-/g,"/")
        //let d2=date2.replace(/-/g,"/")
       // console.log("date deb "+date1);
        //console.log("date fin "+date2);
        let id=sessionStorage.getItem('id');
        let idShop=sessionStorage.getItem('idShop');
        let token=sessionStorage.getItem("token");
        let level=sessionStorage.getItem("level");
        axios({
            url:link+'/vente/getProductByInterval',
            method:'post',
            'data':'dateDeb='+date1+'&dateFin='+date2+'&id='+id+'&idShop='+idShop+'&token='+token+'&level='+level
        })
        .then((rep)=>{
           if(rep.status===200){
              // console.log(rep);
               this.setState({products:rep.data})
           }
        });

    }
    state = {  }
    nbTransactions(){
        return this.state.products.length;
    }
    getCa(){
        let ca=0;
        this.state.products.forEach(trans => {
            ca+=parseInt(trans.TotalPrice);
            
        });
        return ca;
    }
    
    next(nb=0){
        if(nb===0){
           // console.log(this.state.index);
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
        let nb=Math.ceil(this.state.products.length/this.state.offset);
        let tab=Array(nb).fill(0);
        return tab.map((el,index)=>{
            return(
                <li className="page-item">
                    <span onClick={()=>this.next(index+1)} className="page-link" href="#">{index+1}</span>
                </li>
            )
        });

    }
    handleDate1(event){
        event.preventDefault();
        this.setState({date1:event.target.value});
    }
    handleDate2(event){
        event.preventDefault();
        this.setState({date2:event.target.value});
    }
    handleDate3(event){
        event.preventDefault();
        this.setState({date3:event.target.value});
    }

    render() { 
        return (
            <div style={{width:"90%",marginLeft:"auto",marginRight:"auto"}}>
                <div className={this.state.products.length>0?"show":"hide"}>
                    <label style={{color:"white",backgroundColor:"green",margin:"2px",padding:"2px"}}>CA : {this.getCa()}</label>
                    <label style={{color:"white",backgroundColor:"green",margin:"2px",padding:"2px"}}>NBTransaction : {this.nbTransactions()}</label>
                </div>
                <div>
                    <div style={{display:"inline-block",margin:"5px"}}>
                        <nav className="navbar navbar-light bg-light">
                            <fieldset>
                                <legend>Par Date</legend>
                                <form className="form-inline">
                                    <input  onChange={(event)=>this.handleDate1(event)} value={this.state.date1} className="form-control mr-sm-2" type="date" placeholder="Search" aria-label="Search" />
                                    <button onClick={()=>this.getProductsByDate(this.state.date1)} className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                                </form>
                            </fieldset>
                            
                        </nav>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline">
                                <legend>Interval</legend>
                                <fieldset>
                                    <input value={this.state.date2} onChange={(event)=>this.handleDate2(event)} className="form-control mr-sm-2" type="date" placeholder="Debut" aria-label="Search" />
                                    <input value={this.state.date3} onChange={(event)=>this.handleDate3(event)} className="form-control mr-sm-2" type="date" placeholder="Fin" aria-label="Search" />
                                    <button onClick={()=>this.getProductsByInterval(this.state.date2,this.state.date3)} className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                                </fieldset>
                                
                            </form>
                        </nav>
                    </div>
                </div>
                <table boder="2" className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}} >
                        <tr>
                            <th>#</th>
                            <th>Facture</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <ListProd data={this.state.products} offset={this.state.offset} index={this.state.index}/>
                    
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Previous</a>
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
 
export default Historique;