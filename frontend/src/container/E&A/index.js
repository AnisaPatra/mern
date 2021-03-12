import React from 'react';
import Header from '../../components/Header';
import { Tab, Tabs, Jumbotron, Form, Button } from 'react-bootstrap';
/**
* @author
* @function EA
**/

const EA = (props) => {
  return(
    <div>
      <Header></Header>
      <br/><br/>
      <img src="http://localhost:2000/public/WdogD21vk-electronics.jpg" width="100%"/>
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
    </div>
   )

 }

export default EA