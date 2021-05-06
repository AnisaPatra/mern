import React, { Component } from 'react'
import Layout from '../../components/Layout';
import './style.css';
import axios from 'axios';
import { MDBFormInline, MDBIcon } from "mdbreact";
import { MDBBtnGroup, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import FooterPage from '../../components/Footer';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
/**
* @author
* @function ParentCategory
**/



export default class ParentCategory extends Component {
  constructor(props) {
    super(props);
    this.ProductChange = this.ProductChange.bind(this);
    this.BrandChange = this.BrandChange.bind(this);
    this.below = this.below.bind(this);
    this.sort = this.sort.bind(this);
    this.pages = this.pages.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      name: null,
      CategoryImage: null,
      createdAt: null,
      description: null,
      categories: [],
      subcategories: [],
      product: [],
      productImages: [],
      brand: [],
      search: '',
      items: null
    }
  }

  componentDidMount() {
    var a = null;
    var x = [];
    var y = [];
    var k = [];
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
        return axios.get("http://localhost:2000/api/product/getproductss?parent_category=" + this.state.name + "&page=1&sort=relevance")
      })
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
          if (y.includes(arrayItem.brand) == false) {
            y.push(arrayItem.brand);
          }
        })
        this.setState({
          product: x,
          brand: y
        })
        return axios.post("http://localhost:2000/api/product/count", { parent: this.state.name })
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

  ProductChange(e) {
    var a = null;
    var x = [];
    axios.get('http://localhost:2000/api/product/getproductss?sub_category=' + e.nativeEvent.explicitOriginalTarget.innerHTML)
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ product: x })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  BrandChange = e => {
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name = response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?brand=' + e.nativeEvent.explicitOriginalTarget.innerHTML)
      })
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          if (arrayItem.parent_category == name)
            x.push(arrayItem);
        })
        this.setState({ product: x })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  below(e) {
    var a = null;
    var x = [];
    var name = null;
    axios.get('http://localhost:2000/api/category/getcatbyid/' + this.props.match.params.id)
      .then(response => {
        name = response.data.name
        return axios.get('http://localhost:2000/api/product/getproductss?price[lt]=' + e.nativeEvent.explicitOriginalTarget.innerHTML.substr(6, 9) + "&parent_category=" + this.state.name)
      })
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          if (arrayItem.parent_category == name) {
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

  sort(e) {
    console.log(e.target.value);
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api/product/getproductss?parent_category=" + this.state.name + "&page=1&sort=" + e.target.value)
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ product: x })
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
      if (currentproduct.productPictures.length == 1) {
        return (
          <Link to={"/product/" + currentproduct._id}>
            <MDBCol>
              <MDBCard className="cardi">
                <MDBCardImage className="img-fluid" src={"http://localhost:2000" + currentproduct.productPictures[0].img} waves />
                <MDBCardBody>
                  <MDBCardTitle className="brand">{currentproduct.brand}</MDBCardTitle>
                  <MDBCardText className="name">
                    {currentproduct.name}
                  </MDBCardText><hr style={{ height: "12px", color: "black" }} />
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
      }
      else {
        return (
          <Link to={"/product/" + currentproduct._id}>
            <MDBCol>
              <MDBCard className="cardi">
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                  <FrontSide style={{ boxShadow: "none" }}>
                    <MDBCardImage className="img-fluid" src={"http://localhost:2000" + currentproduct.productPictures[0].img} waves />
                    <MDBCardBody>
                      <MDBCardTitle className="brand">{currentproduct.brand}</MDBCardTitle>
                      <MDBCardText className="name">
                        {currentproduct.name}
                      </MDBCardText><hr style={{ height: "12px", color: "black" }} />
                      <MDBCardText className="price">
                        Rs. {currentproduct.price}
                      </MDBCardText>
                      <MDBCardText className="price_moq">
                        MOQ: {currentproduct.quantity}
                      </MDBCardText>
                    </MDBCardBody>
                  </FrontSide>
                  <BackSide style={{ boxShadow: "none" }}>
                    <MDBCardImage className="img-fluid" src={"http://localhost:2000" + currentproduct.productPictures[1].img} waves />
                    <MDBCardBody>
                      <MDBCardTitle className="brand">{currentproduct.brand}</MDBCardTitle>
                      <MDBCardText className="name">
                        {currentproduct.name}
                      </MDBCardText><hr style={{ height: "12px", color: "black" }} />
                      <MDBCardText className="price">
                        Rs. {currentproduct.price}
                      </MDBCardText>
                      <MDBCardText className="price_moq">
                        MOQ: {currentproduct.quantity}
                      </MDBCardText>
                    </MDBCardBody>
                  </BackSide>
                </Flippy>
              </MDBCard>
            </MDBCol>
          </Link>
        )
      }

    })
  }


  onChangePage(e) {
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api/product/getproductss?parent_category=" + this.state.name + "&page=" + e.target.value)
      .then(response => {
        a = response.data.retailing;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ product: x })
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
      <button type="button" class="btn btn-secondary" value={numbers} onClick={e => this.onChangePage(e)}>{numbers}</button>
    )
  }

  search() {
    var x = [];
    axios.post('http://localhost:2000/api/product/search?parent_category=' + this.state.name,
      {
        "term": this.state.search
      })
      .then(response => {
        response.data.results.forEach(function (arrayItem) {
          x.push(arrayItem);
        });
        this.setState({ product: x })
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.product)
    return (
      <div>
        <Layout></Layout>
        <br /><br /><br /><br />
        <div class="main-view page page--category-desktop product-view">
          <div class="plp-view">
            <div class="facets">
              <div class="typehead"><u>filter</u></div><br />
              <span style={{ fontSize: "20px", paddingLeft: "65px" }}><b>Sub Category</b></span>
              <br /><br />
              <ul class="sub">
                {this.subList()}
              </ul>
              <br /><br /><br /><br /><br />
              <span style={{ fontSize: "20px" }}><b>Price</b></span>
              <br /><br />
              <ul class="sub">
                <li onClick={this.below}>Below 500</li>
                <li onClick={this.below}>Below 1000</li>
                <li onClick={this.below}>Below 1500</li>
              </ul>
              <br /><br /><br /><br />
              <span style={{ fontSize: "20px" }}><b>Brand</b></span>
              <br /><br />
              <ul class="sub">
                {this.brandList()}
              </ul>
              <br /><br /><br /><br /><br />

            </div>

            <div class="products">
              <div class="info search-info">
                <h1 class="header1">{this.state.name}</h1>
                <div class="plp-info-description">
                  <p style={{ paddingLeft: "150px", paddingRight: "120px" }}>{this.state.description}</p>
                  <br /><br />
                </div>
              </div>
              <div className="search">
                <input type="text" placeholder="Search Products" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} style={{ border: "none", width: "70%" }} />
                <a onClick={() => { this.search() }} style={{ border: "none", backgroundColor: "white" }}>
                  <MDBIcon icon="search" />
                </a>
              </div>
              <br />
              <div class="filter-container">
                <label class="sort">{this.state.items} Items found</label>
                <div class="filter">
                  <label class="sort">Sort By:</label>
                  <select class="form-control-boot" onChange={this.sort}>
                    <option value="relevance">Relevance</option>
                    <option value="price">Price(lowest first)</option>
                    <option value="-price">Price(highest first)</option>
                    <option value="-updatedAt">What's New</option>
                  </select>
                </div>
              </div>
                  <div>
                  <div class="row row-cols-1 row-cols-md-3 g-4">
                    {this.PCProductList()}
                  </div><br /><br /><br /><br />
                  <div class="btn-group mr-2" role="group">
                    {this.pages()}
                  </div>
                </div>

            </div>
          </div>
        </div>
        <FooterPage></FooterPage>
      </div>
    )
  }
}
