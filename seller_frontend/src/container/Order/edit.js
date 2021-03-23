import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: null,
            user: null,
            quantity: null,
            price: null,
            status: null,
            payment: null,
            payment_status: null,
            pays: [],
            payCategory: "Cash on Delivery"
        };

        this.onChangehandle = this.onChangehandle.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.onChangepayment_status = this.onChangepayment_status.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:2000/api//order/' + this.props.match.params.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    user: response.data.user,
                    quantity: response.data.quantity,
                    price: response.data.price,
                    status: response.data.status,
                    payment: response.data.payment,
                    payment_status: response.data.payment_status,
                })
                return axios.get('http://localhost:2000/api/payment_options/')
            })
            .then(response => {
                this.setState({ pays: response.data.map(payCategory => payCategory.name) })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangehandle(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangepayment_status(e) {
        this.setState({
            payment_status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("product_name", this.state.product_name);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        formData.append("user", this.state.user);
        formData.append("status", this.state.status);
        formData.append("payment", this.state.payment);
        formData.append("payment_status", this.state.payment_status);
        axios.put('http://localhost:2000/api//order/' + this.props.match.params.id, formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ result: response.data });
                    console.log(response.data)
                }
            );

        window.alert("Order Updated Successfully");
    }

    render() {
        return (
            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <SideNavigation />
                    <main id="content" className="p-5" >
                        <Container style={{ backgroundColor: "white" }}>
                            <h2 class="h2">Update Order</h2>
                            <br />
                            <form onSubmit={this.onSubmit}>
                                <table cellPadding="20" cellSpacing="25" style={{ float: "left", marginTop: '30px' }}>
                                    <tbody class="tbody">
                                        <tr>
                                            <td>
                                                <label>Name: </label>
                                            </td>
                                            <td>
                                                <MDBInput type="text"
                                                    disabled
                                                    required
                                                    maxlength="200"
                                                    minlength="3"
                                                    style={{ width: "250px" }}
                                                    value={this.state.product_name}
                                                    onChange={this.onChangehandle}
                                                    name="product_name"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Customer ID: </label>
                                            </td>
                                            <td>
                                                <MDBInput type="text"
                                                    required
                                                    disabled
                                                    maxlength="200"
                                                    minlength="3"
                                                    style={{ width: "250px" }}
                                                    value={this.state.user}
                                                    onChange={this.onChangehandle}
                                                    name="user"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Quantity: </label>
                                            </td>
                                            <td>
                                                <MDBInput type="text"
                                                    required
                                                    maxlength="50"
                                                    minlength="1"
                                                    disabled
                                                    style={{ width: "250px" }}
                                                    value={this.state.quantity}
                                                    onChange={this.onChangehandle}
                                                    name="quantity"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Price: </label>
                                            </td>
                                            <td>
                                                <MDBInput type="text"
                                                    required
                                                    disabled
                                                    maxlength="50"
                                                    minlength="1"
                                                    style={{ width: "250px" }}
                                                    value={this.state.price}
                                                    onChange={this.onChangehandle}
                                                    name="price"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Status: </label>
                                            </td>
                                            <td>
                                                <select required className="form-control-boot"  name="status" onChange={this.onChangestatus}>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Payment Type: </label>
                                            </td>
                                            <td>
                                                <select ref="userInput"
                                                    style={{ width: "250px" }}
                                                    required
                                                    disabled
                                                    maxlength="40"
                                                    minlength="3"
                                                    name = "payment"
                                                    className="form-control"
                                                    value={this.state.payment}>
                                                    {
                                                        this.state.pays.map(function (subcat) {
                                                            return <option
                                                                key={subcat}
                                                                value={subcat}>{subcat}
                                                            </option>;
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Payment Status: </label>
                                            </td>
                                            <td>
                                            <select required className="form-control-boot"  name="payment_status" onChange={this.onChangepayment_status}>
                                                    <option value="Cancelled">Order Cancelled</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <br /><br />
                                        <tr>
                                            <td>
                                                <Link to="/order"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                            </td>
                                            <td>
                                                <Button type="submit" variant="outline-success" class="btn">Update</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <br />
                        </Container>
                    </main>
                </div>
            </div >
        )
    }
}

