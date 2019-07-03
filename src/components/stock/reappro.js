import React, { Component } from 'react';
import Downshift from 'downshift';
import axios from 'axios';
import matchSorter from 'match-sorter';
class Reappro extends Component {
    constructor(){
        super();
        this.state = {
            inputValue:true,
            products:[],
            chosedProducts:[],
            produit:{
                ProductId:0,
                ProductTitle:"",
                quantite:1,
                SellingPriceOfUnit:0,
                sellingPriceTempon:0,
                PurchasePriceOfUnit:0,
                PurchasePriceTempon:0,
                peremption:"",
            },
        }
    }
    
    
    //777868436
    getItems(item,products){
        return item?matchSorter(products,item,{keys:['ProductTitle']}):[]
     }
     ajouter(event){
        event.preventDefault();
        console.log(this.state.produit);
         if(this.state.produit.ProductTitle!=="" && this.state.produit.ProductTitle!==undefined){            
            let p=this.state.chosedProducts;
            let some=this.state.chosedProducts.some(p=>{
                return p.ProductTitle===this.state.produit.ProductTitle;
            });
            if(some){
                console.log("meme produit");
                let q=parseInt(this.state.produit.quantite);
                p.forEach(el=>{
                    if(el.ProductTitle===this.state.produit.ProductTitle){
                        el.quantite+=q;

                    }
                });
                this.setState({chosedProducts:p});
                this.reinitProd();
            }else{
                p.push(this.state.produit)
                this.setState({chosedProducts:p});
                this.reinitProd();
                console.log(this.state.produit);
            }
         }
        

     }
     reinitProd(){
        let produit={
            ProductId:0,
            ProductTitle:"",
            quantite:1,
            SellingPriceOfUnit:0,
            sellingPriceTempon:0,
            peremption:null,
            PurchasePriceOfUnit:0,
            PurchasePriceTempon:0,
        };
        this.setState({produit:produit});

     }
     handleSelectedItem(data){
       // this.hideAutocom();
        let p={
          ProductId:data.ProductId,
          ProductTitle:data.ProductTitle,
          SellingPriceOfUnit:data.SellingPriceOfUnit,
          sellingPriceTempon:data.SellingPriceOfUnit,
          quantite:this.state.produit.quantite,
          PurchasePriceOfUnit:data.PurchasePriceOfUnit,
          PurchasePriceTempon:data.SellingPriceOfUnit,
        }
        this.setState({produit:p});
        console.log(this.state.produit);
        //document.getElementById('q').value=data.prix;
    }
    getProducts(event,prod){
        event.preventDefault();
        let init={
            prod:"prod", 
        };
       axios.post('http://127.0.0.1:8000/vendeur/getProducts/',{prod:prod}).then(res =>{
           if(res.status===200){
               console.log(res.data.data);
               //let data=JSON.parse(res.data.data.replace(/\'/g,'"'));
               let data=res.data.data;
               console.log(data);
               this.setState({products:data});  
           }else{
               if(res.status===500){
                   alert('erreur au niveau serveur');
               }
           }
         }).catch(err=>{
             console.log(err);
             console.log('som thing was wrong');
         });
        
    }
    handleQuantite(event){
        let p={ProductId:this.state.produit.ProductId,ProductTitle:this.state.produit.ProductTitle,quantite:event.target.value,SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit};
        this.setState({produit:p});
    }
    handlePeremption(event){
        event.preventDefault();
        let p=this.state.produit;
        p.peremption=event.target.value;
        console.log(p);
        this.setState({
            produit:p
        });
    }
    deletProd(event,i){
        event.preventDefault();
        let tab=this.state.chosedProducts.filter((p,key)=>{
            return i!==key;
        });
        this.setState({chosedProducts:tab});
    }
    totalPrice(){
        let p=0;
        this.state.chosedProducts.forEach(el =>{
            p+=el.PurchasePriceOfUnit*el.quantite;
        });
        return p;
    }
    handleSellingPrice(event){
        event.preventDefault();
        let p=this.state.produit;
        p.SellingPriceOfUnit=event.target.value;
        this.setState({produit:p});
    }
    handlePuchasePrice(event){
        event.preventDefault();
        let p=this.state.produit;
        p.PurchasePriceOfUnit=event.target.value;
        this.setState({produit:p});
    }
    render() { 
        return ( 
            <div>
                <div style={{backgroundColor:"white",paddingTop:"15px",paddingBottom:"15px"}}>
                    <form style={{width:"90%",marginLeft:"auto",marginRight:"auto"}}  className="form-inline">
                        <label style={{marginRight:"0.5em"}}>numero facture</label>
                        <input style={{marginRight:"0.5em"}} type="text" className="form-control" />
                        <label style={{marginRight:"0.5em"}}>fournisseur</label>
                        <select style={{marginRight:"0.5em"}} className="form-control">
                            <option>fournisseur 1</option>
                            <option>fournisseur 2</option>
                        </select>
                        <label style={{marginRight:"0.5em"}}>Date</label>
                        <input type="date" className="form-control" />
                    </form>
                </div>
                <div style={{backgroundColor:"white",paddingTop:"15px",paddingBottom:"15px"}}>
                    <form style={{width:"90%",marginLeft:"auto",marginRight:"auto"}}>
                        <label>Produit</label>
                        <div style={{display:"inline-block"}}>  
                                <Downshift >
                                    {({getLabelProps,getInputProps,isOpen,selectItem,highlightedIndex,inputValue,clearSelection})=>(
                                        <div>
                                            <input onKeyUp={(event)=>this.getProducts(event,inputValue)} {...getInputProps()} onClick={this.state.produit.SellingPriceOfUnit===0?clearSelection:""} />
                                            <ul id="ulauto">
                                                {isOpen 
                                                ? this.getItems(inputValue,this.state.products).map((p,index) => (<li className="liAutocomplete" key={p.id} onClick={()=>{selectItem(p.ProductTitle);this.handleSelectedItem(p)}}>{p.ProductTitle}</li>) 
                                                ):null}
                                            </ul>
                                        </div>
                                    )}
                                </Downshift>
                        </div>
                        <div style={{display:"inline-block",marginLeft:"5px",marginRight:"5px"}}>
                            <label style={{color:"black"}}>Quantite</label>
                            <input type="number" min="1" onChange={(event)=>this.handleQuantite(event)} value={this.state.produit.quantite} />
                        </div>
                        <div style={{display:"inline-block"}}>
                            <label style={{color:"black"}}>Peremption</label>
                            <input value={this.state.produit.peremption} onChange={(event)=>{this.handlePeremption(event)}} type="date" />
                        </div>
                        <div style={{marginLeft:"5px",display:"inline-block"}}>
                            <button onClick={(event)=>this.ajouter(event)} className="btn btn-primary">Ajouter</button>
                        </div>
                    </form>
                    <form style={{width:"90%",marginLeft:"auto",marginRight:"auto"}} className="form-inline">
                        <label>prix d'achat</label>
                        <input onChange={(event)=>this.handlePuchasePrice(event)} className="form-control" value={this.state.produit.PurchasePriceOfUnit} type="text"/>
                        <label>Prix de vente</label>
                        <input className="form-control" onChange={(event)=>this.handleSellingPrice(event)} value={this.state.produit.SellingPriceOfUnit} type="text" />

                    </form>
                </div>
                <div>
                    <table style={{width:"90%",marginLeft:"auto",marginRight:"auto",backgroundColor:"#CFD4FF"}} className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Produits</th>
                                <th>P.U</th>
                                <th>Quantite</th>
                                <th>P.T</th>
                                <th>Peremption</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.chosedProducts.map((p,i)=>{
                                console.log(p);
                                return(
                                    <tr key={i}>
                                        <td>{p.ProductTitle}</td>
                                        <td>{p.PurchasePriceOfUnit}</td>
                                        <td>{p.quantite}</td>
                                        <td>{p.PurchasePriceOfUnit*p.quantite}</td>
                                        <td>{p.peremption}</td>
                                        <td ><i style={{cursor:"pointer"}} onClick={(event)=>this.deletProd(event,i)} className="far fa-trash-alt"></i></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div style={{width:"40%",marginLeft:"auto",marginRight:"auto"}}>
                        <label style={{backgroundColor:"yellow",cursor:"pointer",marginRight:"15px",padding:"1.5em"}}>Total facture : {this.totalPrice()}</label>
                        <label style={{backgroundColor:"green",cursor:"pointer",padding:"1.5em"}}>Valider</label>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Reappro;