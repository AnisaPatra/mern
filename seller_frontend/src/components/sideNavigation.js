import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => {
    return (
        <div className="sidebar-fixed position-absolute">
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="home" className="mr-3" size="lg"/>
                        Home
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/products" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon fab icon="buromobelexperte" className="mr-3" size="lg"/>
                        Products
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/order" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon icon="shopping-cart" className="mr-3" size="lg"/>
                        Orders
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNavigation;