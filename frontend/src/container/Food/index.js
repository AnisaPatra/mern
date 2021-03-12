import React, { Component } from 'react'
import Header from '../../components/Header';
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import FooterPage from '../../components/Footer';
/**
* @author
* @function Food
**/


const ProductCard = props => (
  <Link to={"/product/"+props.product._id}>
      <MDBCardBody>
        <MDBCardTitle>{props.product.brand}</MDBCardTitle>
        <MDBCardText>
          {props.product.name}
        </MDBCardText>
        <MDBCardText>
          Rs. {props.product.price}
        </MDBCardText>
        <MDBCardText>
          MOQ: {props.product.quantity}
        </MDBCardText>
      </MDBCardBody>
      </Link>
)

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PC: [],
      CH: [],
      OGS: [],
      RPF: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/product/sub_category=PC')
      .then(response => {
        this.setState({ PC: response.data });
        console.log(this.state.PC[0].productPictures[0].img);
        return axios.get('http://localhost:2000/api/product/sub_category=Staple');
      })
      .then(response => {
        this.setState({ RPF: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  PCProductList() {
    return this.state.PC.map(currentproduct => {
      return <ProductCard product={currentproduct} />;
    })
  }

  RPFProductList() {
    return this.state.RPF.map(currentproduct => {
      return <ProductCard product={currentproduct} />;
    })
  }

  render() {
    var image = (this.state.PC);
    console.log(image[0]);
    return (
      <div>
        <Header></Header>
        <br /><br />
        <img src="http://localhost:2000/public/LUQ50EhOD_food1.jpeg" width="100%" />
        <br />
        <br />
        <div>
          <Tabs style={{ width: "100%" }} class="nav nav-tabs nav-justified">
            <Tab eventKey="signin" title="Personal Care">
              <Jumbotron style={{backgroundColor:"white", width:"1435px",margin:"40px"}}>
              <MDBCol>
                <MDBCard style={{ width: "22rem" }}>
                  <MDBCardImage className="img-fluid" src={"http://localhost:2000/public/ctlsHoesd_soap1.1.PNG"} waves />
                  {this.PCProductList()}
                </MDBCard>
              </MDBCol>
              </Jumbotron>
            </Tab>
            <Tab eventKey="register" title="Cleaning and Household">
              <br/>
            </Tab>
            <Tab eventKey="register" title="Oil , Ghee & Sugar" >
              <br/>
            </Tab>
            <Tab eventKey="register" title="Rice, Pulses & Flour">
              <Jumbotron style={{backgroundColor:"white", width:"1435px",margin:"40px"}}>
              <MDBCol>
                <MDBCard style={{ width: "22rem" }}>
                  <MDBCardImage className="img-fluid" src={"http://localhost:2000/public/Q6BUX0BQo_staple1.1.PNG"} waves />
                  {this.RPFProductList()}
                </MDBCard>
              </MDBCol>
              </Jumbotron>

            </Tab>
          </Tabs>
        </div>
        <FooterPage/>
      </div>
    )
  }
}
