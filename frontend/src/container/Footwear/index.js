import React from 'react';
import Header from '../../components/Header';
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
import FooterPage from '../../components/Footer';
/**
* @author
* @function Footwear
**/

const Footwear = (props) => {
  return(
    <div>
      <Header></Header>
      <br/><br/>
      <img src="http://localhost:2000/public/WIF8qodDv_footwear.jpg" width="100%"/>
      <div>
        <h1>Hi</h1>
        <Tabs>
          <Tab eventKey="signin" title="Signin" >
            <div>H</div>
          </Tab>
          <Tab eventKey="register" title="Register">
            <div>R</div>
          </Tab>
        </Tabs>
      </div>
      <br/><br/>
      <FooterPage/>
    </div>
   )

 }

export default Footwear