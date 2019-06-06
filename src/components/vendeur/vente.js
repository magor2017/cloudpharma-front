import React, { Component } from 'react';
import './vente.css'
import { relative } from 'path';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

class Vente extends Component {
    constructor(){
        super();
        this.state = {
            chosedProducts:[],
            produit:null,
        }
    }
    
      handleSelectedItem(data){
          let p={
              name:data.name,
              prix:data.prix,
          }
          this.setState({produit:p});
          document.getElementById('q').value=data.prix;
      }
      addProd(p){
          let prods=this.state.chosedProducts;
          let q=parseInt(document.getElementById('quantite').value);
          let some=this.state.chosedProducts.some((el)=>{
              if(el.name==p.name){
                return true;
              }
          });
          if(some){
              let products=this.state.chosedProducts;
              products.forEach((el,index)=>{
                  if(el.name==p.name){
                      el.quantite+=q;
                      this.setState({chosedProducts:products});
                      
                  }
              })

          }else{
            let produit=p;
            produit.quantite=q
            prods.push(produit);
            this.setState({chosedProducts: prods})
          }
         
         // this.state.chosedProducts.push(p);
      }
      deleteProd(p){
        let produits=this.state.chosedProducts.filter((el,index)=>el.name!=p.name);
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
   
    render() { 
        let products=[
            {id:1,name:"product1",prix:2000},
            {id:2,name:"adama1",prix:4000},
            {id:3,name:"goudiaby2",prix:3000},
            {id:3,name:"rasta",prix:3000}
        ]
       
        return ( 
            <div>
                <div style={{backgroundColor:"white",color:"#1F838D",textAlign:"center",marginTop:"0.5em",marginBottom:"0.5em"}}>
                    <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                    <span>Vente</span>
                </div>
                <div style={{border:"2px solid white",textAlign:"center"}}>
                    <div style={{backgroundColor:"white",color:"#1F838D",padding:"10px",width:"15%",marginLeft:"10%",display:"inline-block"}}>
                        <span><i class="fas fa-shopping-cart fa-2x"></i>Vente</span>
                    </div>
                    <div style={{backgroundColor:"#1F838D",color:"white",padding:"10px",width:"15%",marginLeft:"1%",display:"inline-block"}}>
                        <span><i class="fas fa-history fa-2x"></i>Historique</span>
                    </div>
                    <div style={{border:"2px solid white",marginTop:"10px",width:"90%",marginLeft:"auto",marginRight:"auto"}}>
                        <p style={{backgroundColor:"white",color:"#1F838D"}}>Ajouter un Produit</p>
                        <div>
                            <div  style={{width:"40%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Produit</label>
                                <div style={{display:"inline-block"}}>
                                   <Downshift>
                                        {({getLabelProps,getInputProps,isOpen,selectItem,highlightedIndex,inputValue})=>(
                                            <div>
                                                <input {...getInputProps()} />
                                                <ul style={{position:"absolute",backgroundColor:"white",listStyleType:"none",paddingLeft:"0px",width:"20%"}}>
                                                    {isOpen 
                                                    ? this.getItems(inputValue,products).map((p,index) => (<li className="liAutocomplete" style={{cursor:"pointer",textAlign:"left"}} key={p.id} onClick={()=>{selectItem(p.name);this.handleSelectedItem(p)}}>{p.name}</li>) 
                                                    ):null}
                                                </ul>
                                            </div>
                                        )}
                                   </Downshift>
                                </div>
                            </div>
                            <div style={{width:"25%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Quantite</label>
                                <input id="quantite"  type="text" style={{borderRadius:"5px",width:"50%",marginLeft:"15px"}} />
                            </div>
                            <div style={{width:"25%",display:"inline-block",}}>
                                <label style={{color:"white"}}>Prix</label>
                                <input id="q" type="text" style={{borderRadius:"5px",width:"50%",marginLeft:"15px"}} />
                            </div>
                            <div>
                                <button onClick={()=>this.addProd(this.state.produit)} className="btn btn-success btn-block">Ajouter</button>
                            </div>
                        </div>

                    </div>
                    <div style={{width:"90%",marginLeft:"auto",marginRight:"auto",marginTop:"10px"}}>
                        <table border="2" className="table table-striped table-condensed" style={{border:"1px solid #1F838D"}}>
                            <thead style={{backgroundColor:"white",color:"#1F838D"}}>
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
                            <tbody style={{backgroundColor:"#CFD4FF"}}>
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
                    <div style={{width:"90%",marginLeft:"auto",marginRight:"auto",marginBottom:"10px",backgroundColor:"white"}}>
                        <div style={{backgroundColor:"#F7DF09",boxShadow:"2px 2px 2px 2px #474747",color:"white",width:"30%",display:"inline-block",marginTop:"10px",marginRight:"10px",marginBottom:"10px"}}><span>Total : {this.totalPrice()}</span></div>
                        <div style={{width:"20%",display:"inline-block",marginTop:"10px",backgroundColor:"green",color:"white",marginBottom:"10px",boxShadow:"2px 2px 2px 2px #474747"}}><span>Valider</span></div>
                    </div>
                </div>
            </div>
           
         );
    }
}
 
export default Vente;