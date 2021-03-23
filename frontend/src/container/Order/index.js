import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import axios from 'axios';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import FooterPage from '../../components/Footer';

/**
* @author
* @function Order
**/

const Orders = props => (
    <tr>
      <td>{props.order.product_name}</td>
      <td>{props.order.quantity}</td>
      <td>{props.order.price}</td>
      <td>{props.order.status}</td>
      <td>{props.order.payment}</td>
      <td>{props.order.payment_status}</td>
      <td>{props.order.createdAt.substring(0, 10)}</td>
    </tr>
  )

export default class Order extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          merge3: []
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:2000/api/orders?user='+ localStorage.user.substr(8,24),
        {
            headers:{
                'Authorization' : 'Bearer ' + window.localStorage.getItem('token') 
            }
        })
          .then(response => {
            this.setState({ merge3: response.data.retailing });
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
      }

      orderList() {
        return this.state.merge3.map(currentorder => {
          return <Orders order={currentorder} key={currentorder._id} />;
        })
      }
    render() {
        return (
            <div>
                <Layout/>
                <div className="flexible-content" style={{ backgroundColor: "white" }}>
                    <main id="content" className="p-5" style={{ height: "100%"}}>
                        <Container style={{ backgroundColor: "white" }}>
                            <br/><br/><br/><br/><br/><br/>
                            <center>
                            <Table hover variant="grey" style={{ marginTop: "50px", marginBottom: "100px" }} >
                                <thead style={{ fontFamily: "Georgia", fontWeight: "bolder", fontStretch: "extra-expanded" }}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Payment Type</th>
                                        <th>Payment Status</th>
                                        <th>Creation Time</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontFamily: "Cambria", fontSize: "17px" }}>
                                    {this.orderList()}
                                </tbody>
                            </Table>
                            </center>
                        </Container>
                    </main>
                    <FooterPage></FooterPage>
                </div>
            </div>

        )
    }

}