import React, { Component } from 'react';
import Produit from './produit';
import link from '../link';
import {total,commissionbuyer,ourcommission} from '../pourcentage';
import { post } from '../service';
import { Table,Button,Modal,AutoComplete,message,Popconfirm,InputNumber,DatePicker  } from 'antd';
class Ecom extends Component {
    constructor(props){
        super(props);
        console.log(this.props.data);
        this.state={
            modalVendre:false,
            modalAchat:false,
            options:[],
            produit:{prod:"",prix:0},
            pav:{},//produit mis en vente
            tempProd:{},//produit selectionner par l'acheteur
            qtpav:1,
            qtpaA:1,
            stateConfrimVenteButton:false,
            diplayproductdetail:"none",
            prod:[
                {
                prod:'prod1',
                qt:4,
                prix:4000,
                key:1},
                {
                    prod:'prod2',
                    qt:4,
                    prix:4000,
                    key:2},
                    {
                        prod:'prod3',
                        qt:4,
                        prix:4000,
                        key:3}
            ],

        }
        this.getPav();
       // this.getProductEcom();
    }
    state = {  }
    displayProduct(){
        let p=this.state.prod;
        return p.map((el,index)=>{
            return(
                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                    <Produit p={el} src="http://www.cloudpharma.org/images/laboratory-313864_640.jpg" />
                </div>
            )
        });
    }
    getProductEcom(){
        fetch(link+"/ecom/getproduct").then(rep =>rep.json()).then(t =>{
           console.log(t);
           this.setState({prod:t.prod});
           console.log(this.state.prod);
       })
   }
   cancelModal(){
       this.setState({modalVendre:false,diplayproductdetail:"none",pav:{}});
   }
   showModalVendre(){
       this.props.getSolde();
      console.log(this.props.data);
       this.setState({modalVendre:true});
   }
   showModalAchat(){
       this.setState({modalAchat:true,stateConfrimVenteButton:false});
   }
   hideModalAchat(){
       this.setState({modalAchat:false});
   }
   onSelect(value,option){
       this.setState({produit:{prod:option.value,prix:option.prixpharm},diplayproductdetail:"block"});
       this.setState({pav:{cip:option.cip,nom:option.value,qt:this.state.qtpav,oldPrice:option.prixpharm,idSeller:sessionStorage.getItem('id'),idPharm:sessionStorage.getItem('idShop'),idZone:sessionStorage.getItem('idZone')}});
      
   }
   getPav(){
       let body="idZone="+sessionStorage.getItem('idZone');
       post('/produit/getPave',body).then(tontou=>{
           console.log(tontou);
           if(tontou.status===1){
               let pav=tontou.data.pav;
              // console.log(pav);
               let p=pav.map((el,i)=>{
                   return {cip:el.cip,prod:el.nom,qt:el.qtr,prix:el.newPrice,key:el.id,idPharmSeller:el.idPharm,idSeller:el.idSeller,peremption:el.peremption};
               });
               this.setState({prod:p});
           }
       })
   }
   /*cette fonction permet la mettre en vente un produit
   */
   validerVente(){
    console.log(this.state.pav);
    if(this.state.pav.qt>0 && this.state.pav.nom!=="" && this.state.pav.nom!==undefined && this.state.pav.peremption!==undefined && this.state.pav.peremption!==""){
        message.loading('Traitement en cour ...');
        let body="pav="+JSON.stringify(this.state.pav);//+"&id="+sessionStorage.getItem('id')+"&idPharm="+sessionStorage.getItem('idShop')+"&idZone="+sessionStorage.getItem('idZone');
        post('/produit/savePave',body).then(tontou=>{
            if(tontou.status===1){
                if(parseInt(tontou.data)===1){
                    message.destroy();
                    message.success('Produit mis en vente');
                    this.setState({pav:{}});
                    this.cancelModal();
                }else{
                    message.destroy();
                    message.error('Erreur au niveau du serveur veuillez reessayer plutard.');
                }

            }else{
                message.destroy();
                message.error('Erreur au niveau du serveur veuillez reessayer plutard.');
            }
            
        })
    }else{
        message.error('veuillez choisir un produit.');
    }
   }
   validerAchat(text,record){
       console.log(text);
       console.log(record);
       let p=record;
       p.idBuyer=sessionStorage.getItem('id');
       p.idPharmBuyer=sessionStorage.getItem('idShop');
       p.qtAcheter=this.state.qtpaA;
       this.setState({tempProd:p});
       this.showModalAchat();
      // setTimeout(()=>console.log(this.state.tempProd),5000);
   }
   /*cette methode se charge des requettes http
   elle prend le path et le body(donnees a envoye sous la form "cle="+val+"&cle="+val)
   et retourn un promise
   */
  
