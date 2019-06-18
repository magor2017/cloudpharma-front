import React, { Component } from 'react';
import './vente.css'
import { relative } from 'path';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import axios from 'axios';




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
                        el.SellingPriceOfUnit+=q;
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
        }
    handleQuantite(event){
        event.preventDefault();
        let qu=parseInt(event.target.value);
        this.setState({
            produit:{...{quantite:qu}}
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
       //console.log(init);
       //const request = new Request('http://127.0.0.1:8000/vendeur/getProducts/',{prod:prod});
       //console.log(prod);
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
       //axios.post('http://127.0.0.1:5000/element',{prod:'prod'}).then(res =>console.log(res));
       //request.method=init;
       /* fetch('http://127.0.0.1:8000/vendeur/getProducts/',{method:"POST", data:{prod:"pr"}})
        .then(res =>res.json()).then(resjson=>{
            let products=[];
            console.log(resjson);
            products=resjson.data;
            products=JSON.parse(products.replace(/'/g,'"'));
            this.setState({products:products});
            console.log(products);
        });*/
   }
   saveBill(){
       //chosedProducts
       let params={
           products:JSON.stringify(this.state.chosedProducts),
           token:"jdjdhddjnbcxrsju",
           idUser:988,
           total:this.totalPrice(),
       }
       axios.post('http://127.0.0.1:8000/vendeur/saveBill/',params)
       .then(rep =>{
           if(rep.status===200){
               this.setState({chosedProducts:[]});
               alert("vente reussi");
           }
           //console.log(rep);
        })
       .catch(err => console.log(err));

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
