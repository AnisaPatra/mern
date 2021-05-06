import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import './index.css';
import {MDBIcon} from 'mdbreact';
import { Link } from 'react-router-dom';

/**
* @author
* @function Product_Category
**/
const Productss = props => (
  <tr>
    <td>{props.product.name}</td>
    <td>{props.product.brand}</td>
    <td>{props.product.price}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.description}</td>
    <td>{props.product.createdAt.substring(0, 10)}</td>
    <td>{props.product.parent_category}</td>
    <td>{props.product.sub_category}</td>
    <td> <Link to={"/product_edit/"+props.product._id}>
        <MDBIcon icon="pen" style={{color: "#00C851" }}/>
      </Link>&nbsp;&nbsp; | &nbsp;&nbsp;
      <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>
        <MDBIcon icon="trash-alt" style={{color: "#CC0000"}}/>
        </a>
    </td>
  </tr>
)

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.sort = this.sort.bind(this);
    this.pages = this.pages.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      merge3: [],
      items : null
    };
  }

  componentDidMount() {
    var x=[];
    axios.get('http://localhost:2000/api/product/seller/'+ localStorage.user.substr(8,24)+'?sort=-createdAt')
      .then(response => {
        response.data.selling.forEach(element => {
          x.push(element);
        });
        this.setState({ merge3: x });
        return axios.get("http://localhost:2000/api/product/count/"+ localStorage.user.substr(8,24))
      })
      .then(response => {
        this.setState({
          items: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduct(id){
    axios.delete('http://localhost:2000/api/product/' + id,
    {
        headers:{
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token') 
        }
      })
      .then(response => { console.log(response.data) });

    this.setState({
      merge3: this.state.merge3.filter(el => el._id !== id)

    })
  }

  productList() {
    return this.state.merge3.map(currentproduct => {
      return <Productss product={currentproduct} deleteProduct={this.deleteProduct.bind(this)} key={currentproduct._id} />;
    })
  }

  onChangePage(e) {
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api/product/seller/"+ localStorage.user.substr(8,24)+ "?sort=-createdAt&page=" + e.target.value )
      .then(response => {
        a = response.data.selling;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ merge3: x })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  pages() {
    var i;
    var rows = [];
    for (i = 1; i <= Math.ceil(this.state.items / 12); i++) {
      rows.push(i);
    }
    return rows.map((numbers) =>
      <button type="button" class="btn" value={numbers} onClick={e => this.onChangePage(e)}>{numbers}</button>
    )
  }

  sort(e) {
    console.log(e.target.value);
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api//product/seller/"+ localStorage.user.substr(8,24)+"?sort="+e.target.value)
      .then(response => {
        response.data.selling.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ merge3: x })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {

    return (
      <div>
        <Layout></Layout>
        <div className="flexible-content" style={{backgroundColor: "white"}}>
          <SideNavigation/>
          <main id="content" className="p-5" style={{height: "100%", marginLeft: "270px"}}>
            <Container style={{backgroundColor: "white"}}>
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px'}}>
                Products
              <button style={{ background: "transparent", border: 0, outline: 0, float: "right" ,top: '50px'}}>
                <Link to={'/products/add'}><MDBIcon icon="plus-circle" size="1x" style={{color : "#4285F4"}}/></Link>
              </button></h2>
              <br />
              <p class="lead" style={{ fontFamily: "Cambria" }}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}></p>
              </p>
              <p class="lead" style={{ fontFamily: "Cambria" }}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}></p>
              </p>
              <div class="filter-container">
                <label class="sort">{this.state.items} Items found</label>
                <div class="filter">
                  <label class="sort">Sort By:</label>
                  <select class="form-control-boot" onChange={this.sort}>
                  <option value="-createdAt">Created At(Latest)</option>
                    <option value="relevance">Relevance</option>
                    <option value="price">Price(lowest first)</option>
                    <option value="-price">Price(highest first)</option>
                    <option value="category">Category</option>
                    <option value="sub_category">Sub Category</option>
                  </select>
                </div>
              </div>
                    <Table striped bordered hover variant="grey" class="tb" >
                      <thead style={{fontFamily:"Georgia", fontWeight:"bolder", fontStretch: "extra-expanded"}}>
                        <tr>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>MOQ</th>
                          <th>Description</th>
                          <th>Creation Time</th>
                          <th>Category</th>
                          <th>Sub Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{fontFamily:"Cambria" ,fontSize: "17px"}}>
                      {this.productList()}
                      </tbody>
                    </Table>
              <br />
              <div class="btn-group mr-2" style={{paddingInlineStart:"700px"}} role="group" aria-label="First group">
                {this.pages()}
              </div>
            </Container>
          </main>
        </div>
      </div>
    )
  }


}