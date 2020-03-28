import React, { Component } from 'react';
import { BrowserRouter as Router,Link,Route,Switch,Redirect } from 'react-router-dom';
import axios from 'axios';
import link from '../link';
import './accueil.css';
import logocp from '../login/images/SNETC2.png';
import  Facteur from './facture';
import Correcteur from './correcteur';
class Ipm extends Component {
    state = {  }
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
        return ( 
            <Router>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-xs-12 col-sm-12" id="men">
                    <div>
                        <img width="100%" src={logocp} alt="logo" />
                    </div>
                    <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                        <div><i style={{"display":"inline-block"}} className="fas fa-file-invoice fa-2x"></i></div>
                        <a style={{"display":"inline-block"}}><Link to="/ipm" >Factures</Link></a>
                    </div>
                    <div style={{"color":"#066A74","backgroundColor":"white","border":"1px solid #066A74","padding":"20px","textAlign":"center"}}>
                        <div><i style={{"display":"inline-block"}} className="fas fa-user-md fa-2x"></i></div>
                        <a style={{"display":"inline-block"}}><Link to="/ipm/correcteur/" >Correcteures</Link></a>
                    </div>
                    <div onClick={(event)=>this.deconnexion(event)} style={{"color":"white","backgroundColor":"red","padding":"20px","textAlign":"center","cursor":"pointer"}}>
                        <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
                        <span>Deconnexion</span>
                    </div>
                
                </div>
                <div id="content" className="col-lg-9 col-md-9 col-xs-12 col-sm-12">
                     <Switch>
                         <Route exact path="/ipm" component={Facteur} />
                        <Route exact path="/ipm/correcteur" component={Correcteur} />
                     </Switch>
                </div>
            </div>
            </Router>
         );
    }
}
 
export default Ipm;