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
import Food from './container/Food';
import Clothing from './container/Clothing';
import Footwear from './container/Footwear';
import EA from './container/E&A';
import HK from './container/H&K';
import Product_Display from './container/Product_Display';

function App() {
  window.onunload = () => {
    // Clear the local storage
    window.localStorage.clear()
 }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/category/Food" component={Food} />
        <Route path="/category/Footwear" component={Footwear}/>
        <Route path="/category/EA" component={EA}/>
        <Route path="/category/HK" component={HK}/>
        <Route path="/category/Clothing" component={Clothing}/>
        <Route path="/signin" component={Signin} />
        <Route path="/product/:id" component={Product_Display} />

      </Switch>
    </div>
  );
  
}


export default App;