    onSearch=(text)=>{        
        if(text!=="" && text!==undefined){
            let data='prod='+text;
            let rep=post('/produit/getProductByName',data);
            rep.then(t=>{
                console.log(t);
                if(t.status===1){
                    let prod=t.data.prod.map((el,i)=>{
                        return {value:el.nom,id:el.id,cip:el.cip,prixpub:el.prixpub,prixpharm:el.prixpharm};
                    });
                    this.setState({options:prod})
                }
            })
            /*fetch(link+'/produit/getProductByName',{
                method:'post',
                body:'prod='+text,
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                }
            }).then(rep=>rep.json()).then(t=>{
                let prod=t.prod.map((el,i)=>{
                    return {value:el.nom,id:el.id,cip:el.cip,prixpub:el.prixpub,prixpharm:el.prixpharm};
                });
                this.setState({options:prod})
               // console.log(t);
            })*/
        }
   }
   handleQtpav(event){
       console.log(event.target.value);
       let pav=this.state.pav;
       pav.qt=event.target.value;
       this.setState({qtpav:event.target.value,pav:pav});
   }
   cancelVente(){

   }
   confirmVente(){
    this.validerVente();
   }
   confirmerAchat(){
       console.log(this.state.tempProd);
       if(parseInt(this.state.tempProd.idPharmBuyer)===parseInt(this.state.tempProd.idPharmSeller)){
           message.error("Impossible d'acheter votre propre produit.");
       }else{
            this.setState({stateConfrimVenteButton:true});
            message.loading('Traitement en cour ...',0);
            let path='/produit/validerAchat';
            let body='paA='+JSON.stringify(this.state.tempProd);
            post(path,body).then(rep=>{
                console.log(rep.data);
                message.destroy();
                if(rep.data.statut===0){
                    message.error(rep.data.message);
                }
                if(rep.data.statut===1){
                    this.props.getSolde();
                    this.setState({tempProd:{}});
                    this.getPav();
                        message.success(rep.data.message);
                        this.hideModalAchat();
                }
            });
    }
   }
   handleQtpaA(value){
       console.log(value);
       this.setState({qtpaA:value});
       let p=this.state.tempProd;
       p.qtAcheter=value;
       this.setState({tempProd:p});
   }
   handleDatePeremp(d,sd){
    console.log(d);
    console.log(sd);
    let p=this.state.pav;
    p.peremption=sd;
    this.setState({pav:p});
   }
    render() { 
        const columnprod=[
            {
                title:'produit',
                
                dataIndex:'prod',
                key:'prod'
            },
            {
                title:'quantite disponible',
                
                dataIndex:'qt',
                key:'qt'
            },
            {
                title:'prix',
                
                dataIndex:'prix',
                key:'prix'
            },
            {
                title:'Peremption',
                dataIndex:'peremption',
                key:'peremption'
            },
            {
                title:'action',
                key:'action',
                dataIndex:'action',
                
                render:(text,record)=>{
                    return(
                        <Button onClick={()=>this.validerAchat(text,record)} type="primary" >Acheter</Button>
                    )
                }
                
            }
        ]
        
        
        return ( 
            
            <div>
                <div style={{marginLeft:"2em",textAlign:"center",marginBottom:"0.3em"}}>
                        <input style={{width:"80%",borderRadius:"2em"}} type="search" placeholder=" Taper le nom d'un produit" />
                </div>
                <div><Button onClick={()=>this.showModalVendre()} type="primary">Vendre un medicament</Button></div><br/>
                <div>
                    <Table pagination={{ pageSize:10}} columns={columnprod} dataSource={this.state.prod} />
                </div>
                <Modal onCancel={()=>this.cancelModal()} visible={this.state.modalVendre}
                    footer={[
                            <Button key="key" onClick={()=>this.cancelModal()} type="danger">Annuler</Button>,
                            <Button  key="submit" type="primary">
                            <Popconfirm
                                title="Etes-vous sure de vouloir vendre ce produit?"
                                onCancel={()=>this.cancelVente()}
                                onConfirm={()=>this.confirmVente()}
                                okText="Oui"
                                cancelText="Non"
                            >Valider</Popconfirm></Button>
                        ]}>
                    <div>
                    <AutoComplete
                        style={{width:200}}
                        options={this.state.options}
                        onSearch={(value)=>this.onSearch(value)}
                        onSelect={(value,option)=>this.onSelect(value,option)}
                        placeholder="Taper le nom du produit a vendre"
                        
                        
                    />
                    </div>
                    <div style={{display:this.state.diplayproductdetail}}>
                        <div><span>Produit : {this.state.produit.prod}</span></div><br/>
                        <div><span>Prix(-25%) : {this.state.produit.prix-this.state.produit.prix*total/100}</span></div><br/>
                        <div><span>Peremption : <DatePicker onChange={(date,dateString)=>this.handleDatePeremp(date,dateString)} format="DD/MM/YYYY"/></span></div><br/>
                        <div><span>Quantite : <input onChange={(event)=>this.handleQtpav(event)} value={this.state.qtpav} type="number" min="1" /></span></div>
                    </div>
                </Modal>
                <Modal onCancel={()=>this.hideModalAchat()} visible={this.state.modalAchat}
                    footer={
                        [
                            <Button type="danger" onClick={()=>this.hideModalAchat()}>Annuler</Button>,
                            <Button disabled={this.state.stateConfrimVenteButton} type="primary"><Popconfirm onConfirm={()=>this.confirmerAchat()} title="Etes-vous sure de vouloir acheter ce produit." okText="Oui" cancelText="Non">Valider</Popconfirm></Button>
                        ]
                    }
                >
                    <div><b>Produit : {this.state.tempProd.prod}</b></div>
                    <div><b>Peremption : {this.state.tempProd.peremption}</b></div>
                    <div><b>Quantite : <InputNumber onChange={(value)=>this.handleQtpaA(value)} value={this.state.qtpaA} min={1} /></b></div>
                    <div><b>Prix Total : {this.state.tempProd.prix*this.state.qtpaA} Fcfa</b></div>
                </Modal>
            </div>
         );
    }
}
 
export default Ecom;