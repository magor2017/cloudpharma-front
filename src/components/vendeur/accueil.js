import React, { Component } from 'react';
import Content from './content';
import {BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import Vente from './vente';

class Accueil extends Component {
    constructor(){
        super();
        
    }
    state = { 
        menu:[
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-bars fa-2x"></i></div>
                <a style={{"display":"inline-block"}}><Link to="/vendeur/" >Menu</Link></a>
            </div>,
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-headset fa-2x"></i></div>
                <a style={{"display":"inline-block"}}>Support</a>
           </div>,
           
        ]
     }
     
     Menu(){

    }
    entete(){
        return(
            <div style={{"backgroundColor":"white","color":"#066A74","padding":"20px"}}>
                <span>CLOUDPHARMA</span>
            </div>
        );
    }
    heade(){
        return(
            <div style={{"color":"white","backgroundColor":"red","padding":"20px","textAlign":"center"}}>
                <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
                <span>Deconnexion</span>
            </div>
        );

    }
    render() { 
        return ( 
            <Router>
                <div className="row">
                    <div style={{"padding":"0px"}}  className="col-lg-2 col-md-2 col-xs-2 col-sm-2">{this.entete()}<div>{this.state.menu}</div>{this.heade()}</div>
                    <div  className="col-lg-9 col-md-9 col-xs-9 col-sm-9">
                        <Switch>
                            <Route exact path="/vendeur" component={P} />
                            <Route exact path="/vendeur/login" component={Login} />
                            <Route exact path="/vendeur/ac" component={Ac} />
                            <Route exact path="/vendeur/vente" component={Vente} />
                        </Switch>
                    </div>
                </div> 
            </Router>
        
        );
    }
}
 
export default Accueil;
function P(){
    return(
        <div>
            <div style={{"backgroundColor":"white",color:"#066A74",textAlign:"center",fontSize:"1.5em",marginTop:"0.2em",marginBottom:"0.2em"}}><span>CLOUDPHARMA V2.0</span></div>
            <div style={{border:"2px solid white"}}>
                <p style={{color:"#FFFF00",textAlign:"center",marginBottom:"0.2em",marginTop:"0.2em"}}>welcom to our awsome platform</p>
                
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                        <Link to="/vendeur/vente">Vente</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-dolly fa-2x"></i></div>
                        <Link>Stock</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-chart-line fa-2x"></i></div>
                        <Link>Performance</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-chart-line fa-2x"></i></div>
                        <Link>Performance</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        
                        <span>COMING SOON</span>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        
                        <span>COMING SOON</span>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        
                        <span>COMING SOON</span>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        
                        <span>COMING SOON</span>
                    </div>
                </div>
                
            </div>
             
        </div>
    );
}
function Login(){
    return(
        <div>this is login</div>
    );
}
function Ac(){
    return(
        <div>this is acc</div>
    );
}
