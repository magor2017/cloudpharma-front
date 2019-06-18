import React,{Component} from 'react';
import './login.css';
import AsyncService from './services';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
  	}


    auth = ()=> {
    	let log = document.querySelector("#username").value;
    	let pass= document.querySelector("#password").value;
    	console.log();

    	let body = {"login":log, "password": pass};

		let defaultOptions = {
			url:'http://localhost/bacamacBackend/index.php/reactjs',
			method:'POST',
			mode: 'cors',
			headers:{
				'Access-Control-Allow-Origin':'*'
			},
			body:body,
		};

		AsyncService(defaultOptions).then((value) => {
			console.log(value)
		})
    }


    render() { 
        return (  
			<div className="container">
				<div className="row firstrow" >
					<div className="col-3">

					</div>
					<div className="col-6 loginblock">
						<div className="row">
							<div className="col-5" >
						
							</div>
							<div className="col-1" >
								<div className="logLogin">
								</div>
							</div>
						</div>
						<div className="row formcontainer">
							<div class="form-group col-12">
								<div className="col-auto">
							      <label className="sr-only" for="inlineFormInputGroup">Username</label>
							      <div className="input-group mb-2">
							        <div className="input-group-prepend">
							          <div className="input-group-text ">
							       			<img src="imges/password.svg" />
							          </div>
							        </div>
							        <input type="text" className="form-control transparent-input" id="username" placeholder="identifiant" />
							      </div>
							    </div>
							</div>
							<div class="form-group col-12">
								<div className="col-auto">
							      <label className="sr-only" for="inlineFormInputGroup">Username</label>
							      <div className="input-group mb-2">
							        <div className="input-group-prepend">
							          <div className="input-group-text">
							          	<img src="imges/password.svg" />
							          </div>
							        </div>
							        <input type="password" className="form-control transparent-input" id="password" placeholder="mot de passe" />
							      </div>
							    </div>
							</div>
					    </div>
					    <div className="row btnvalidblock">
							<div className="col-4" >
						
							</div>
							<div className="col-3" >
								<button className="btn" onClick={this.auth}><b>Go</b></button>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}	
 
export default Login;