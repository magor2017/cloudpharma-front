import React, { Component } from 'react';
import './client.css';
class Client extends Component {
    state = {  }
    render() { 
        return ( 
        <div>
            <p style={{backgroundColor:"white",color:"black",textAlign:"center"}}>Gestion des clients</p>
            <ul>
                <li>Particulier</li>
                <li>Ipm</li>

            </ul>
        </div> 
        );
    }
}
 
export default Client;