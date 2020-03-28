import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';
import axios from 'axios';
import link from '../link';
class ModalUpdate extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            produit:{},
            pTempon:{},
            ecom:false,
            ecomquantite:0,
            /*produit:{
                    Produc:"",
                    description:"",
                    quantite:0,
                    sellingPrice:0,
                    purchasePrice:0,
                    tva:0,
                    peremption:"",
                    rayon:0,
            }*/
            
        }
        console.log("this is our props"+props.produit);
    }
    handleClose() {
        //event.preventDefault();
        this.setState({ show: false,ecom:false });
      }
    
      handleShow(event,p) {
          event.preventDefault();
          this.setState({ show: true ,produit:p,pTempon:p});
          console.log(p);
      }
      setProductToEcom(id){
          console.log(id);
          this.setState({ecom:true})
        

      }
      validerSetProductEcom(id){
          console.log(this.state.produit);
          if(parseInt(this.state.ecomquantite)>0 && this.state.produit.Peremption!="" && this.state.produit.Peremption!=undefined){
                fetch(link+"/ecom/setProductToEcom",{
                method:"POST",
                body:"id="+id+"&idShop="+sessionStorage.getItem("idShop")+"&idUser="+sessionStorage.getItem("id")+"&quantite="+this.state.ecomquantite+"&peremption="+this.formatDate(this.state.produit.Peremption),
                headers:{"Content-Type": "application/x-www-form-urlencoded"}
            }).then(rep=> rep.json()).then(json=>{
                console.log(json);
                if(json.rep){
                    alert("produit mis en vente");
                    this.setState({show:false});
                }else{
                    alert("une erreur est survenue lors de la mis en vente.");
                }
            });
        }else{
            if(parseInt(this.state.ecomquantite)<=0){
                alert("la quantite doit etre superieur a zero");
            }else{
                alert("veuillez mettre la date de peremption.");
            }
        }
      }
      removeProductFromEcom(id){
        console.log(id);
          fetch(link+"/ecom/removeProductFromEcom",{
              method:"POST",
              body:"id="+id,
              headers:{"Content-Type": "application/x-www-form-urlencoded"}
          }).then(rep=> rep.json()).then(json=>{
              console.log(json);
          });

      }
      validerUpdate(){
          let id=sessionStorage.getItem("id");
          let token=sessionStorage.getItem("token");
          let idShop=sessionStorage.getItem("idShop");
          this.isChanged(id,token,idShop);
      }
      btnEcom(){
          let add=<button style={{display:this.state.ecom===false?"inline-block":"none"}} onClick={()=>this.setProductToEcom(this.state.produit.ProductId)} className="btn btn-success">ajouter E.com</button>;
          let del=<button style={{display:this.state.ecom===false?"inline-block":"none"}} onClick={()=>this.removeProductFromEcom(this.state.produit.ProductId)} className="btn btn-danger">retirer E.com</button>;
          return parseInt(this.state.produit.ecom)===0?add:del;
      }
      //test si le produit a ete modifier et met a jour le produit
      isChanged(id,token,idShop){
          let p1=this.state.pTempon;
          let p2=this.state.produit;
          let param={};
          let tab=[];
          if(p1.ProductTitle!==p2.ProductTitle || p1.ProductDescription!==p2.ProductDescription || p1.UnitsInStock!==p2.UnitsInStock || p1.SellingPriceOfUnit!==p2.SellingPriceOfUnit || p1.PurchasePriceOfUnit!==p2.PurchasePriceOfUnit || p1.Peremption!==p2.Peremption || p1.Tva!==p2.Tva){
              
              if(window.confirm("etes-vous sure de vouloir modifier ce produit")){
                if(p1.ProductTitle!==p2.ProductTitle){
                    param.ProductTitle=p2.ProductTitle;
                    tab.push('ProductTitle');
                }
                if(p1.ProductDescription!==p2.ProductDescription){
                    param.ProductDescription=p2.ProductDescription;
                    tab.push("ProductDescription");
                }
                if(p1.UnitsInStock!==p2.UnitsInStock){
                    param.UnitsInStock=p2.UnitsInStock;
                    tab.push("UnitsInStock");
                }
                if(p1.SellingPriceOfUnit!==p2.SellingPriceOfUnit){
                    param.SellingPrice=p2.SellingPriceOfUnit;
                    tab.push("SellingPrice");
                }
                if(p1.PurchasePriceOfUnit!==p2.PurchasePriceOfUnit){
                    param.PurchasePriceOfUnit=p2.PurchasePriceOfUnit;
                    tab.push("PurchasePriceOfUnit");
                }
                if(p1.Peremption!==p2.Peremption){
                    param.Peremption=p2.Peremption;
                    tab.push("Peremption");
                }
                if(p1.Tva!==p2.Tva){
                    param.Tva=p2.Tva;
                    tab.push("tva")
                }
                console.log(param);
                axios({
                    url:link+'/stock/updateProduct',
                    method:'post',
                    data:'ProductId='+p2.ProductId+'&param='+JSON.stringify(param)+'&attribut='+JSON.stringify(tab)+'&id='+id+'&token='+token+'&idShop='+idShop,
                })
                .then(rep =>{
                    if(rep.status===200){
                        console.log(rep);
                      //  let reponse=rep.data.data;
                       // this.handleClose();
                        //console.log(reponse);
                    }
                })
              }
          }else{
              console.log("pas de modification")
          }
      }
      handleVale(event,nb){
        event.preventDefault();
        switch(nb){
            case 1:{
                let p={
                    
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:event.target.value,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
               // let p=this.state.produit;
               // p.ProductTitle=event.target.value
                this.setState({produit:p});
                break;
            }
            case 2:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:event.target.value,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 3:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:event.target.value,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 4:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:event.target.value,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 5:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:event.target.value,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 6:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:event.target.value,
                    Peremption:this.state.produit.Peremption,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 7:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:event.target.value,
                    rayon:this.state.produit.rayon,
                }
                this.setState({produit:p});
                break;
            }
            case 8:{
                let p={
                    ProductId:this.state.produit.ProductId,
                    ProductTitle:this.state.produit.ProductTitle,
                    ProductDescription:this.state.produit.ProductDescription,
                    UnitsInStock:this.state.produit.UnitsInStock,
                    SellingPriceOfUnit:this.state.produit.SellingPriceOfUnit,
                    PurchasePriceOfUnit:this.state.produit.PurchasePriceOfUnit,
                    Tva:this.state.produit.Tva,
                    Peremption:this.state.produit.Peremption,
                    rayon:event.target.value,
                }
                this.setState({produit:p});
                break;
            }
            default:{

            }

        }
    }
    handlePeremEcom(event){
        event.preventDefault();
        let p=this.state.produit;
        p.Peremption=this.formatDate(event.target.value);
        this.setState({produit:p});
    }
    formatDate(date){
       // let d=date.split('-');
       // return d[2]+"/"+d[1]+"/"+d[0];
        return date;
    }
    handleQuantiteEcom(event){
        event.preventDefault();
        this.setState({ecomquantite:event.target.value});

    }
    render() { 
        return ( 
            <>
            <span style={{cursor:"pointer"}} onClick={(event)=>this.handleShow(event,this.props.produit)}><i className="fas fa-edit fa-2x"></i></span>
            <Modal size="lg"  show={this.state.show} onHide={()=>this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Modification d'un produit </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{"display":this.state.ecom===false?"block":"none"}}>
              <form  className="row">
                <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div className="form-group">
                        <p>Produit</p>
                        <input value={this.state.produit.ProductTitle} onChange={(event)=>this.handleVale(event,1)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <p>Description</p>
                        <input value={this.state.produit.ProductDescription} onChange={(event)=>this.handleVale(event,2)} type="texTarea" className="form-control" />
                    </div>
                    <div className="form-group">
                        <p>Quantite</p>
                        <input value={this.state.produit.UnitsInStock} onChange={(event)=>this.handleVale(event,3)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <p>Prix d'achat</p>
                        <input value={this.state.produit.PurchasePriceOfUnit} onChange={(event)=>this.handleVale(event,4)} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <p>Prix de vente</p>
                        <input value={this.state.produit.SellingPriceOfUnit} onChange={(event)=>this.handleVale(event,5)} type="text" className="form-control" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div>
                        <p>Tva</p>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 form-group" >
                                <input className="form-control" type="text" value={parseInt(this.state.produit.Tva)===0?"Non":"Oui"} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 form-group">
                                <select className="form-control"   onChange={(event)=>this.handleVale(event,6)} >
                                    <option value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>

                            </div>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <p>Rayon</p>
                        <select value={this.state.produit.rayon} className="form-control" onChange={(event)=>this.handleVale(event,8)}>
                            <option value="0">default</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Peremption</p>
                        <input type="date" value={this.state.produit.Peremption} onChange={(event)=>this.handleVale(event,7)} className="form-control" />
                    </div>
                </div> 
                
            </form>
            </div>
            <form style={{"display":this.state.ecom===true?"inline-block":"none"}}>
                <div><span>Produit : {this.state.produit.ProductTitle}</span></div>
                <div><span>Quantite a vendre : <input value={this.state.ecomquantite} onChange={(event)=>this.handleQuantiteEcom(event)} type="number" /></span></div>
                <div><span>Prix de vente actuel : {parseInt(this.state.produit.PurchasePriceOfUnit)}</span></div>
                <div><span>Prix de vente esperer : {this.state.produit.PurchasePriceOfUnit-(this.state.produit.PurchasePriceOfUnit*15)/100}</span></div>
                <div><span>Peremption :<span style={{marginRight:"0.5em"}}>{this.state.produit.Peremption}</span><input onChange={(event)=>this.handlePeremEcom(event)} type="date" value={this.state.produit.Peremption} /></span></div>
            </form>
              </Modal.Body>
              <Modal.Footer>
                <Button style={{display:this.state.ecom===false?"inline-block":"none"}} variant="secondary" onClick={()=>this.validerUpdate()} >
                  valider
                </Button>
                <Button variant="primary" onClick={()=>this.handleClose()}>
                  annuler
                </Button>
                {this.btnEcom()}
                <button className="btn btn-success" onClick={()=>this.validerSetProductEcom(this.state.produit.ProductId)} style={{display:this.state.ecom===true?"inline-block":"none"}}>valider</button>
              </Modal.Footer>
            </Modal>
          </>
         );
    }
}
 
export default ModalUpdate;