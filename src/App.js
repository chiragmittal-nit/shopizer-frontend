import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/Header';
import HomePage from './pages/home-page/HomePage';
import ProductDesc from './pages/product-desc/ProductDesc';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import OrdersList from './pages/orders-list/OrdersList';
import auth from './services/authService';
import { loginUserFromStorage } from './redux/slices/user';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import OrderInfo from './pages/order-info/OrderInfo';

import './App.css';

function App({ currUser, setCurrentUser }) {
  React.useEffect(() => {
    if (!currUser) {
      console.log('currUser : ', currUser);
      const user = auth.getCurrentUser();
      if (user) setCurrentUser(user);
    }
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/product/:id" component={ProductDesc} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/my-orders" component={OrdersList} />
        <ProtectedRoute path="/check-out" component={CheckoutPage} />
        <ProtectedRoute path="/order-info/:orderId" component={OrderInfo} />
        <Route path="/" exact component={HomePage} />
        <ProtectedRoute path="/me" component={ProfilePage} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}
const mapStateToProps = (state) => ({ currUser: state.user.currentUser });
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => loginUserFromStorage(user),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
