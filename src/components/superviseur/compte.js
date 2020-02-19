import React,{Component} from 'react';
import link from '../link';
import ModalNouveauCompte from './modalNouveauCompte';
import ModalModificationCompte from './modalModificationCompte';
import Chart from 'chart.js';


class Compte extends Component {
    constructor(){
        super()
        this.getCompte();
        this.state={
            comptes:[],
        }
       // this.chart();
    }
    getCompte(){
        let id=sessionStorage.getItem("idShop");
        let rep1=fetch(link+'/compte/getCompte',{
            method:'post',
            body:"idShop="+id,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            
        });
        let rep2=rep1.then(rep =>{
            return rep.json();
        });
      rep2.then((r)=>{
          this.setState({comptes:r});
        });
    }
    bloquerUser(id,event){
        event.preventDefault();
        if(window.confirm("Etes-vous sure de vouloire bloquer ce compte?")){
            console.log("compte bolque");
        }else{
            console.log("echec blocage compte");
        }

    }
    handleCompte(comptes){
        console.log(comptes);
        comptes.map((el,i)=>{
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{el.prenom}</td>
                    <td>{el.nom}</td>
                    <td>{el.username}</td>
                </tr>
            )
        });
    }
    chart(){
       let b=` <button onClick={()=>this.chart()}>afficher</button>
        <canvas style={{backgroundColor:"white"}} id="myChart" width="200" height="100"></canvas>`
        var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    }
    blockage(etat,id){
        switch(parseInt(etat)){
            case 1:{

                return <button onClick={(event)=>this.activerOrDesactiver(id,event,0)} className="btn btn-danger">Bloquer</button>
            }
            case 0:{
                return <button onClick={(event)=>this.activerOrDesactiver(id,event,1)} className="btn btn-success">Activer</button>
            }

        }
    }
    activerOrDesactiver(id,event,action){
        event.preventDefault();
        let msg='';
        let active="";
        //let active2="";
        if(action===1){
            msg="Etes-vous sure de vouloir activer ce compte?";
            active="activation reussie";
        }
        if(action===0){
            msg="Etes-vous sure de vouloir desactiver ce compte?";
            active="desactivation reussie";
        }
        if(window.confirm(msg)){
            console.log("compte active");
            let token=sessionStorage.getItem("token");
            let iduser=sessionStorage.getItem("id");
            let idShop=sessionStorage.getItem("idShop");
            let level=sessionStorage.getItem("level");
            fetch(link+'/compte/activerCompte',{
                body:"idCompte="+id+"&token="+token+"&iduser="+iduser+"&idShop="+idShop+"&level="+level+"&action="+action,
                method:"post",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
                
            }).then(rep=>{
                console.log(rep);
                if(rep.status===500){
                    return new Promise((resolve,reject)=>{
                        resolve(JSON.stringify({status:500}));
                    });
                }else{
                    return rep.text();
                }
            }).then(text=>{
                let tontou=JSON.parse(text);
                console.log(tontou);
                switch(tontou.status){
                    case 1:{
                        this.getCompte();
                        let m='';
                        
                        alert(active)
                        break;
                    }
                    case -1:{
                        alert("utilisateur non connecte veuillez vous reconnectez svp.")
                        break;
                    }
                    case 0:{
                        alert("echec de l'activation du compte")
                        break;
                    }
                    case 500:{
                        alert("erreur au niveau du serveur");
                        break;
                    }
                    default:{

                    }
                }
            });

        }else{
            console.log("compte tjrs inactif");
        }

    }
    desactiver(){

    }
    render() { 
        return (
            <div>
                <div>
                    users account manager
                </div>
                <div>
                    <table className="table table-striped table-condensed">
                        <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                            <tr>
                                <th>#</th>
                                <th>Prenom</th>
                                <th>Nom</th>
                                <th>Username</th>
                                <th>Etat</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                            {this.state.comptes.map((el,i)=>{
                                return(
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{el.prenom}</td>
                                        <td>{el.nom}</td>
                                        <td>{el.username}</td>
                                        <td>{parseInt(el.etat)===1?"actif":"bloquer"}</td>
                                        <td><ModalModificationCompte id={el} />{this.blockage(el.etat,el.idCompte)}</td>
                                    </tr>
                                    )
                            })}
                        </tbody>
                    </table>
                    <ModalNouveauCompte onCompteChange={()=>this.getCompte()} />
                </div>
               
            </div>
        );
    }
}
 
export default Compte;