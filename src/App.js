import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import ProductDesc from "./pages/product-desc/ProductDesc";

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/product/:id' component={ProductDesc} />
        <Route path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
