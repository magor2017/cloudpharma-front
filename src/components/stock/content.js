import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import ListeProduit from './listeProduits';
import AddProduct from './addProduct';
import Reappro from './reappro';
import './content.css';
class ContentStock extends Component {
    state = {  }
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
                            <Link to="/vendeur/stock/contentstock"><span>Products</span></Link>
                        </div>
                        <div>
                            <Link to="/vendeur/stock/addProduct"><span>Ajouter</span></Link>
                        </div>
                        <div>
                            <Link to="/vendeur/stock/reapproProduct"><span>Reapprovisionnement</span></Link>
                        </div>
                    </div>
                
                    <Switch>
                        <Route exact path="/vendeur/stock/contentstock" component={ListeProduit}></Route>
                        <Route exact path="/vendeur/stock/addProduct" component={AddProduct}></Route>
                        <Route exact path="/vendeur/stock/updateProduct" component={AddProduct}></Route>
                        <Route exact path="/vendeur/stock/reapproProduct" component={Reappro}></Route>
                    </Switch>
                </Router>
            
         );
    }
}
 
export default ContentStock;