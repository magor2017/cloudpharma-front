import React, { Component } from 'react';
import link from '../link';
class MesCorrecteur extends Component {
    constructor(){
        super();
        this.state={
            mesCorrecteur:[]
        }
        this.getMyCorrecteur();
    }
    getMyCorrecteur(){
        fetch(link+'/ipm/getMyCorrecteur',{
            method:"post",
            body:"idIpm="+sessionStorage.getItem("id"),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(text=>{
            this.setState({mesCorrecteur:text});
            console.log(text);
        });

    }
    render() { 
        return ( 
            <div>
                <table className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                        <tr>
                            <th>#</th>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {
                            this.state.mesCorrecteur.map((el,i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{el.prenom}</td>
                                    <td>{el.nom}</td>
                                    <td><input type="button" value="action" className="btn btn-success" /></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default MesCorrecteur;