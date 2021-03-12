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
    this.deleteProduct = this.deleteProduct.bind(this)
    this.state = {
      merge3: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/product/seller/'+ localStorage.user.substr(8,24))
      .then(response => {
        this.setState({ merge3: response.data });
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
                    <Table striped bordered hover variant="grey" class="tb" >
                      <thead style={{fontFamily:"Georgia", fontWeight:"bolder", fontStretch: "extra-expanded"}}>
                        <tr>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>MOQ</th>
                          <th>Description</th>
                          <th>Creation Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{fontFamily:"Cambria" ,fontSize: "17px"}}>
                        {this.productList()}
                      </tbody>
                    </Table>

              <br />
            </Container>
          </main>
        </div>
      </div>
    )
  }


}