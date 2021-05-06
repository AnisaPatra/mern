import React, { Component } from 'react'
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
import { NavLink, Link, Redirect } from 'react-router-dom';
import './style.css';
import { MDBInput } from "mdbreact";
import axios from 'axios';
/**
* @author
* @function Signin
**/

export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangevalue = this.onChangevalue.bind(this);
        this.onSubmitSignup = this.onSubmitSignup.bind(this);
        this.onSubmitSigin = this.onSubmitSigin.bind(this);
        this.state = {
            name: '',
            email: '',
            shop_name: '',
            gstin: '',
            contactNumber: '',
            role: 'Retailer',
            password: '',
            address: '',
            users: [],
            auth: false
        }
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangevalue(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmitSignup(e) {
        e.preventDefault();
        axios.post('http://localhost:2000/api/signup', {
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            password: this.state.password,
            gstin: this.state.gstin,
            email: this.state.email,
            shop_name: this.state.shop_name,
            role: this.state.role,
            address: this.state.address
        })
            .then(
                response => {
                    const { token, user } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState({ users: response.data });
                    window.alert("Account Created");
                    this.setState({ auth: true });
                }
            )
            .catch(err => window.alert(err));

        this.setState({
            name: '',
            email: '',
            shop_name: '',
            gstin: '',
            contactNumber: '',
            role: 'Retailer',
            password: '',
            address: '',
            users: []

        })
    }

onSubmitSigin(e) {
    e.preventDefault();
    axios.post('http://localhost:2000/api/retailer/signin', {
        password: this.state.password,
        email: this.state.email,
        role: "Retailer"
    })
        .then(
            response => {
                const { token, user } = response.data;
                if (localStorage.length == 0) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                }

                this.setState({ users: response.data });
                this.setState({ auth: true });
            }

        )
        .catch(err => window.alert("Invalid Password / EmailId"));
}


render() {

    if (this.state.auth) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <div class="topnav">
                <nav className="navbar navbar-expand-md dodShadow fixed-top" style={{ backgroundColor: "#d9d9d9" }} >
                    <Link to="/" className="navbar-brand"><h2 style={{ color: "#009933", fontSize: "40px", fontWeight: "bolder", paddingLeft: "650px" }}>VRIDHI</h2></Link>
                </nav>
            </div>
            <center>
                <Jumbotron style={{ backgroundColor: '#d9d9d9', height: '40%', width: '40%', marginTop: '120px' }}>
                    <Tabs style={{ width: "50%" }} class="nav nav-tabs nav-justified">
                        <Tab eventKey="signin" title="Signin" >
                            <Form style={{ paddingTop: "20px" }} onSubmit={this.onSubmitSigin} >
                                <table cellPadding="30" cellSpacing="25" >
                                    <tbody class="tbody">
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Email</label>
                                            </td>
                                            <td>
                                                <td class="input">
                                                    <MDBInput type="email"
                                                        required
                                                        hint="Email"
                                                        value={this.state.email}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                        name="email"
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Password</label>
                                            </td>
                                            <td>
                                                <td class="input">
                                                    <MDBInput type="password"
                                                        required
                                                        maxlength="20"
                                                        minlength="6"
                                                        hint="Password"
                                                        value={this.state.password}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                        name="password"
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td colSpan="1">
                                                <Button type="submit" variant="info" style={{ width: "130px", color: "white", fontWeight: "bolder" }}>Sign In</Button>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td colspan="1">
                                                <a href="http://localhost:5000/signin">
                                                    Sign In as a Seller
                                                    </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Form>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Form style={{ paddingTop: "20px" }} onSubmit={this.onSubmitSignup}>
                                <table cellPadding="30" cellSpacing="25">
                                    <tbody class="tbody">
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Name</label>
                                            </td>
                                            <td style={{ paddingTop: "50px" }}>
                                                <MDBInput
                                                    type="text"
                                                    required
                                                    maxlength="20"
                                                    minlength="3"
                                                    hint="Name"
                                                    value={this.state.name}
                                                    onChange={this.onChangename}
                                                    style={{ width: "250px" }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Email</label>
                                            </td>
                                            <td>
                                                <td class="input">
                                                    <MDBInput
                                                        pattern="^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                                        required
                                                        hint="Email"
                                                        value={this.state.email}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                        name="email"
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Password</label>
                                            </td>
                                            <td>
                                                <td class="input">
                                                    <MDBInput type="password"
                                                        required
                                                        name="password"
                                                        maxlength="20"
                                                        minlength="6"
                                                        hint="Password" value={this.state.password}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Contact Number</label>
                                            </td>
                                            <td class="input">
                                                <MDBInput
                                                    type="text"
                                                    hint="Contact Number"
                                                    required
                                                    pattern="^[789]\d{9}$"
                                                    value={this.state.contactNumber}
                                                    onChange={this.onChangevalue}
                                                    style={{ width: "250px" }}
                                                    name="contactNumber"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>GSTIN</label>
                                            </td>
                                            <td class="input">
                                                <MDBInput
                                                    type="text"
                                                    required
                                                    pattern="^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
                                                    hint="GSTIN"
                                                    value={this.state.gstin}
                                                    onChange={this.onChangevalue}
                                                    autofocus="false"
                                                    style={{ width: "250px" }}
                                                    name="gstin"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Shop Name</label>
                                            </td>
                                            <td>
                                                <td class="input">
                                                    <MDBInput
                                                        type="text"
                                                        required
                                                        maxlength="50"
                                                        minlength="3"
                                                        hint="Shop Name"
                                                        value={this.state.shop_name}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                        name="shop_name"
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Address: </label>
                                            </td>
                                            <td>
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    required
                                                    maxlength="100000"
                                                    value={this.state.address}
                                                    onChange={this.onChangevalue}
                                                    name="address"
                                                    style={{ width: "250px" }}
                                                    name="address"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{ fontWeight: 'bold', color: "#333333" }}>Role</label>
                                            </td>
                                            <td class="input">
                                                <select ref="userInput"
                                                    required
                                                    name="role"
                                                    style={{ width: "250px", height: "40px", borderRadius: "4px", borderColor: "#d9d9d9" }}
                                                    hint="Role"
                                                    value={this.state.role}
                                                    onChange={this.onChangevalue}>
                                                    <option>Retailer</option>
                                                    <option>Seller</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td colSpan="1">
                                                <Button type="submit" variant="info" style={{ width: "130px", color: "white", fontWeight: "bolder" }}>Register</Button>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </Form>
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </center>
        </div>
    )
}
}
