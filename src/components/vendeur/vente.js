import React, { Component } from 'react';
import './vente.css'
import { relative } from 'path';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import axios from 'axios';
import link from '../link';
import { Button,Modal } from 'react-bootstrap';
import { placeholder } from '@babel/types';

class Vente extends Component {
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
            },
            ipm:{},
            client:{},
        }
    }
    
      handleSelectedItem(data){
          this.hideAutocom();
          let p={
            ProductId:data.ProductId,
            ProductTitle:data.ProductTitle,
            SellingPriceOfUnit:data.SellingPriceOfUnit,
            quantite:this.state.produit.quantite
          }
          this.setState({produit:p});
          console.log(this.state.produit);
          //document.getElementById('q').value=data.prix;
      }
      addProd(p){
          let prods=this.state.chosedProducts;
         let q=this.state.produit.quantite;
         if(q>0 && !isNaN(q) && q!==undefined && q!==""){
            let some=this.state.chosedProducts.some((el)=>{
                if(el.ProductTitle===p.ProductTitle){
                  return true;
                }
            });
            if(some){
                let products=this.state.chosedProducts;
                products.forEach((el,index)=>{
                    if(el.ProductTitle===p.ProductTitle){
                        el.quantite+=parseInt(q);
                        this.setState({chosedProducts:products});
                        this.initPropsProd();
                    }
                });
  
            }else{
              if(p.ProductTitle!=="" && p.ProductTitle!=undefined && !isNaN(p.SellingPriceOfUnit) && parseInt(p.SellingPriceOfUnit)>0){
                    let produit=p;
                    produit.quantite=q
                    prods.push(produit);
                    this.setState({chosedProducts: prods});
                    this.initPropsProd();  
              }
            }
         }
      }
      initPropsProd(){
        let prod={
            ProductId:0,
            ProductTitle:"",
            quantite:1,
            SellingPriceOfUnit:0
        }
        this.setState({produit:prod});

      }
      deleteProd(p){
        let produits=this.state.chosedProducts.filter((el,index)=>el.ProductTitle!==p.ProductTitle);
        this.setState({chosedProducts:produits});
      }
      totalPrice(){
          let prix=0;
          this.state.chosedProducts.forEach((p)=>{
              prix+=p.SellingPriceOfUnit*p.quantite;
          });
          return prix;

      }
       getItems(item,products){
             return item?matchSorter(products,item,{keys:['ProductTitle']}):[]
          //return products;
        }
    handleQuantite(event){
        event.preventDefault();
        let qu=parseInt(event.target.value);
        let p=this.state.produit;
        p.quantite=qu
        this.setState({
            produit:p
        });
        console.log('event!!!');
    }
   handleProd(event){
       event.preventDefault();
       let qu=event.target.value;
        this.setState({
            produit:{ProductTitle:qu},
        });
   }
   hideAutocom(event){
       // event.preventDefault();
        this.setState({auto:false});
   }
   validerVente(){
       console.log('vente validee');
       fetch('http://127.0.0.1:8000/vendeur/vente/').then(res =>res.json()).then(resjson=>{
           if(resjson.status===200){
           }
            console.log(resjson);   
       });
   }
   getProducts(event,prod){
       event.preventDefault();
       let init={
           prod:"prod", 
       };
       let id=sessionStorage.getItem("id");
       let token=sessionStorage.getItem("token");
       let level=sessionStorage.getItem("level");
       let idShop=sessionStorage.getItem("idShop");
       console.log("id,token,level,idShop",id,token,level,idShop);
      axios({
          url:link+'/vente/getProducts',
          method:'post',
          data:'id='+id+'&token='+token+'&level='+level+'&idShop='+idShop,
          headers:{"Content-Type":"application/x-www-form-urlencoded"}
      }).then(res =>{
          if(res.status===200){
              //console.log(res.data.data);
              //let data=JSON.parse(res.data.data.replace(/\'/g,'"'));
              let data=res.data.data;
              //console.log(data);
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
   saveBill(){
       //chosedProducts
       let params={
           products:JSON.stringify(this.state.chosedProducts),
           token:"jdjdhddjnbcxrsju",
           idUser:988,
           total:this.totalPrice(),
       }
       let token=sessionStorage.getItem('token');
       let id=sessionStorage.getItem('id');
       let level=sessionStorage.getItem('level');
       let idShop=sessionStorage.getItem('idShop');
       let ipmc=sessionStorage.getItem("ipmc");
       let client=sessionStorage.getItem("client");
      // console.log(ipmc);
       //console.log(client);
       
       let products=JSON.stringify(this.state.chosedProducts);
       let ventetype=this.getVenteType();
       if(ventetype==='ipm'){
        let ip=JSON.parse(ipmc);
        let c=JSON.parse(client);
        if(ip===null || c===null || ip.ipm==="" || c.prenom==="" || c.nom==="" || c.matricule===""){
             alert("veuillez choisir l'ipm et le client");
             return;
        }

    }
       if(this.state.chosedProducts.length>=1 && ventetype!==''){
            axios({
                url:link+'/vente/saveBill',
                method:'post',
                data:'products='+products+'&token='+token+'&id='+id+'&level='+level+'&total='+this.totalPrice()+'&idShop='+idShop+'&ventetype='+ventetype+'&ipmc='+ipmc+'&client='+client,
            })
            .then(rep =>{
                if(rep.status===200){
                    console.log(rep);
                    if(rep.data.status===1){
                        this.setState({chosedProducts:[]});
                        sessionStorage.removeItem("ipmc");
                        sessionStorage.removeItem("client");
                        let t=document.getElementsByName("ventetype");
                        t[0].checked=false;
                        t[1].checked=false;
                        alert("vente reussi");
                    }else{
                        alert("erreur au niveau du serveur");
                    }
                }
                //console.log(rep);
                })
            .catch(err => console.log(err));
    }else{
        if(this.state.chosedProducts.length<=0){
            alert("il faut choisir au moins un produit !!!");
        }else{
            alert("veuillez choisir le type de vente");
        }
    }

   }
   getVenteType(){
       let tab=document.getElementsByName("ventetype");
       let ele='';
       tab.forEach(el=>{
           if(el.checked){
               ele=el.value;
           }
       });
       console.log(ele);
       if(ele===''|| ele===undefined){
           return ''
       }
       return ele;
   }
   
    render() { 
       /* let products=[
            {id:1,name:"product1",prix:2000},
            {id:2,name:"adama1",prix:4000},
            {id:3,name:"goudiaby2",prix:3000},
            {id:3,name:"rasta",prix:3000}
        ]*/
        
        return ( 
                <div id="body" >
                    <div id="ajout" onClick={(event)=>this.hideAutocom(event)}>
                        <p>Ajouter un Produit</p>
                        <div>
                            <div  style={{width:"40%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Produit</label>
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
                            </div>
                            <div className="qp" >
                                <label>Quantite</label>
                                <input value={this.state.produit.quantite} onChange={(event)=>this.handleQuantite(event)}  type="number" min="1" />
                            </div>
                            <div className="qp">
                                <label>Prix</label>
                                <input value={this.state.produit.SellingPriceOfUnit} type="text" />
                            </div>
                            <div id="typevente" className="row">
                                <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3" >
                                    <span style={{marginRight:"1.2em"}}><input type="radio" name="ventetype" value="vd"/><label>Vente directe</label></span>
                                </div>
                                <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3" >
                                    <ModalIpm />
                                </div>
                            </div>
                            <div>
                                <button onClick={()=>this.addProd(this.state.produit)} className="btn btn-success btn-block">Ajouter</button>
                            </div>
                        </div>

                    </div>
                    <div className={this.state.chosedProducts.length>0?"tableProds":"tableProdS"} id="tableProds">
                        <table border="2" className="table table-striped table-condensed" >
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Produits</th>
                                    <th>Quantite</th>
                                    <th>P.U</th>
                                    <th>P.T</th>
                                    <th>Remise</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.chosedProducts.map((p,index)=>{
                                    return(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{p.ProductTitle}</td>
                                            <td>{p.quantite}</td>
                                            <td>{p.SellingPriceOfUnit}</td>
                                            <td>{p.quantite*p.SellingPriceOfUnit}</td>
                                            <td>0</td>
                                            <td style={{cursor:"pointer"}}><i onClick={()=>this.deleteProd(p)} title="Supprimer" className="far fa-trash-alt"></i></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id="validation" >
                        <div><span>Total : {this.totalPrice()}</span></div>
                        <div onClick={()=>this.saveBill()}><span>Valider</span></div>
                    </div>
                </div>
            
           
         );
    }
}
 
export default Vente;
class ModalIpm extends Component{
    constructor(){
        super();
        this.state={
            show:false,
            ipm:[],
            client:{
                prenom:"",
                nom:"",
                matricule:""
            },
            ipmc:{
                idIpm:0,
                ipm:""
            },
        };
    }
    modal(event){
        event.preventDefault()
        this.getIpm();
        this.setState({show:true});
    }
    handleClose(event) {
        event.preventDefault()
        this.setState({ show: false });
        document.getElementById("ipm").checked=true;
    }
    getIpm(){
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+'/ipm/getIpm',{
            method:"post",
            body:"idShop="+idShop,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(rep=>rep.json()).then(json =>{
            console.log(json);
            this.setState({ipm:json});
        })
    }
    displayIpm(){
        let ipm=this.state.ipm.map((el,i)=>{
            return <option key={i} value={JSON.stringify(el)}>{el.ipm}</option>;
        })
        return ipm;
    }
    handlePrenom(event){
        event.preventDefault();
        let c=this.state.client;
        c.prenom=event.target.value;
        this.setState({client:c});
    }
    handleNom(event){
        event.preventDefault();
        let c=this.state.client;
        c.nom=event.target.value;
        this.setState({client:c});
    }
    handleMatricule(event){
        event.preventDefault();
        let c=this.state.client;
        c.matricule=event.target.value;
        this.setState({client:c});
    }
    validerIpm(event){
        event.preventDefault();
        if(this.state.client.prenom!=="" && this.state.client!=="" && this.state.client!=="" && this.state.ipmc.idIpm!==0 && this.state.ipmc.ipm!==""){
            sessionStorage.setItem("client",JSON.stringify(this.state.client));
            sessionStorage.setItem("ipmc",this.state.ipmc);
            this.handleClose(event);
        }else{
            alert("veuillez remplire tout les champs.");
        }
    }
    choisireIpm(event){
        event.preventDefault();
        this.setState({ipmc:event.target.value});
    }
    render(){
        return(
        <div>
            <span><input onClick={(event)=>this.modal(event)} id="ipm" type="radio" name="ventetype" value="ipm" /><label>Ipm</label></span>
             <Modal show={this.state.show} >
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form >
                        <placeholder>
                            <legend>Informations IPM</legend>
                            <div className="form-group">
                                <select onChange={(event)=>this.choisireIpm(event)} value={this.state.ipmc} className="form-control">
                                    <option value="">--choisir ipm--</option>
                                    {this.displayIpm()}
                                </select>
                            </div>
                        </placeholder>
                        
                    </form>
                </div>
                <hr />
                <div>
                    <form>
                        <placeholder>
                            <legend>Informations clients</legend>
                            <div className="form-group">
                                <span>Prenom :</span>
                                <input value={this.state.client.prenom} onChange={(event)=>this.handlePrenom(event)} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <span>Nom :</span>
                                <input value={this.state.client.nom} onChange={(event)=>this.handleNom(event)} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <span>Matricule :</span>
                                <input value={this.state.client.matricule} onChange={(event)=>this.handleMatricule(event)} type="text" className="form-control" />
                            </div>
                        </placeholder>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={(event)=>this.validerIpm(event)}>
                Valider
              </Button>
              <Button variant="danger" onClick={(event)=>{this.handleClose(event);document.getElementById("ipm").checked=false}}>
                Annuler
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    
        )
    }
    
}
