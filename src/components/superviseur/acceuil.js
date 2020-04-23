import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import ContentStock from '../stock/content';
import Content from '../vendeur/content';
import Profil from '../vendeur/profil';
import Compte from '../superviseur/compte';
import Fournisseur from './fournisseur'
import axios from 'axios';
import link from '../link';
import Client from '../client/client';
import IpmSup from './ipm';
import Accueilstore from '../store/accueil';
class AcceuilSup extends Component {
    constructor(){
        super();
        this.state={
            con:false,
        }
    }
    menu(){
        let m=[
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-bars fa-2x"></i></div>
                <a style={{"display":"inline-block"}}><Link to="/superviseur/" >Menu</Link></a>
            </div>,
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                <div><i style={{"display":"inline-block"}} className="fas fa-headset fa-2x"></i></div>
                <a style={{"display":"inline-block"}}>Support</a>
            </div>,
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center",cursor:"pointer"}}>
                <div><i style={{"display":"inline-block"}} className="far fa-user-circle fa-2x"></i></div>
                <a style={{"display":"inline-block"}}><Link to="/superviseur/profil">Profil</Link></a>
            </div>,
            <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center",cursor:"pointer"}}>
            <div><i style={{"display":"inline-block"}} className="fas fa-store fa-2x"></i></div>
            <a style={{"display":"inline-block"}}><Link to="/superviseur/store">E-commerce</Link></a>
        </div>,
        
        ];
        return m;
    }
    heade(){
        return(
            <div onClick={(event)=>this.deconnexion(event)} style={{"color":"white","backgroundColor":"red","padding":"20px","textAlign":"center","cursor":"pointer"}}>
                <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
                <span>Deconnexion</span>
            </div>
        );

    }
    deconnexion(event){
        event.preventDefault();
        let id=sessionStorage.getItem("id");
        let token=sessionStorage.getItem("token");
        let body={"id":id,"token":token};
        console.log(body);
       // axios.post(link+'/backendpharma/public/index.php/login/deconnexion',body).then(rep =>{
         //   console.log(rep);
        //});
        axios({
            method:'post',
            url:link+'/login/deconnexion',
            data:{id:id,token:token}
        }).then(rep =>{
            let data=rep.data;
            if(data.status===1){
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("level");
                sessionStorage.removeItem("idShop");
                //let con=false;
                this.setState({con:true});
                console.log(data);
            }
            
        });
        console.log(token);
    }
    render() { 
        if(this.state.con){
            return <Redirect to="/" />
         }
        return ( 
            <Router>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-2 col-sm-2"><div>{this.menu()}</div>{this.heade()}</div>
                    <div className="col-lg-9 col-md-9 col-xs-9 col-sm-9">
                        <Switch>
                            <Route exact path="/superviseur" component={P} />
                            <Route exact path="/superviseur/vente/content" component={Content} />
                            <Route exact path="/superviseur/profil" component={Profil} />
                            <Route exact path="/superviseur/compte" component={Compte} />
                            <Route exact path="/superviseur/fournisseur" component={Fournisseur} />
                            <Route exact path="/superviseur/stock/contentstock" component={ContentStock} />
                            <Route exact path="/superviseur/client" component={Client} />
                            <Route exact path="/superviseur/ipm" component={IpmSup} />
                            <Route exact path="/superviseur/store" component={Accueilstore} />
                        </Switch>
                    </div>
                </div>
            </Router>
         );
    }
}
 
export default AcceuilSup;
function P(){
    return(
        <div>
            <div style={{"backgroundColor":"white",color:"#066A74",textAlign:"center",fontSize:"1.5em",marginTop:"0.2em",marginBottom:"0.2em"}}><span>CLOUDPHARMA V2.0</span></div>
            <div style={{border:"2px solid white"}}>
                <p style={{color:"#FFFF00",textAlign:"center",marginBottom:"0.2em",marginTop:"0.2em"}}>welcom to our awsome platform</p>
                
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/vente/content">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                            <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                            <span>Vente</span>
                        </div>
                    </Link>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/stock/contentstock">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                            <div><i class="fas fa-dolly fa-2x"></i></div>
                            <div>Stock</div>
                        </div>
                    </Link>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-chart-line fa-2x"></i></div>
                        <Link><span>Performance</span></Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/fournisseur">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-dolly-flatbed fa-2x"></i></div>
                            <span>Fournisseurs</span>
                        </div>
                    </Link>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/compte">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                            <div><i class="fas fa-users fa-2x"></i></div>
                            <span>Comptes</span>
                        </div>
                    </Link>
                    
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/client">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                            <div><i class="far fa-user fa-2x"></i></div>
                            <span>Clients</span>
                        </div>
                    </Link>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <Link to="/superviseur/ipm">
                        <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                            <div><i class="far fa-user fa-2x"></i></div>
                            <span>Ipm</span>
                        </div>
                    </Link>
                </div>
            </div>
             
        </div>
    );
}