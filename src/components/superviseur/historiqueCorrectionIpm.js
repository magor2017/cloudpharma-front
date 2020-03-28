import React, { Component } from 'react';
import link from '../link';
class HistoriqueCorrectionIpm extends Component {
    constructor(){
        super();
        this.state={
            historiqucores:[],
        }
        this.getHistorique();
    }
    getHistorique(){
        fetch(link+"/ipm/getHistorique",{
            method:"post",
            body:"idc="+sessionStorage.getItem("id"),
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        }).then(rep=>rep.json()).then(text =>{
            console.log(text);
            this.setState({historiqucores:text});
        })
    }
    render() { 
        return ( 
            <div>
                <table className="table table-striped table-condensed commentBox">
                    <thead style={{backgroundColor:"white",color:"#1F838D"}}>
                        <tr>
                            <th>#</th>
                            <th>Produit</th>
                            <th>Ipm</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                        {
                            this.state.historiqucores.map((el,i)=>{
                                return <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{el.productName}</td>
                                            <td>{JSON.parse(el.ipm).ipm}</td>
                                            <td>{el.note}</td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default HistoriqueCorrectionIpm;