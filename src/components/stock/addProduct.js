import React, { Component } from 'react';
import './addProduct.css';
import axios from 'axios';
import link from '../link';

class AddProduct extends Component {
    constructor(){
        super();
        this.state={
            produit:{
                    nom:"",
                    description:"",
                    quantite:0,
                    sellingPrice:0,
                    purchasePrice:0,
                    tva:0,
                    peremption:"",
                    rayon:0,
            }
        }
    }
    reinitialiseProduct(){
        let p={
                nom:"",
                description:"",
                quantite:0,
                sellingPrice:0,
                purchasePrice:0,
                tva:0,
                peremption:"",
                rayon:0,
            };
        this.setState({produit:p});
    }
    handleVale(event,nb){
        event.preventDefault();
        switch(nb){
            case 1:{
                let p={
                    nom:event.target.value,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 2:{
                let p={
                    nom:this.state.produit.nom,
                    description:event.target.value,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 3:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:event.target.value,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 4:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:event.target.value,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 5:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:event.target.value,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 6:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:event.target.value,
                    peremption:this.state.produit.peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 7:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:event.target.value,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 8:{
                let p={
                    nom:this.state.produit.nom,
                    description:this.state.produit.description,
                    quantite:this.state.produit.quantite,
                    sellingPrice:this.state.produit.sellingPrice,
                    purchasePrice:this.state.produit.purchasePrice,
                    tva:this.state.produit.tva,
                    peremption:this.state.produit.peremption,
                    rayon:event.target.value,
                }
                this.setState({produit:p});
                break;
            }
            default:{

            }

        }
    }
    addProduct(event){
        event.preventDefault();
        let id=sessionStorage.getItem('id');
        let token=sessionStorage.getItem('token');
        let idShop=sessionStorage.getItem('idShop');
        if(this.state.produit.nom!=="" && this.state.produit.nom!==undefined){
            axios({
                url:link+'/stock/addProduct',
                method:'post',
                data:'id='+id+'&token='+token+'&idShop='+idShop+'&product='+JSON.stringify(this.state.produit)
            })
            .then((rep)=>{
                if(rep.status===200){
                    switch(rep.data.status){
                    case 1:{
                        this.reinitialiseProduct();
                        alert("produit ajoute");
                        break;
                    }
                    case 0:{
                        alert("une erreur est survenue lors de l'ajout du produit veuillez reessayer plutards");
                        break;
                    }
                    case -1:{
                        alert("produit deja ajoute");
                        break;
                    }
                    default:{
                        alert("une erreur est survenue lors de l'ajout du produit veuillez reessayer plutards");
                    }
                }
                }
                console.log(rep)
            });
       }else{
           alert("le Nom du produit obligatoire");
       }
        console.log(this.state.produit);
    }
    render() { 
        return ( 
            <form className="row">
                <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div className="form-group">
                        <label>Nom Product</label>
                        <input value={this.state.produit.nom} onChange={(event)=>this.handleVale(event,1)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input value={this.state.produit.description} onChange={(event)=>this.handleVale(event,2)} type="texTarea" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Quantite</label>
                        <input value={this.state.produit.quantite} onChange={(event)=>this.handleVale(event,3)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Prix d'achat</label>
                        <input value={this.state.produit.purchasePrice} onChange={(event)=>this.handleVale(event,4)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Prix de vente</label>
                        <input value={this.state.produit.sellingPrice} onChange={(event)=>this.handleVale(event,5)} type="text" className="form-control" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div className="form-group">
                        <label>Tva</label>
                        <select value={this.state.produit.tva} onChange={(event)=>this.handleVale(event,6)} className="form-control">
                            <option value="0">Non</option>
                            <option value="1">Oui</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Rayon</label>
                        <select value={this.state.produit.rayon} className="form-control" onChange={(event)=>this.handleVale(event,8)}>
                            <option value="0">default</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Peremption</label>
                        <input type="date" value={this.state.produit.peremtion} onChange={(event)=>this.handleVale(event,7)} className="form-control" />
                    </div>
                </div> 
                <button onClick={(event)=>this.addProduct(event)} className="btn btn-success btn-block">Ajouter</button>
            </form>
         );
    }
}
 
export default AddProduct;