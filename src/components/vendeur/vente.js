import React, { Component } from 'react';
class Vente extends Component {
    state = {  }
    render() { 
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
                            <div style={{width:"25%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Produit</label>
                                <input type="text" style={{borderRadius:"5px",width:"50%",marginLeft:"15px"}} />
                            </div>
                            <div style={{width:"25%",display:"inline-block"}}>
                                <label style={{color:"white"}}>Quantite</label>
                                <input type="text" style={{borderRadius:"5px",width:"50%",marginLeft:"15px"}} />
                            </div>
                            <div style={{width:"25%",display:"inline-block",}}>
                                <label style={{color:"white"}}>Prix</label>
                                <input type="text" style={{borderRadius:"5px",width:"50%",marginLeft:"15px"}} />
                            </div>
                            <div>
                                <button className="btn btn-success btn-block">Ajouter</button>
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
                                <tr>
                                    <td>1</td>
                                    <td>sntech</td>
                                    <td>1</td>
                                    <td>1000000</td>
                                    <td>1000000</td>
                                    <td>0</td>
                                    <td><i title="Supprimer" class="far fa-trash-alt"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width:"90%",marginLeft:"auto",marginRight:"auto",marginBottom:"10px",backgroundColor:"white"}}>
                        <div style={{backgroundColor:"#F7DF09",boxShadow:"2px 2px 2px 2px #474747",color:"white",width:"20%",display:"inline-block",marginLeft:"0px"}}><span>Total : 1000000</span></div>
                        <div style={{width:"20%",display:"inline-block"}}><button className="btn btn-success">Valider</button></div>
                    </div>
                </div>
            </div>
           
         );
    }
}
 
export default Vente;