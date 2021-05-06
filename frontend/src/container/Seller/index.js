import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Layout from '../../components/Layout';

export default class Seller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            shop_name: '',
            gstin: '',
            contactNumber: '',
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:2000/api/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name, email: response.data.email, shop_name: response.data.shop_name,
                    gstin: response.data.gstin, contactNumber: response.data.contactNumber
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(this.props.match.params.id);
            })
    }


    render() {
        return (
            <div>
                <Layout></Layout>
                <div className="flexible-content">
                    <main id="content" className="p-5" >
                        <Jumbotron style={{ backgroundColor: "white", margin: "50px" }}>
                                <center>
                                    <table cellPadding="10" cellSpacing="50" style={{}}>
                                        <br />
                                        <tbody class="profile">
                                            <tr>
                                                <td>
                                                    <label>Name: </label>
                                                </td>
                                                <td>
                                                    <p style={{ width: "250px" }}>{this.state.name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Email: </label>
                                                </td>
                                                <td>
                                                    <p style={{ width: "250px" }}>{this.state.email}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Shop Name: </label>
                                                </td>
                                                <td>
                                                    <p style={{ width: "250px" }}>{this.state.shop_name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>GSTIN: </label>
                                                </td>
                                                <td>
                                                    <p style={{ width: "250px" }}>{this.state.gstin}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Contact Number: </label>
                                                </td>
                                                <td>
                                                    <p style={{ width: "250px"}}>
                                                        {this.state.contactNumber}
                                                    </p>
                                                </td>
                                            </tr>
                                            <br /><br /><br />
                                            <tr aria-colspan="1">
                                                <td>
                                                    <Button variant="outline-secondary" class="btn" onClick={this.props.history.goBack}>Back</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            <br />
                        </Jumbotron>
                    </main>
                </div>
            </div >
        )
    }
}

