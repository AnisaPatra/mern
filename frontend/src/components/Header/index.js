import React, { useState,useEffect } from 'react';
import './style.css';
import { MDBBtn, MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Popover, OverlayTrigger, Button ,DropdownButton, Dropdown} from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';
import { NavLink, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/**
* @author
* @function Header
**/

const popover = (
  <Popover id="popover-basic" style={{ backgroundColor: "#f2f2f2" }}>
    <Popover.Content>
      <center>
        <Button variant="outline-success btn-rounded"><b>SIGN IN</b></Button></center>
      <p>To add or view parts of your cart</p>
    </Popover.Content>
  </Popover>
);

const popover_signout = (
  <Popover id="popover-basic" style={{ backgroundColor: "#f2f2f2" }}>
    <Popover.Content>
      <center>
        <Button variant="outline-success btn-rounded"><b>SIGN OUT</b></Button></center>
      <p>To exit from your account please do Signout.</p>

    </Popover.Content>
  </Popover>
);

const ParentCategory = props => (
    <li className="catlist">
      {props.category.name}
    </li>
)
    




export default class Header extends Component {
      constructor(props) {
      super(props);
    this.state = {
      categories: []
    };
  }


  componentDidMount() {
      axios.get('http://localhost:2000/api/category/parentCategory')
        .then(response => {
          this.setState({ categories: response.data });
        })
        .catch((error) => {
          console.log(error);
        })
    }

  categoryList() {
    return this.state.categories.map(currentcategory => {
      return <ParentCategory category={currentcategory} key={currentcategory._id} />;
    })
  }

  signout(){
    axios.post('http://localhost:2000/api/users/signout')
    .then(
      res=>{
        console.log("Logged Out");
      }
    )
    .catch((error)=>{
      console.log(error);
    })
  }

  
  go(e){	
     var mli = Object.entries(e.nativeEvent.explicitOriginalTarget);
    var k = Object.entries(mli)[0][1][1]._debugOwner.key;
    console.log(k);
    if (e.nativeEvent.explicitOriginalTarget.innerHTML==="Food") {
      window.location.href="/category/Food";
    } 
    else if(e.nativeEvent.explicitOriginalTarget.innerHTML==="Footwear"){
      window.location.href="/category/Footwear";
    }
    
    else if(e.nativeEvent.explicitOriginalTarget.innerHTML==="Home and Kitchen"){
      window.location.href="/category/HK";
    }
    
    else if(e.nativeEvent.explicitOriginalTarget.innerHTML==="Electronics and Appliances"){
      window.location.href="/category/EA";
    }
    
    else if(e.nativeEvent.explicitOriginalTarget.innerHTML==="Clothing"){
      window.location.href="/category/Clothing";
    }
    else {
      return <Redirect to="/"/>
    }
  }

  render() {
    return (
    <div className="App">
      <div className="header-wrapper">
        <nav className="navbar navbar-expand-md dodShadow fixed-top">
          <a className="navbar-brand" href="/">
            <h2 style={{ color: "green", fontSize: "32px", fontWeight: "bolder" }}>VRIDHI</h2>
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav" style={{ marginInlineStart: "100px", marginInlineEnd: "90px" }} onClick={this.go}>
              {this.categoryList()}
            </ul>
    
            <MDBCol md="3">
              <MDBFormInline className="md-form">
                <input className="form-control form-control-sm ml-3 w-85" type="text" placeholder="Search" aria-label="Search" />
                <button><MDBIcon icon="search" /></button>
              </MDBFormInline>
            </MDBCol>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  <MDBIcon icon="shopping-cart" size="lg" style={{ color: "black" }} />
                </a>
              </li>
              <li className="nav-item">
                {(() => {
                  if (window.localStorage.getItem('token') === null) {
                    return (
                      <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                        <NavLink to="/signin" onClick={this.signout}className="nav-link waves-effect waves-light">
                          <MDBIcon icon="user-circle" size="lg" style={{ color: "black" }} />
                        </NavLink>
                      </OverlayTrigger>
                    )
                  }
                  return (
                    <OverlayTrigger trigger="hover" placement="bottom" overlay={popover_signout}>
                      <a className="nav-link waves-effect waves-light">
                        <MDBIcon icon="user-circle" size="lg" style={{ color: "black" }} data-toggle="modal" data-target="#modalLoginRegister" />
                      </a>
                    </OverlayTrigger>
                  );
                })()}

              </li>
            </ul>
          </div>
        </nav>
      </div>

    </div>
    )
  }
}
