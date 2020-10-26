import React, { Component } from 'react';
import link from '../link';
class LettreGarantie extends Component {
    constructor(){
        super();
        this.state={
            lettre:[],
        }
        this.getLettreGarantie();
    }
    getLettreGarantie(){
        fetch(link+'/ipm/getlettreGarantie',{
            method:"post",
            body:"",
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(tontou=>{
            this.setState({lettre:tontou});
            console.log(tontou);
        });
    }
    render() { 
        return ( 
            <table  className="table table-striped table-condensed">
                <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                    <tr>
                        <th>#</th>
                        <th>Matricule</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                    {
                        this.state.lettre.map((el,i)=>{
                            return(<tr>
                                <td key={i}>{i+1}</td>
                                <td>{el.matricule}</td>
                                <td>{el.date}</td>
                                <td><input type="button" className="btn btn-success" value="valider" /><input type="button" className="btn btn-danger" value="rejeter" /><input type="button" value="detail" className="btn btn-primary" /></td>766960023
                            </tr>)
                        })
                    }
                </tbody>
            </table>
         );
    }
}
 
export default LettreGarantie;