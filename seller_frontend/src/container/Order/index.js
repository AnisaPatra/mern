import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import axios from 'axios';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

/**
* @author
* @function Order
**/

const Orders = props => (
    <tr>
      <td>{props.order.product_name}</td>
      <td>{props.order.user}</td>
      <td>{props.order.quantity}</td>
      <td>{props.order.price}</td>
      <td>{props.order.status}</td>
      <td>{props.order.payment}</td>
      <td>{props.order.payment_status}</td>
      <td>{props.order.createdAt.substring(0, 10)}</td>
      <td> <Link to={"/order_edit/"+props.order._id}>
          <MDBIcon icon="pen" style={{color: "#00C851" }}/>
        </Link>
      </td>
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
        axios.get('http://localhost:2000/api/orders?seller='+ localStorage.user.substr(8,24),
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
                <Layout></Layout>
                <div className="flexible-content" style={{ backgroundColor: "white" }}>
                    <SideNavigation />
                    <main id="content" className="p-5" style={{ height: "100%", marginLeft: "270px" }}>
                        <Container style={{ backgroundColor: "white" }}>
                            <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px' }}>
                                Orders
                            </h2>
                            <br/><br/><br/>
                            <Table striped bordered hover variant="grey" class="tb" >
                                <thead style={{ fontFamily: "Georgia", fontWeight: "bolder", fontStretch: "extra-expanded" }}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Customer ID</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Payment Type</th>
                                        <th>Payment Status</th>
                                        <th>Creation Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontFamily: "Cambria", fontSize: "17px" }}>
                                    {this.orderList()}
                                </tbody>
                            </Table>

                        </Container>
                    </main>
                </div>
            </div>

        )
    }

}