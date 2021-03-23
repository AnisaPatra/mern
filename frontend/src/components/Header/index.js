import './style.css';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import order from './order.png';
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
    this.goo = this.goo.bind(this);
    this.state = {
      categories: [],
      subcategories: []
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
      console.log(currentcategory.name);
      return <ParentCategory category={currentcategory} key={currentcategory._id} />;
      if(currentcategory.name == "Food" || currentcategory.name == "Home and Kitchen" || currentcategory.name == "Clothing"){
        return <ParentCategory category={currentcategory} key={currentcategory._id} />;
      }
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

              {/*<MDBCol md="3">
                <MDBFormInline className="md-form">
                  <input className="form-control form-control-sm ml-3 w-85" type="text" placeholder="Search" aria-label="Search" />
                  <button><MDBIcon icon="search" /></button>
                </MDBFormInline>
              </MDBCol>*/}
              <ul className="navbar-nav ml-auto nav-flex-icons">
                <li className="nav-item">
                  <a className="nav-link waves-effect waves-light">
                    {(() => {
                      if (window.localStorage.getItem('token') === null) {
                        return (
                          <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                            <MDBIcon icon="shopping-cart" size="lg" style={{ color: "black" }} />
                          </OverlayTrigger>
                        )
                      }
                      return (
                          <NavLink to={ "/cart/"+window.localStorage.user.substr(8,24)} className="nav-link waves-effect waves-light">
                            <MDBIcon icon="shopping-cart" size="lg" style={{ color: "black" }} />
                          </NavLink>
                      );
                    })()}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link waves-effect waves-light">
                    {(() => {
                      if (window.localStorage.getItem('token') === null) {
                        return (
                          <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                            <img src={order}/>
                          </OverlayTrigger>
                        )
                      }
                      return (
                          <NavLink to={ "/order/"+window.localStorage.user.substr(8,24)} className="nav-link waves-effect waves-light">
                            <img src={order}/>
                          </NavLink>
                      );
                    })()}
                  </a>
                </li>
                <li className="nav-item" style={{}}>
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
                      <OverlayTrigger trigger="hover" placement="bottom" overlay={popover_signout}>
                        <NavLink to="/signin" onClick={this.signout} className="nav-link waves-effect waves-light">
                          <MDBIcon icon="user-circle" size="lg" style={{ color: "black" }} data-toggle="modal" data-target="#modalLoginRegister" />
                        </NavLink>
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
