import React, { useEffect }  from 'react'
import HomePage from './container/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn} from './actions/auth.actions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signout } from '../src/actions/auth.actions';
import ParentCategory from '../src/container/ParentCategory';
import Product_Display from './container/Product_Display';
import Cart from './container/Cart';
import Order from './container/Order';

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
      </Switch>
    </div>
  );
  
}


export default App;