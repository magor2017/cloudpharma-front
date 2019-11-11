import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Connexion extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="row btncnrow" >
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <button><Link to="/login">CONNEXION</Link></button>
                  </div>
                </div>
                <div className="row vrtlinerow" >
                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 colon1">
          
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 colon2">
            
                    </div>
                </div>
                <div className="row ">
                    <div className="col-lg-2 col-md-2 col-xs-2 col-sm-2 ">
                    </div>
                    <div className="col-lg-8 col-md-8 col-xs-8 col-sm-8 ">
                        <div className="row srvlinerow">
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE STOCK</b></span>
                          </div>
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE VENTE</b></span>
                          </div>
                          <div style={{border:"2px solid white",borderRadius:"40%"}} className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                              <span><b style={{color:"white"}}>GESTION DE CIENTS</b></span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
         
      </div>
         );
    }
}
 
export default Connexion;
//<Link to="/login" >login bi fiila</Link>
//<br/>
//<Link to="/vendeur" >espace vendeur</Link>
//<Link to="/login" >login bi fiila</Link>
//<Link to="/vendeur" >espace vendeur</Link>