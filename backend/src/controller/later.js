import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';
import SideNavigation from '../../components/sideNavigation';
import './index.css';

export default class EditRetailers extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeShop_Name = this.onChangeShop_Name.bind(this);
    this.onChangeGstin = this.onChangeGstin.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
    axios.get('http://localhost:2000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          password: response.data.password,
          email: response.data.email,
          shop_name: response.data.shop_name,
          gstin: response.data.gstin,
          contactNumber: response.data.contactNumber
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:2000/retailers/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeShop_Name(e) {
    this.setState({
      shop_name: e.target.value
    })
  }

  onChangeGstin(e) {
    this.setState({
      gstin: e.target.value
    })
  }

  onChangeContactNumber(e) {
    this.setState({
      contactNumber: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const retailer = {
      name: this.data.name,
      password: this.data.password,
      email: this.data.email,
      shop_name: this.data.shop_name,
      gstin: this.data.gstin,
      contactNumber: this.data.contactNumber
    }

    console.log(retailer);

    axios.post('http://localhost:2000/retailers/update/' + this.props.match.params.id, retailer)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <Layout></Layout>
      <div className="flexible-content" style={{backgroundColor: "white"}}>
          <SideNavigation/>
          <main id="content" className="p-5" style={{height: "100%", marginLeft: "270px"}}>
            <Container style={{backgroundColor: "white"}}>
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold", textAlign: 'left', top: '50px'}}>
                Edit Accounts</h2>
      <form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select><br/>
          <label>Password: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
          <label>Shop Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.shop_name}
              onChange={this.onChangeShop_Name}
              />
          <label>GSTIN: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gstin}
              onChange={this.onChangeGstin}
              />
          <label>Contact Number: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.contactNumber}
              onChange={this.onChangeContactNumber}
              />
          <input type="submit" value="Edit Retailer" className="btn btn-primary" />
      </form>
      </Container>
      </main>
      </div>
    </div>
    )
  }
}