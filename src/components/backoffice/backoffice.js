import React, { Component } from 'react';
import { Table, Input, Button, Space,Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

import './backoffice.css';


const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Joe Black',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

class Backoffice extends Component {


  constructor(props) {
    super(props);
    // N’appelez pas `this.setState()` ici !
    
    this.state = {
        searchText: '',
        searchedColumn: '',
        data:[],
    
    };

    this.getDatasFunc();
    
  }

  getDatasFunc = ()=> {

    let url = "http://www.cloudpharma.org/backendpharma/public/index.php/api/produit/getBuyedProducts";
    let formData = new FormData();
  
    formData.append("id","");

    axios({
        url:url,
        method:'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data:formData
      }).then(rep=>{
        if(rep.status===200){
          let datas=rep.data;
          
          let produits = [];

          (datas.produit).forEach(element => {
              

              produits.push({
                nom : element.produit,
                prix : element.prix,
                quantite : element.quantite,
                adresse  : element.sellerPharm.adresse,
                pharmacie   : element.sellerPharm.nom,
                telephone   : element.sellerPharm.tel
              });


          });

          this.setState({
            data: produits
          });

          console.log(this.state.data)
    
        }else
          console.log(rep);
      });

  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  searchAll = value => {
    const { baseData } = this.state;
    console.log("PASS", { value });

    const filterTable = this.state.data.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable });
  };

    render() { 
        const columns = [
            {
                title: 'Nom',
                dataIndex: 'nom',
                key: 'nom',
                width: '30%',
                ...this.getColumnSearchProps('nom'),
            },
            {
                title: 'Prix',
                dataIndex: 'prix',
                key: 'prix',
                width: '20%',
                ...this.getColumnSearchProps('prix'),
            },
            {
                title: 'Quantite',
                dataIndex: 'quantite',
                key: 'quantite',
                ...this.getColumnSearchProps('quantite'),
            },
            {
                title: 'Adresse',
                dataIndex: 'adresse',
                key: 'adresse',
                ...this.getColumnSearchProps('adresse'),
            },
            {
                title: 'Pharmacie',
                dataIndex: 'pharmacie',
                key: 'pharmacie',
                ...this.getColumnSearchProps('pharmacie'),
            },
            {
                title: 'Telephone',
                dataIndex: 'telephone',
                key: 'telephone',
                ...this.getColumnSearchProps('telephone'),
            },
            ];

            

        return (
        <div> 
            <p style={{backgroundColor:"white",color:"black",textAlign:"center"}}>Backoffice</p>
            <Form {...formItemLayout}>
                <Form.Item>
                    <Input placeholder="search"  prefix={<SearchOutlined /> } onChange={(e)=>{this.searchAll(e.target.value)}}/>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={this.state.data} />
        </div> 
        );

        
    }
}
 
export default Backoffice;