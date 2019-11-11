import React,{Component} from 'react';
import './login.css';
import AsyncService from './services';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Link,Route,Switch,Redirect} from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import link from '../link';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
				redirect:false,
				id:"",
				password:"",
	      error: null,
	      isLoaded: false,
				items: [],
				errorc:false,
				compte:"",
			};
		//	this.changeBackground();
  	}
changeBackground(){
	//document.body.style.backgroundImage="url('../../../public/second.jpg')";
}
    auth = ()=> {
    	
			let id=this.state.id;
			let password=this.state.password;

			let body = {"id":id, "password": password};
			if(id!==undefined && id!=="" && password!=undefined && password!==""){
				axios({
					url:link+'/login/connexion',
					method:'post',
					data:'id='+id+'&password='+password
				}).then(rep=>{
					if(rep.status===200){
						let data=rep.data;
						
						if(data.status===1){
							sessionStorage.setItem("id",rep.data.id);
							sessionStorage.setItem("token",rep.data.token)
							sessionStorage.setItem("level",rep.data.level);
							sessionStorage.setItem("idShop",rep.data.idShop);
							sessionStorage.setItem("vente",1);
							switch(parseInt(rep.data.level)){
								case 1:{
									this.setState({compte:"/vendeur"})
									this.setState({redirect:true});
									break;
								}
								case 2:{
									this.setState({compte:"/superviseur"})
									this.setState({redirect:true});
									break;	
								}
								default:{
									this.setState({redirect:false});
								}

							}
						
						}else{
							if(data.status===0){
								this.setState({errorc:true});
								setInterval(()=>{
									this.setState({errorc:false});
								},5000);
							}
						}
					}
					console.log(rep);
				});

			}else{
				if(id===undefined || id===""){

				}else{

				}
			}
			
    }

	HeaderPostAction = ()=>{
	  	fetch('http://127.0.0.1:8000/login/auth', {
		  method: 'POST',
		  body: {"datas": "datas"},
		  headers : {
				'Access-Control-Allow-Origin':'*'
			},
		}).then(res => res.text()).then(console.log).catch(console.log)
	}

    auth2 = () => {

    	let config = {
		  headers: {
		    'Access-Control-Allow-Origin': '*'
		  }
		}
		
    	axios.post('http://127.0.0.1:8000/login/auth',{"prod":"prod"}, config).then(res =>{
          if(res.status===200){
              console.log(res.data.data);
              //let data=JSON.parse(res.data.data.replace(/\'/g,'"'));
              // let data=res.data.data;
              // // console.log(data);
              // this.setState({products:data});  
          }else{
              if(res.status===500){
                  alert('erreur au niveau serveur');
              }
          }
        }).catch(err=>{
            console.log(err);
            console.log('som thing was wrong');
        });
		}
		handleId(event){
			event.preventDefault();
			let val=event.target.value;
			this.setState({id:val});
		}
		handlePassword(event){
			event.preventDefault();
			let val=event.target.value;
			this.setState({password:val});
		}

    render() { 
			 if(this.state.redirect){
				return <Redirect to={this.state.compte} />
			 }
        return (  
			<div className="container">
				<div className="row firstrow" >
					<div className="collg-3 col-md-3 col-xs-3 col-sm-3">

					</div>
					<div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 loginblock">
						<div className="row">
							<div className="col-lg-5 col-md-5 col-xs-5 col-sm-5" >
						
							</div>
							<div className="col-lg-1 col-md-1 col-xs-1 col-sm-1" >
								<div  className="logLogin">
								</div>
							</div>
						</div>
						<div className="row formcontainer">
							<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
								<div className="col-auto">
							      <label className="sr-only" for="inlineFormInputGroup">Username</label>
							      <div className="input-group mb-2">
							        <div className="input-group-prepend">
							          <div id="id" className="input-group-text ">
							       			
							          </div>
							        </div>
							        <input onChange={(event)=>this.handleId(event)} value={this.state.id} type="text" className="form-control transparent-input" id="username" placeholder="identifiant" />
							      </div>
							    </div>
							</div>
							<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
								<div className="col-auto">
							      <label className="sr-only" for="inlineFormInputGroup">Username</label>
							      <div className="input-group mb-2">
							        <div className="input-group-prepend">
							          <div id="pass" className="input-group-text">
							          	
							          </div>
							        </div>
							        <input onChange={(event)=>{this.handlePassword(event)}}  value={this.state.password} type="password" className="form-control transparent-input" id="password" placeholder="mot de passe" />
							      </div>
							    </div>
							</div>
					    </div>
					    <div className="row btnvalidblock">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12" >
								<p className={this.state.errorc===false?"hide":"alert alert-danger show"}><b>Identifiant ou Mot de Passe Incorrect</b></p>
							</div>
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12" >
								<button className="btn" onClick={()=>this.auth()}><b>Go</b></button>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}	
 
export default Login;