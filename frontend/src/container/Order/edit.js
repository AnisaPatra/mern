import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron, Button } from 'react-bootstrap';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import FooterPage from '../../components/Footer';
import './style.css';

export default class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            status: null,
            payment_status: "Pending",
            seller:null,
            product:null,
            product_name:null
        };

        this.onChangestatus = this.onChangestatus.bind(this);
        this.onChangepayment_status = this.onChangepayment_status.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:2000/api/order/' + this.props.match.params.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState({
                    user: response.data.user,
                    seller:response.data.seller,
                    product : response.data.product,
                    status: response.data.status,
                    payment_status: response.data.payment_status,
                    product_name:response.data.product_name
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        })
        console.log(e)
    }

    onChangepayment_status(e) {
        this.setState({
            payment_status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:2000/api/order/' + this.props.match.params.id,{
            "user" : this.state.user,
            "seller" : this.state.seller,
            "product" : this.state.product,
            "status" : this.state.status,
            "payment_status" : this.state.payment_status
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ result: response.data });
                    console.log(response.data)
                    window.alert("Order Updated Successfully");
                }
            )
            .catch((error) => {
                window.alert(error);
            })
    }

    render() {
        return (
            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <main id="content" className="p-5" >
                        <Jumbotron style={{ backgroundColor: "white", margin: "50px", height:"500px" }}>
                            <form onSubmit={this.onSubmit}>
                                <table cellPadding="20" cellSpacing="25" style={{ float: "left", marginTop: '30px' }}>
                                    <tbody class="tbody">
                                        <tr>
                                            <td>
                                                <label>Customer ID: </label>
                                            </td>
                                            <td>
                                                <MDBInput type="text"
                                                    disabled
                                                    style={{ width: "250px" }}
                                                    value={this.state.user}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Product:
                                            </td>
                                            <td>
                                            <MDBInput type="text"
                                                    disabled
                                                    style={{ width: "250px" }}
                                                    value={this.state.product_name}
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
                                                    <option selected value="Pending">Pending</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Payment Status: </label>
                                            </td>
                                            <td>
                                            <select required className="form-control-boot"  name="payment_status" onChange={this.onChangepayment_status}>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option selected value="Pending">Pending</option>
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
                        </Jumbotron>
                    </main>
                    
                </div>
                <FooterPage/>
            </div >
        )
    }
}

