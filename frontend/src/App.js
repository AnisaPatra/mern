import React  from 'react'
import HomePage from './container/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Signin from './container/Signin';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ParentCategory from '../src/container/ParentCategory';
import Product_Display from './container/Product_Display';
import Cart from './container/Cart';
import Order from './container/Order';
import Edit_Profile from './container/Profile';
import Seller from './container/Seller';
import EditOrder from './container/Order/edit';
import Search from './container/Search';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/category/:id" component={ParentCategory} />
        <Route path="/signin" component={Signin} />
        <Route path="/product/:id" component={Product_Display} />
        <Route path = "/cart/:id" component = {Cart}/>
        <Route path = "/order/:id" component = {Order}/>
        <Route path = "/order_edit/:id" component={EditOrder}/>
        <Route path = '/account_edit/:id' component={Edit_Profile} />
        <Route path = '/seller/:id' component={Seller} />
        <Route path = '/search_results' component={Search}/>
      </Switch>
    </div>
  );
  
}


export default App;