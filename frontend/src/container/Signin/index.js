import React, { Component } from 'react'
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
import { NavLink, Link ,Redirect} from 'react-router-dom';
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
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeshop_name = this.onChangeshop_name.bind(this);
        this.onChangegstin = this.onChangegstin.bind(this);
        this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
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
            users: [],
            auth:false
        }
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeshop_name(e) {
        this.setState({
            shop_name: e.target.value
        })
    }

    onChangegstin(e) {
        this.setState({
            gstin: e.target.value
        })
    }

    onChangecontactNumber(e) {
        this.setState({
            contactNumber: e.target.value
        })
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangerole(e) {
        this.setState({
            role: e.target.value
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
            role: this.state.role
        })
            .then(
                response => {
                    const { token, user } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState({ users: response.data });
                    window.alert("Account Created");
                    this.setState({auth:true});
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
            users: []

        })
        if (window.localStorage.getItem("token") != null) {
            <Redirect to={`/`} />
        }
    }

    onSubmitSigin(e){
        e.preventDefault();
        if (this.state.role === "Retailer" && this.state.email != '' && this.state.password != '') {
            axios.post('http://localhost:2000/api/retailer/signin', {
            password: this.state.password,
            email: this.state.email,
            role: this.state.role
        })
            .then(
                response => {
                    const { token, user } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState({ users: response.data });
                    this.setState({auth:true});
                    
                }
            )
            .catch(err => window.alert("Invalid Password / EmailId"));
        } else {
            axios.post('http://localhost:2000/api/seller/signin', {
                password: this.state.password,
                email: this.state.email,
                role: this.state.role
            })
                .then(
                    response => {
                        const { token, user } = response.data;
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                        this.setState({ users: response.data });
                        window.alert("Account Created");
                    }
                )
                .catch(err => window.alert("Invalid Password / EmailId"));
        }
        this.setState({
            name: '',
            email: '',
            shop_name: '',
            gstin: '',
            contactNumber: '',
            role: 'Retailer',
            password: '',
            users: []

        })
    }

    render() {
        
        if(this.state.auth) {
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
                        <Tabs style={{width :"50%"}} class="nav nav-tabs nav-justified">
                            <Tab eventKey="signin" title="Signin" >
                                <Form style={{ paddingTop: "20px" }} onSubmit={this.onSubmitSigin} >
                                    <table cellPadding="30" cellSpacing="25" >
                                        <tbody class="tbody">
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333" }}>Email</label>
                                                </td>
                                                <td>
                                                    <td class="input">
                                                        <MDBInput type="email"
                                                            required
                                                            hint="Email"
                                                            value={this.state.email}
                                                            onChange={this.onChangeemail}
                                                            style={{ width: "250px" }}
                                                        />
                                                    </td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>Password</label>
                                                </td>
                                                <td>
                                                    <td class="input">
                                                        <MDBInput type="password"
                                                            required
                                                            maxlength="20"
                                                            minlength="6"
                                                            hint="Password" value={this.state.password}
                                                            onChange={this.onChangepassword}
                                                            style={{ width: "250px" }}
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
                                            <br/>
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
                                                    <label style={{ fontWeight: 'bold' ,color:"#333333" }}>Name</label>
                                                </td>
                                                <td style={{paddingTop:"50px"}}>
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
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>Email</label>
                                                </td>
                                                <td>
                                                    <td class="input">
                                                        <MDBInput type="email"
                                                            required
                                                            hint="Email"
                                                            value={this.state.email}
                                                            onChange={this.onChangeemail}
                                                            style={{ width: "250px" }}
                                                        />
                                                    </td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>Password</label>
                                                </td>
                                                <td>
                                                    <td class="input">
                                                        <MDBInput type="password"
                                                            required
                                                            maxlength="20"
                                                            minlength="6"
                                                            hint="Password" value={this.state.password}
                                                            onChange={this.onChangepassword}
                                                            style={{ width: "250px" }}
                                                        />
                                                    </td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>Contact Number</label>
                                                </td>
                                                <td class="input">
                                                    <MDBInput
                                                        type="text"
                                                        hint="Contact Number"
                                                        required
                                                        pattern="^[789]\d{9}$"
                                                        value={this.state.contactNumber}
                                                        onChange={this.onChangecontactNumber}
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>GSTIN</label>
                                                </td>
                                                <td class="input">
                                                    <MDBInput
                                                        type="text"
                                                        required
                                                        pattern="^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
                                                        hint="GSTIN"
                                                        value={this.state.gstin}
                                                        onChange={this.onChangegstin}
                                                        autofocus="false"
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold',color:"#333333"  }}>Shop Name</label>
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
                                                            onChange={this.onChangeshop_name}
                                                            style={{ width: "250px" }}
                                                        />
                                                    </td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontWeight: 'bold' ,color:"#333333" }}>Role</label>
                                                </td>
                                                <td class="input">
                                                    <select ref="userInput"
                                                        required
                                                        style={{ width: "250px", height: "40px", borderRadius: "4px", borderColor: "#d9d9d9" }}
                                                        hint="Role"
                                                        value={this.state.role}
                                                        onChange={this.onChangerole}>
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
