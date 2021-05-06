import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Jumbotron } from 'react-bootstrap';
import { MDBInput } from "mdbreact";
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import './style.css';

export default class Edit_Profile extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangevalue = this.onChangevalue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            shop_name: '',
            gstin: '',
            contactNumber: '',
            password: '',
            role: '',
            address:'',
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:2000/api/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name, email: response.data.email, shop_name: response.data.shop_name,
                    gstin: response.data.gstin, contactNumber: response.data.contactNumber, 
                    address: response.data.address, role: response.data.role
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(this.props.match.params.id);
            })
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

    onSubmit(e) {
        e.preventDefault();
        var patharray = window.location.pathname.split('/');
        console.log(patharray[2]);
        axios.put('http://localhost:2000/api/retailers/update/' + patharray[2], {
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            gstin: this.state.gstin,
            email: this.state.email,
            shop_name: this.state.shop_name,
            password: this.state.password,
            address:this.state.address
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(
                response => {
                    this.setState({ users: response.data });
                }
            );

        window.alert("User details Updated Successfully");
    }

    render() {
        return (
            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <main id="content" className="p-5" >
                        <Jumbotron style={{ backgroundColor: "white", margin: "50px" }}>
                            <form onSubmit={this.onSubmit}>
                                <center>
                                    <table cellPadding="10" cellSpacing="50" style={{}}>
                                        <br />
                                        <tbody class="profile">
                                        <tr>
                                                <td>
                                                    <label>Name: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="text"
                                                        required
                                                        maxlength="20"
                                                        minlength="3"
                                                        value={this.state.name}
                                                        onChange={this.onChangename}
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Email: </label>
                                                </td>
                                                <td>
                                                    <MDBInput type="email"
                                                        pattern="^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                                        required
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Shop Name: </label>
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        type="text"
                                                        required
                                                        maxlength="50"
                                                        minlength="3"
                                                        name="shop_name"
                                                        value={this.state.shop_name}
                                                        onChange={this.onChangevalue}
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>GSTIN: </label>
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        type="text"
                                                        required
                                                        pattern="^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
                                                        value={this.state.gstin}
                                                        name="gstin"
                                                        onChange={this.onChangevalue}
                                                        autofocus="false"
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Contact Number: </label>
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        type="text"
                                                        required
                                                        pattern="^[789]\d{9}$"
                                                        value={this.state.contactNumber}
                                                        onChange={this.onChangevalue}
                                                        name="contactNumber"
                                                        style={{ width: "250px" }}
                                                    />
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
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>New Password: </label><br />
                                                    <label style={{ fontSize: "13px" }}>(Please fill this only if you want to change your password)</label>
                                                </td>
                                                <td>
                                                    <MDBInput
                                                        type="text"
                                                        minlength="6"
                                                        maxlength="20"
                                                        value={this.state.password}
                                                        onChange={this.onChangevalue}
                                                        name="password"
                                                        style={{ width: "250px" }}
                                                    />
                                                </td>
                                            </tr>
                                            <br /><br /><br />
                                            <tr>
                                                <td>
                                                    <Link to="/"><Button variant="outline-secondary" class="btn">Back</Button></Link>
                                                </td>
                                                <td>
                                                    <Button type="submit" variant="outline-success" class="btn">Update</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </form>

                            <br />
                        </Jumbotron>
                    </main>
                </div>
            </div >
        )
    }
}

