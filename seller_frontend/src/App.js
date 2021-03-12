import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Payment from './container/Payment';
import Languages from './container/Languages';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn} from './actions/auth.actions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Products from './container/Products';
import { signout } from '../src/actions/auth.actions';
import AddProducts from './container/Products/AddProducts';
import EditProduct from './container/Products/EditProduct';
import EditPaymentOption from './container/Payment/Edit PaymentOption';
import AddPaymentOption from './container/Payment/Add PaymentOption';

function App() {

  window.onunload = () => {
    // Clear the local storage
    window.localStorage.clear()
 }
 
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const logout = () => {
    dispatch(signout());
  }

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }


  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute path="/product_edit/:id" component={EditProduct} />
        <PrivateRoute exact path="/payment_integerations" component={Payment} />
        <PrivateRoute exact path="/languages" component={Languages} />
        <PrivateRoute exact path='/products/add' component={AddProducts} />
        <PrivateRoute exact path = '/payment_integerations/add/' component={AddPaymentOption} />
        <PrivateRoute exact path = '/payment_integerations/edit/:id' component={EditPaymentOption}/>
        <Route path="/signin" component={Signin} />

      </Switch>
    </div>
  );
}

export default App;

