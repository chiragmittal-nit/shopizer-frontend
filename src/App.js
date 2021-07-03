import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/home-page/HomePage';
import ProductDesc from './pages/product-desc/ProductDesc';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';
// import auth from './services/authService';
// import { connect } from 'react-redux';
// import { loginUserFromStorage } from './redux/slices/user';

import './App.css';

export default function App({ currUser, setCurrentUser }) {
  // React.useEffect(() => {
  //   if (!currUser) {
  //     console.log('currUser : ', currUser);
  //     const user = auth.getCurrentUser();
  //     if (user) setCurrentUser(user);
  //   }
  // }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/check-out" component={CheckoutPage} />
        <Route path="/product/:id" component={ProductDesc} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
// const mapStateToProps = (state) => ({ currUser: state.user.currUser });
// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => loginUserFromStorage(user),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);
