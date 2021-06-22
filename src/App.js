import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/home-page/HomePage';
import ProductDesc from './pages/product-desc/ProductDesc';
import CheckoutPage from './pages/checkout-page/CheckoutPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/check-out' component={CheckoutPage} />
        <Route path='/product/:id' component={ProductDesc} />
        <Route path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
