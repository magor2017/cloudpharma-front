import React, { Component } from 'react';
import Content from './content';
import {BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import ContentStock from '../stock/content';
import Profil from './profil';
import Vente from './vente';
import './accueil.css';
import axios from 'axios';
import link from '../link';

class Accueil extends Component {
    constructor(){
        super();
        this.checkConnected();
        this.state = { 
            menu:[
                <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                    <div><i style={{"display":"inline-block"}} className="fas fa-bars fa-2x"></i></div>
                    <a style={{"display":"inline-block"}}><Link to="/vendeur/" >Menu</Link></a>
                </div>,
                <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                    <div><i style={{"display":"inline-block"}} className="fas fa-headset fa-2x"></i></div>
                    <a style={{"display":"inline-block"}}>Support</a>
                </div>,
                <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center",cursor:"pointer"}}>
                    <div><i style={{"display":"inline-block"}} className="far fa-user-circle fa-2x"></i></div>
                    <a style={{"display":"inline-block"}}><Link to="/vendeur/profil">Profil</Link></a>
                </div>,
            
            ],
            con:false,
            
        }
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
    checkConnected(){
        let id=sessionStorage.getItem("id");
        let token=sessionStorage.getItem("token");
        let level=sessionStorage.getItem("level");
        console.log("id,token,level",id,token,level);
        if(id!==null && id!=="" && id!==undefined && token!==null && token!=="" && token!==undefined && level!==null && level!=="" && level!==undefined){
            axios({
                method:'post',
                url:link+'/login/checkConnected',
                data:"id="+id+"&token="+token+"&level="+level,
                headers:{"Content-Type":"application/x-www-form-urlencoded"}
            }).then(rep =>{
                let data=rep.data;
                if(data.status===1){
                    console.log("logged");

                }else{
                    console.log("not logged");
                    window.location.href="/login";
                }
               // console.log(rep);
            }).catch(error=>{
                console.log(error);
             }
            );
            console.log("test ok");
        }else{
            console.log("else test");
            this.setState({con:true});
            window.location.href="/login";
        }
    }
    heade(){
        return(
            <div onClick={(event)=>this.deconnexion(event)} style={{"color":"white","backgroundColor":"red","padding":"20px","textAlign":"center","cursor":"pointer"}}>
                <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
                <span>Deconnexion</span>
            </div>
        );

    }
    render() { 
        if(this.state.con){
            return <Redirect to="/login" />
         }
        return ( 
            <Router>
                <div className="row">
                    <div style={{"padding":"0px"}}  className="col-lg-2 col-md-2 col-xs-2 col-sm-2">{this.entete()}<div>{this.state.menu}</div>{this.heade()}</div>
                    <div  className="col-lg-9 col-md-9 col-xs-9 col-sm-9">
                        <Switch>
                            <Route exact path="/vendeur" component={P} />
                            <Route exact path="/vendeur/login" component={Login} />
                            <Route exact path="/vendeur/ac" component={Ac} />
                            <Route exact path="/vendeur/content" component={Content} />
                            <Route exact path="/vendeur/stock/contentstock" component={ContentStock} />
                            <Route exact path="/vendeur/profil" component={Profil} />
                        </Switch>
                    </div>
                </div> 
            </Router>
        
        );
    }
}
 
export default Accueil;
function P(){
    let autvente=parseInt(sessionStorage.getItem("vente"));
    return(
        <div>
            <div style={{"backgroundColor":"white",color:"#066A74",textAlign:"center",fontSize:"1.5em",marginTop:"0.2em",marginBottom:"0.2em"}}><span>CLOUDPHARMA V2.0</span></div>
            <div style={{border:"2px solid white"}}>
                <p style={{color:"#FFFF00",textAlign:"center",marginBottom:"0.2em",marginTop:"0.2em"}}>welcom to our awsome platform</p>
                
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-shopping-cart fa-2x"></i></div>
                        <Link to={autvente===1?"/vendeur/content":"#"}>Vente</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-dolly fa-2x"></i></div>
                        <Link to="/vendeur/stock/contentstock">Stock</Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-chart-line fa-2x"></i></div>
                        <Link><span>Performance</span></Link>
                    </div>
                </div>
                <div style={{margin:"1.5em",width:"20%",display:"inline-block"}}>
                    <div style={{color:"#066A74",backgroundColor:"white",padding:"0.5em",textAlign:"center",borderRadius:"0.5em"}}>
                        <div><i class="fas fa-chart-line fa-2x"></i></div>
                        <Link style={{width:"100%"}}><span>Performance</span></Link>
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
