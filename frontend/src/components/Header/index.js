import './style.css';
import { MDBBadge, MDBIcon } from "mdbreact";
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
/**
* @author
* @function Header
**/

const popover = (
  <Popover id="popover-basic" style={{ backgroundColor: "#f2f2f2" }}>
    <Popover.Content>
      <center>
        <Button variant="outline-success btn-rounded" style={{ fontSize: "17px" }}><b>SIGN IN</b></Button></center>
      <p>To add or view parts of your cart</p>
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
    this.goo = this.goo.bind(this);
    this.state = {
      categories: [],
      subcategories: [],
      cart_items:null
    };
  }


  componentDidMount() {
    axios.get('http://localhost:2000/api/category/parentCategory')
      .then(response => {
        this.setState({ categories: response.data });
        return axios.get("http://localhost:2000/api/retailer/cart/" + window.localStorage.user.substr(8, 24),
          {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
          })
      })
      .then(response => {
        this.setState({
          cart_items: response.data[0].cartItems.length
        })
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

  signout() {
    axios.post('http://localhost:2000/api/users/signout')
      .then(
        res => {
          console.log("Logged Out");
          window.localStorage.clear()
        }
      )
      .catch((error) => {
        console.log(error);
      })
  }


  go(e) {
    var mli = Object.entries(e.nativeEvent.explicitOriginalTarget);
    var k = Object.entries(mli)[0][1][1]._debugOwner.key;
    window.location.href = "/category/" + k;

  }

  goo(e) {
    var a = null;
    var x = [];
    axios.get('http://localhost:2000/api//category/getcategory?parentCategory=' + e.nativeEvent.explicitOriginalTarget.innerHTML)
      .then(
        res => {
          a = res.data.retailing;
          a.forEach(function (arrayItem) {
            x.push(arrayItem.name);
          });
          this.setState({ subcategories: x });
        }
      )
      .catch((error) => {
        console.log(error);
      })
  }

  subList() {
    return this.state.subcategories.map((numbers) =>
      <a>{numbers}</a>
    )
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
                <div class="dropdown" onMouseOver={this.goo}>
                  {this.categoryList()}
                  <div class="dropdown-content">
                    {this.subList()}
                  </div>
                </div>
              </ul>
              {/*<div className="search">
                <input type="text" placeholder="Search Products" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} style={{ border: "none", width: "70%" }} />
                <Link to={{
                  pathname: '/search_results',
                  state: this.state.search
                }} style={{ border: "none", backgroundColor: "white" }}>
                  <MDBIcon icon="search" />
                </Link>
              </div>*/}
              <ul className="navbar-nav ml-auto nav-flex-icons">
                <li className="nav-item">
                  <a className="nav-link waves-effect waves-light">
                    {(() => {
                      if (window.localStorage.getItem('token') === null) {
                        return (
                          <MDBIcon icon="shopping-cart" size="lg" style={{ color: "black" }} />
                        )
                      }
                      return (
                        <NavLink to={"/cart/" + window.localStorage.user.substr(8, 24)} className="nav-link waves-effect waves-light">
                          <MDBIcon icon="shopping-cart" size="lg" style={{ color: "black" }} />
                          <MDBBadge pill color="info" style={{top:"10px"}}>{this.state.cart_items}</MDBBadge>
                        </NavLink>
                      );
                    })()}
                  </a>
                </li>
                <li className="nav-item">
                  {(() => {
                    if (window.localStorage.getItem('token') === null) {
                      return (
                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                          <NavLink to="/signin" className="nav-link waves-effect waves-light">
                            <MDBIcon icon="user-circle" size="lg" style={{ color: "black" }} />
                          </NavLink>
                        </OverlayTrigger>
                      )
                    }
                    return (
                      <OverlayTrigger trigger="click" placement="bottom" overlay={
                        <Popover id="popover-basic" style={{ backgroundColor: "#f2f2f2" }}>
                          <Popover.Content >
                            <center>
                              <NavLink to={"/order/" + window.localStorage.user.substr(8, 24)} className="profile_navs">
                                Orders
                              </NavLink><br />
                              <NavLink to={"/account_edit/" + window.localStorage.user.substr(8, 24)} className="profile_navs">
                                Edit Profile
                              </NavLink><br />
                              <NavLink to={"/signin"} onClick={this.signout} className="profile_navs">
                                Sign Out
                              </NavLink>
                            </center>
                          </Popover.Content>
                        </Popover>
                      }>
                        <MDBIcon icon="user-circle" size="lg" style={{ color: "black", marginTop: "18px" }} data-toggle="modal" data-target="#modalLoginRegister" />
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
