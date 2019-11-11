import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import ListeProduit from './listeProduits';
import AddProduct from './addProduct';
import Reappro from './reappro';
import Rayon from './rayon';
import './content.css';
class ContentStock extends Component {
    constructor(){
        super();
        this.state={
            level:sessionStorage.getItem("level")==="1"?"/vendeur":"/superviseur",
        }
    }
    render() { 
        return ( 
            
                <Router>
                    <div onClick={(event)=>this.hideAutocom(event)}>
                        <div id="enteteVente">
                            <div><i className="fas fa-dolly fa-2x"></i></div>
                            <span>STOCK MANAGER</span>
                        </div>
                    </div>
                    <div id="menust">
                        <div>
                            <Link to={this.state.level+"/stock/contentstock"}><span>Products</span></Link>
                        </div>
                        <div>
                            <Link to={this.state.level+"/stock/addProduct"}><span>Ajouter</span></Link>
                        </div>
                        <div>
                            <Link to={this.state.level+"/stock/reapproProduct"}><span>Reapprovisionnement</span></Link>
                        </div>
                        <div>
                            <Link to={this.state.level+"/stock/rayon"}><span>Rayon</span></Link>
                        </div>
                    </div>
                
                    <Switch>
                        <Route exact path={this.state.level+"/stock/contentstock"} component={ListeProduit}></Route>
                        <Route exact path={this.state.level+"/stock/addProduct"} component={AddProduct}></Route>
                        <Route exact path={this.state.level+"/stock/updateProduct"} component={AddProduct}></Route>
                        <Route exact path={this.state.level+"/stock/reapproProduct"} component={Reappro}></Route>
                        <Route exact path={this.state.level+"/stock/rayon"} component={Rayon}></Route>
                    </Switch>
                </Router>
            
         );
    }
}
 
export default ContentStock;