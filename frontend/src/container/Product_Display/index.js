import React from 'react'
import { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import Header from '../../components/Header'
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
/**
* @author
* @function Product_Display
**/

const ImageList = (props) => {
  console.log(props.images[0]);
  return <div>Images</div>;
};

export class Product_Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      brand: '',
      description: '',
      quantity: '',
      m_c: '',
      parent_Category: '',
      sub_category: '',
      images: []
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
          images: response.data.productPictures
        });
        console.log(this.state.images);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
      <div>
        <Header></Header>
        <br /><br /><br /><br />
        <Jumbotron style={{ backgroundColor: "white", margin: "50px" }}>
          <ImageList images={this.state.images} />
          <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
          <MDBCardBody>
            <MDBCardTitle>{this.state.brand}</MDBCardTitle>
            <MDBCardText>
            {this.state.name}
            </MDBCardText>
            <MDBCardText>
              Rs. {this.state.price}
            </MDBCardText>
            <MDBCardText>
              MOQ: {this.state.quantity}
            </MDBCardText>
            <MDBCardText>
            {this.state.description}
            </MDBCardText>
          </MDBCardBody>
          </MDBCard>
          </MDBCol>
          <div>            
          </div>
        </Jumbotron>
      </div>
    )
  }

}

export default Product_Display