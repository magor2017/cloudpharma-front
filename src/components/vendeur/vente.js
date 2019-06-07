import React, { Component } from 'react';
import './vente.css'
import { relative } from 'path';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

class Vente extends Component {
    constructor(){
        super();
        this.state = {
            inputValue:true,
            chosedProducts:[],
            produit:{
                name:"",
                quantite:1,
                prix:0
            },
        }
    }
    
      handleSelectedItem(data){
          this.hideAutocom();
          let p={
              name:data.name,
              prix:data.prix,
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
                if(el.name===p.name){
                  return true;
                }
            });
            if(some){
                let products=this.state.chosedProducts;
                products.forEach((el,index)=>{
                    if(el.name===p.name){
                        el.quantite+=q;
                        this.setState({chosedProducts:products});
                        this.initPropsProd();
                    }
                });
  
            }else{
              if(p.name!=="" && p.name!=undefined && !isNaN(p.prix) && parseInt(p.prix)>0){
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
            name:"",
            quantite:1,
            prix:0
        }
        this.setState({produit:prod});

      }
      deleteProd(p){
        let produits=this.state.chosedProducts.filter((el,index)=>el.name!==p.name);
        this.setState({chosedProducts:produits});
      }
      totalPrice(){
          let prix=0;
          this.state.chosedProducts.forEach((p)=>{
              prix+=p.prix*p.quantite;
          });
          return prix;

      }
       getItems(item,products){
           return item?matchSorter(products,item,{keys:['name']}):[]
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
            produit:{name:qu},
        });
   }
   hideAutocom(event){
       // event.preventDefault();
        this.setState({auto:false});
   }
    render() { 
        let products=[
            {id:1,name:"product1",prix:2000},
            {id:2,name:"adama1",prix:4000},
            {id:3,name:"goudiaby2",prix:3000},
            {id:3,name:"rasta",prix:3000}
        ]
       
        return ( 
            <div onClick={(event)=>this.hideAutocom(event)}>
                <div id="enteteVente">
                    <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                    <span>Vente</span>
                </div>
                <div id="body" >
                   <div id="menu">
                        <div>
                            <span><i class="fas fa-shopping-cart fa-2x"></i>Vente</span>
                        </div>
                        <div>
                            <span><i class="fas fa-history fa-2x"></i>Historique</span>
                        </div>
                   </div>
                    <div id="ajout">
                        <p>Ajouter un Produit</p>
                        <div>
                            <div  style={{width:"40%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Produit</label>
                                <div style={{display:"inline-block"}}>  
                                    <Downshift >
                                        {({getLabelProps,getInputProps,isOpen,selectItem,highlightedIndex,inputValue,clearSelection})=>(
                                            <div>
                                                <input {...getInputProps()} onClick={this.state.produit.prix==0?clearSelection:""} />
                                                <ul id="ulauto">
                                                    {isOpen 
                                                    ? this.getItems(inputValue,products).map((p,index) => (<li className="liAutocomplete" key={p.id} onClick={()=>{selectItem(p.name);this.handleSelectedItem(p)}}>{p.name}</li>) 
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
                                <input value={this.state.produit.prix} type="text" />
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
                                            <td>{p.name}</td>
                                            <td>{p.quantite}</td>
                                            <td>{p.prix}</td>
                                            <td>{p.quantite*p.prix}</td>
                                            <td>0</td>
                                            <td style={{cursor:"pointer"}}><i onClick={()=>this.deleteProd(p)} title="Supprimer" class="far fa-trash-alt"></i></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id="validation" >
                        <div><span>Total : {this.totalPrice()}</span></div>
                        <div><span>Valider</span></div>
                    </div>
                </div>
            </div>
           
         );
    }
}
 
export default Vente;