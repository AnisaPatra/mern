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
* @function Search
**/



export default class Search extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.state = {
      search: '',
      items: null,
      product: []
    }
  }

  componentDidMount() {
    var x = [];
    axios.post('http://localhost:2000/api/product/search',
      {
        "term": this.props.location.state
      })
      .then(response => {
        response.data.results.forEach(function (arrayItem) {
          x.push(arrayItem);
        });
        this.setState({ product: x })
        console.log(this.props.location.state)
        console.log(window.history.location)
      })
      .catch(err => console.log(err));
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

  PCProductList() {
    return this.state.product.map(currentproduct => {
      if(this.props.location.state != <empty string></empty>){
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
      }
      else{
        return (
            <MDBCol>
              <MDBCard className="cardi">
                <MDBCardBody>
                  <MDBCardText className="name">
                    No match found
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
        )
      }
      
    })
  }

  render() {
    return (
      <div>
        <Layout></Layout>
        <br /><br /><br /><br />
        <div class="main-view page page--category-desktop product-view">
          <div class="plp-view">
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
            </div>
          </div>
        </div>
        <FooterPage></FooterPage>
      </div>
    )
  }
}
