import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Modalsn from './madal';

class ListProd extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };
    state = {  }
    render() { 
        let l="";
        if(this.props.data.length>0){
            let f=this.props.data.filter((el,index)=>(index>=parseInt(this.props.index) && index<parseInt(this.props.offset)+parseInt(this.props.index)));
            l=f.map((p,index)=>{
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{p.BILLNumber}</td>
                        <td>{p.BILLDate}</td>
                        <td>{p.TotalPrice}</td>
                        <td><Modalsn products={p} /><span><i className="far fa-trash-alt fa-2x"></i></span></td>
                    </tr> 
                )
            });
       }
        return ( 
            <tbody style={{backgroundColor:"#CFD4FF",color:"white"}}>
                {l}
            </tbody>
       
        );
    }
}
 
export default ListProd;