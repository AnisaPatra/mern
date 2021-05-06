import React from 'react'
import { Component } from 'react'
import FooterPage from '../../components/Footer'
import { Jumbotron, Table } from "react-bootstrap";
import Layout from '../../components/Layout';
import axios from 'axios';
import './style.css';
/**
* @author
* @function Cart
**/


export class Cart extends Component {
    constructor(props) {
        super(props);
        this.Checkout = this.Checkout.bind(this);
        this.state = {
            cart: [],
            cart_details: [],
            pays: [],
            payCategory: "Cash on Delivery"
        }
    }
    componentDidMount() {
        axios.get("http://localhost:2000/api/retailer/cart/" + window.localStorage.user.substr(8, 24),
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState({
                    cart_details: response.data,
                    cart: response.data[0].cartItems
                })
                console.log(response.data[0].cartItems.length)
                return axios.get("http://localhost:2000/api/payment_options/")
            })
            .then(response => {
                this.setState({
                    pays: response.data.map(pay => pay.name)
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    CartList() {
        return Object.entries(this.state.cart).map(currentcart => {
            return (<tr>
                <td>{currentcart[1].product_name}</td>
                <td>{currentcart[1].quantity}</td>
                <td>{currentcart[1].price}</td>
            </tr>
            )
        })
    }

    Checkout() {
        Object.entries(this.state.cart).map(currentcart => {
            axios.post("http://localhost:2000/api//order/create/",
                {
                    "seller": currentcart[1].seller,
                    "product": currentcart[1].product,
                    "quantity": currentcart[1].quantity,
                    "price": currentcart[1].price,
                    "product_name": currentcart[1].product_name,
                    "payment": this.state.payCategory
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                    }
                })
                .then(response => {
                    window.alert("Order Created Successfully");
                    return axios.delete("http://localhost:2000/api/retailer/cart/" + this.state.cart_details[0]._id,
                        {
                            headers: {
                                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                            }
                        })
                })
                .then(response => {
                    this.setState({
                        cart: []
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        })

    }
    render() {
        return (
            <div>
                <Layout /><br /><br /><br /><br />
                <Jumbotron style={{ backgroundColor: "white", margin: "50px" }}>
                    <Table hover variant="grey" style={{ marginTop: "50px", marginBottom: "100px" }}>
                        <thead class="thead">
                            <tr>
                                <th>
                                    Product Name
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            {this.CartList()}
                        </tbody>
                    </Table>
                    <Table>
                        <tr>
                            <td>
                                <label>Select a Payment Type: </label>
                            </td>
                            <td>
                                <select ref="userInput"
                                    style={{ width: "250px" }}
                                    required
                                    disabled
                                    maxlength="40"
                                    minlength="3"
                                    className="form-control"
                                    value={this.state.payCategory}
                                    onChange={this.onChangepayCategory}>
                                    {
                                        this.state.pays.map(function (pay) {
                                            return <option
                                                key={pay}
                                                value={pay}>{pay}
                                            </option>;
                                        })
                                    }
                                </select></td></tr>
                             </Table>
                            <button className="check" onClick={this.Checkout}>Checkout</button>
                </Jumbotron>
                        <FooterPage></FooterPage>
            </div>
        )
    }

}

export default Cart