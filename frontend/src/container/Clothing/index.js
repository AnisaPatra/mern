import React, { Component } from 'react'
import Header from '../../components/Header'
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import FooterPage from '../../components/Footer';
/**
* @author
* @function Clothing
**/

const ProductCard = props => (
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
)

export default class Clothing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Men: [],
      Women: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:2000/api/product/sub_category=Menswear')
      .then(response => {
        this.setState({ Men: response.data });
        return axios.get('http://localhost:2000/api/product/sub_category=Womenswear');
      })
      .then(response => {
        this.setState({ Women: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  MensWearProductList() {
    return this.state.Men.map(currentproduct => {
      return <ProductCard product={currentproduct} />;
    })
  }

  WomensWearProductList() {
    return this.state.Women.map(currentproduct => {
      return <ProductCard product={currentproduct} />;
    })
  }
  render(){
    console.log(this.MensWearProductList())
    return(
      <div>
        <Header></Header>
        <br/><br/>
        <img src="http://localhost:2000/public/WJyAMCgJC_clothing.jpg" width="100%"/>
        <div>
          <br/>
        <Tabs style={{width:"100%"}}>
            <Tab eventKey="signin" title="Menswear" style={{width:"50%"}}>
            <Jumbotron style={{backgroundColor:"white", width:"1435px",margin:"40px"}}>
                <MDBCol>
                  <MDBCard style={{ width: "22rem" }}>
                    <MDBCardImage className="img-fluid" src={"http://localhost:2000/public/LDz3HWI9Q_clothing_men_shirt1.1.PNG"} waves />
                    {this.MensWearProductList()}
                  </MDBCard>
                </MDBCol>
                </Jumbotron>
            </Tab>
            <Tab eventKey="register" title="Womenswear" style={{width:"50%"}}>
            <Jumbotron style={{backgroundColor:"white", width:"1435px",margin:"40px"}}>
                <MDBCol>
                  <MDBCard style={{ width: "22rem" }}>
                    <MDBCardImage className="img-fluid" src={"http://localhost:2000/public/JC_PsolcO_clothing_women_dress1.1.PNG"} waves />
                    {this.WomensWearProductList()}
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