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
    <td><Link to={"/retailer/" + props.order.user}>{props.order.user}</Link></td>
    <td>{props.order.quantity}</td>
    <td>{props.order.price}</td>
    <td>{props.order.status}</td>
    <td>{props.order.payment}</td>
    <td>{props.order.payment_status}</td>
    <td>{props.order.createdAt.substring(0, 10)}</td>
    <td> <Link to={"/order_edit/" + props.order._id}>
      <MDBIcon icon="pen" style={{ color: "#00C851" }} />
    </Link>
    </td>
  </tr>
)

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.pages = this.pages.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      merge3: [],
      items:null
    };
  }

  componentDidMount() {
    var x = [];
    axios.get('http://localhost:2000/api/seller/order/' + localStorage.user.substr(8, 24),
      {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
      })
      .then(response => {
        response.data.orders.forEach(element => {
          x.push(element);
        });
        this.setState({ merge3: x });
        return axios.get("http://localhost:2000/api/order/count/" + localStorage.user.substr(8, 24))
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
  onChangePage(e) {
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api/seller/order/"+ localStorage.user.substr(8,24)+ "?sort=-createdAt&page=" + e.target.value ,
    {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    })
      .then(response => {
        a = response.data.selling;
        a.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ merge3: x })
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
      <button type="button" class="btn" value={numbers} onClick={e => this.onChangePage(e)}>{numbers}</button>
    )
  }

  sort(e) {
    console.log(e.target.value);
    var a = null;
    var x = [];
    axios.get("http://localhost:2000/api/seller/order/"+ localStorage.user.substr(8,24)+"?sort="+e.target.value,
    {
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      }
    })
      .then(response => {
        response.data.selling.forEach(function (arrayItem) {
          x.push(arrayItem);
        })
        this.setState({ merge3: x })
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
                Orders</h2>
              <br /><br /><br />
              <div class="filter-container">
                <label class="sort">{this.state.items} Items found</label>
                <div class="filter">
                  <label class="sort">Sort By:</label>
                  <select class="form-control-boot" onChange={this.sort}>
                  <option value="-createdAt">Created At(Latest)</option>
                  <option value="payment_status">Payment Status</option>
                    <option value="price">Price(lowest first)</option>
                    <option value="-price">Price(highest first)</option>
                  </select>
                </div>
              </div>
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