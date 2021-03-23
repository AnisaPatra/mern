import React, { Component } from 'react'
import Layout from '../../components/Layout';
import './style.css';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import FooterPage from '../../components/Footer';
/**
* @author
* @function ParentCategory
**/



export default class ParentCategory extends Component {
  constructor(props) {
    super(props);
    this.ProductChange = this.ProductChange.bind(this);
    this.BrandChange = this.BrandChange.bind(this);
    this.below1000 = this.below1000.bind(this);
    this.below1500 = this.below1500.bind(this);
    this.below500 = this.below500.bind(this);
    this.state = {
      name: null,
      CategoryImage: null,
      createdAt: null,
      description: null,
      categories: [],
      subcategories: [],
      product: [],
      productImages: [],
      brand:[]
    }
  }

  componentDidMount() {
    var a = null;
    var x = [];
    var y = [];
    var k =[];
    var z = {};
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          CategoryImage: "http://localhost:2000" + response.data.CategoryImage,
          description: response.data.description
        });
        return axios.get('http://localhost:2000/api//category/getcategory?parentCategory=' + this.state.name)
      })
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem.name);
        });
        this.setState({
          subcategories: x
        });
        x = [];
        return axios.get("http://localhost:2000/api/product/getproductss?parent_category=" + this.state.name)
      })
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
          y.push(arrayItem.brand);
          k.push(arrayItem.productPictures[0])
        })
        this.setState({
          product: x ,
          brand : y,
          productImages : k
       })
       console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  ProductChange(e){
    var a = null;
    var x = [];
    axios.get('http://localhost:2000/api/product/getproductss?sub_category=' + e.nativeEvent.explicitOriginalTarget.innerHTML)
    .then(response => {
      a = response.data.retailing;
      a.forEach(function (arrayItem) {
        x.push(arrayItem);
      })
      this.setState({ product: x })
      console.log(this.state.product)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  BrandChange = e =>{
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name =  response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?brand=' + e.nativeEvent.explicitOriginalTarget.innerHTML)
      })    
    .then(response => {
      a = response.data.retailing;
      a.forEach(function (arrayItem) {
        if(arrayItem.parent_category == name)
          x.push(arrayItem);
      })
      this.setState({ product: x })
      
      console.log(this.state.product)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  below500(e){
    console.log(e)
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name =  response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?price[lt]=500' )
      })        
    .then(response => {
      a = response.data.retailing;
      a.forEach(function (arrayItem) {
        if(arrayItem.parent_category == name){
          x.push(arrayItem)
        }
      })
      this.setState({ product: x })
      console.log(this.state.product)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  below1000(e){
    console.log(e)
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name =  response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?price[lt]=1000' )
      })        
    .then(response => {
      a = response.data.retailing;
      a.forEach(function (arrayItem) {
        if(arrayItem.parent_category == name){
          x.push(arrayItem)
        }
      })
      this.setState({ product: x })
      console.log(this.state.product)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  below1500(e){
    console.log(e)
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name =  response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?price[lt]=1500' )
      })        
    .then(response => {
      a = response.data.retailing;
      a.forEach(function (arrayItem) {
        if(arrayItem.parent_category == name){
          x.push(arrayItem)
        }
      })
      this.setState({ product: x })
      console.log(this.state.product)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  subList() {
    return this.state.subcategories.map((numbers) =>
      <li onClick={this.ProductChange}>{numbers}</li>
    )
  }

  brandList() {
    return this.state.brand.map((numbers) =>
      <li onClick={this.BrandChange}>{numbers}</li>
    )
  }

  PCProductList() {
    return this.state.product.map(currentproduct => {
      console.log(currentproduct)
      return(
        <Link to={"/product/" + currentproduct._id}>
        <MDBCol>
          <MDBCard className="cardi">
            <MDBCardImage className="img-fluid" src={"http://localhost:2000" + currentproduct.productPictures[0].img} waves/>
            <MDBCardBody>
              <MDBCardTitle className="brand">{currentproduct.brand}</MDBCardTitle>
              <MDBCardText className="name">
                currentproduct.name}
              </MDBCardText><hr style={{height:"12px", color:"black"}}/>
              <MDBCardText className="price">
                Rs. {currentproduct.price}
              </MDBCardText>
              <MDBCardText className="price_moq">
                MOQ: {currentproduct.quantity}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <Layout></Layout>
        <br /><br /><br /><br />
        <div class="main-view page page--category-desktop product-view">
          <div class="plp-view">
            <div class="facets">
              <div class="typehead"><u>filter</u></div><br/>
              <span style={{fontSize:"20px",paddingLeft:"65px"}}><b>Sub Category</b></span>
              <br/><br/>
              <ul class="sub">
                {this.subList()}
              </ul>
              <br/><br/><br/><br/><br/>
              <span style={{fontSize:"20px"}}><b>Price</b></span>
              <br/><br/>
<ul class="sub">
                <li onClick={this.below500}>Below 500</li>
                <li onClick={this.below1000}>Below 1000</li>
                <li onClick={this.below1500}>Below 1500</li>
              </ul>
              
              
              <br/><br/><br/><br/>
              <span style={{fontSize:"20px"}}><b>Brand</b></span>
              <br/><br/>
              <ul class="sub">
                {this.brandList()}
              </ul>
              <br/><br/><br/><br/><br/>
              
            </div>
            <div class="products">
              <div class="info search-info">
                <h1 class="header1">{this.state.name}</h1>
                <div class="plp-info-description">
                  <p style={{ paddingLeft: "150px", paddingRight: "120px" }}>{this.state.description}</p>
                  <br /><br />
                </div>
              </div>
              <div class="row row-cols-1 row-cols-md-3 g-4">
                {this.PCProductList()}
              </div>
            </div>
          </div>
        </div>
        <FooterPage></FooterPage>
      </div>
    )
  }
}
