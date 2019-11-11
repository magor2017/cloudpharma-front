import React,{Component} from 'react';
import './rayon.css';
import link from '../link';

export default class Rayon extends Component{
    constructor(){
        super();
        this.state={
            switch:1,
        }
    }
    handleSwitch(event,n){
        event.preventDefault();
        this.setState({switch:n});
        console.log("the swith funtion is running")
    }
    Switch(){
        switch(this.state.switch){
            case 1:{
                return(
                    <ListeRayon />
                );
                break;
            }
            case 2:{
                return(
                    <NewRayon />
                );
                break;
            }
            default:{
                return(
                    <ListeRayon />
                );
            }
        }
    }
    render(){
        return(
            <div>
                <ul>
                    <li onClick={(event)=>this.handleSwitch(event,1)}>Rayons</li>
                    <li onClick={(event)=>this.handleSwitch(event,2)}>Nouveau Rayon</li>
                </ul>

                <div>
                    {this.Switch()}
                </div>
            </div>
        )
    }
}
class ListeRayon extends Component{
    constructor(){
        super();
        this.getRayon();
        this.state={
            liste:[],
        }
    }
    getRayon(){
        let idShop=sessionStorage.getItem("idShop");
        fetch(link+"/rayon/liste",{
            method:"POST",
            body:"idShop="+idShop,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.text()).then(text=>{
            let r=JSON.parse(text).liste;
            this.setState({liste:r});
            console.log(text);
        });
    }
    render(){
        return(
            <table style={{backgroundColor:"white",color:"#1F838D"}} className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                    {this.state.liste.map((el,i)=>{
                        return(
                            <tr>
                                <td>{i+1}</td>
                                <td>{el.nom}</td>
                                <td>{el.description}</td>
                                <td><button className="btn btn-secondary">details</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}
class NewRayon extends Component{
    constructor(){
        super()
        this.state={
            rayon:"",
            description:"",
            msg:false,
        }
    }
    handleRayon(event){
        event.preventDefault();
        this.setState({rayon:event.target.value});
    }
    handledesc(event){
        event.preventDefault();
        this.setState({description:event.target.value});
    }
    newRayon(event){
        event.preventDefault();
        if(this.state.rayon!=="" && this.state.rayon!==undefined){
            let idShop=sessionStorage.getItem("idShop");
            fetch(link+"/rayon/newRayon",{
                method:"POST",
                body:"idShop="+idShop+"&rayon="+this.state.rayon+"&description="+this.state.description,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(rep=>{
                if(rep.status===500){
                    return new Promise((resolve,reject)=>{
                        resolve(JSON.stringify({status:500}));
                    });
                }
                return rep.text();
            }).then(text=>{
                let t=JSON.parse(text);
                switch(t.status){
                    case 1:{
                        this.setState({msg:true});
                        setTimeout(()=>this.setState({msg:false}),5000);
                        break;
                    }
                    case -1:{
                        alert("rayon deja enregistre");
                    }
                    case 500:{
                        alert("erreur au niveau du serveur");
                        break;
                    }

                }
            });
        }else{
            alert("le champ nom Rayon est obligatoire");
        }
    }
    render(){
        return(
            <div>
                <form>
                    <p style={{display:this.state.msg?"block":"none"}} className="alert alert-success">rayon enregistre</p>
                    <div className="form-group">
                        <span style={{color:"white"}}>Nom Rayon :</span>
                        <input onChange={(event)=>this.handleRayon(event)} value={this.state.rayon} type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <span style={{color:"white"}}>Description :</span>
                        <input onChange={(event)=>this.handledesc(event)} value={this.state.description} type="textarea" className="form-control"/>
                    </div>
                    <button onClick={(event)=>this.newRayon(event)} className="btn btn-success">Valider</button>
                </form>
            </div>
        )
    }
}