import React from 'react'
import { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import axios from 'axios';
import './style.css';
import { MDBBtnGroup, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
/**
* @author
* @function Product_Display
**/

const ProductCard = props => (
  <MDBCardImage className="card-img-top" src={"http://localhost:2000" + props.product[1].img} waves />
)

const ProductCardi = props => (
  <img className="mcard-img-top" src={"http://localhost:2000" + props.product[1].img} waves />
)

export class Product_Display extends Component {
  constructor(props) {
    super(props);
    this.cart = this.cart.bind(this);
    this.state = {
      name: '',
      price: null,
      brand: '',
      description: '',
      quantity: null,
      m_c: '',
      parent_Category: '',
      sub_category: '',
      images: [],
      final_images: [],
      description: '',
      v: null,
      seller_id: null,
      shop_name: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/product/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          price: response.data.price,
          brand: response.data.brand,
          quantity: response.data.quantity,
          description: response.data.description,
          parent_Category: response.data.parent_Category,
          sub_category: response.data.sub_category,
          m_c: response.data.m_c,
          images: response.data.productPictures,
          description: response.data.description,
          v: response.data.quantity,
          seller_id: response.data.createdBy
        });
        return axios.get("http://localhost:2000/api/users/" + this.state.seller_id)
      })
      .then(response => {
        this.setState({
          shop_name: response.data.shop_name
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  PCProductList() {
    if (this.state.images.length > 1) {
      return Object.entries(this.state.images).map(currentproduct => {
        return <ProductCard product={currentproduct} />;
      })
    }
    else {

      return Object.entries(this.state.images).map(currentproduct => {
        return <ProductCardi product={currentproduct} />;
      })
    }

  }

  increment() {
    this.setState({
      quantity: this.state.quantity + 1
    });
  };

  decrement() {
    if (this.state.quantity > this.state.v) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  };

  cart() {
    if (window.localStorage.token != null) {
      axios.post("http://localhost:2000/api/retailer/cart/addtocart",
        {
          "cartItems": {
            "product": this.props.match.params.id,
            "quantity": this.state.quantity,
            "price": this.state.price * this.state.quantity,
            "product_name": this.state.name,
            "seller": this.state.seller_id
          }
        },
        {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
          }
        })
        .then(
          response => {
            console.log("D")
          }
        )
        .catch(err => window.alert(err));
      window.location.href = "/cart/" + window.localStorage.user.substr(8, 24);
    }
    else {
      window.location.href = "/signin/"
    }
  }
  render() {

    return (
      <div>
        <Layout></Layout>
        <br /><br /><br /><br />
        <Jumbotron style={{ backgroundColor: "white", margin: "50px" }}>
          <MDBRow>
            <MDBCol md="7">
              {(() => {
                if (this.state.images.length > 1) {
                  return (
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                      {this.PCProductList()}
                    </div>
                  )
                }
                return (
                  <div class="row row-cols-1 row-cols-md-1 g-4">
                    {this.PCProductList()}
                  </div>
                )
              })()}
            </MDBCol>
            <MDBCol md="5">
              <MDBCard className="cardy">
                <MDBCardBody>
                  <MDBCardTitle className="brand">Brand : {this.state.brand}</MDBCardTitle>
                  <MDBCardText className="name">
                    Name : {this.state.name}
                  </MDBCardText>
                  <MDBCardText className="price_moq">
                    Price : Rs. {this.state.price}
                  </MDBCardText>
                  <MDBCardText className="price_moq">
                    MOQ (Minimum Order Quantity) : {this.state.quantity}
                  </MDBCardText>
                  <MDBCardText className="description">
                    Description :
                  </MDBCardText>
                  <MDBCardText className="description">
                    {this.state.description}
                  </MDBCardText>
                  <MDBCardText className="description">
                    <Link to={"/seller/" + this.state.seller_id} style={{ color: "#50b46d" }}>Seller : {this.state.shop_name}</Link>
                  </MDBCardText>
                  <hr />
                  <div className="go_cart">
                    <button className="add" onClick={this.cart}>Add to Cart</button><br/>
                    <div class="btn-group" role="group" >
                      <p class="quan">
                        <button className='dec' onClick={(e) => this.decrement(e)}>-</button>
                        {this.state.quantity}
                        <button className='inc' onClick={(e) => this.increment(e)}>+</button>
                      </p>
                    </div>
                  </div>


                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Jumbotron>
      </div>
    )
  }

}

export default Product_Display