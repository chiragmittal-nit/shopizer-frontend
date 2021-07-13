import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import UserList from '../../components/user-list/UserList';
import AddProduct from './../../components/add-product/AddProduct';
import ProductList from '../../components/product-list/ProductList';
import UpdateProduct from '../../components/update-product/UpdateProduct';
import AllOrdersList from './../all-order-list/AllOrdersList';

function AdminPage() {
  return (
    <div>
      <h2 className="m-2">Admin Panel</h2>
      <div className="row justify-content-center mt-3">
        <div className="col-md-10">
          <ul
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: 'aquamarine',
            }}
          >
            <li
              style={{
                listStyle: 'none',
                marginLeft: '45px',
                padding: '5px',
              }}
            >
              <Link
                to="/admin/user-list"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                Users
              </Link>
            </li>
            <li
              style={{
                listStyle: 'none',
                marginLeft: '45px',
                padding: '5px',
              }}
            >
              <Link
                to="/admin/product-list"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                ProductList
              </Link>
            </li>
            <li
              style={{
                listStyle: 'none',
                marginLeft: '45px',
                padding: '5px',
              }}
            >
              <Link
                to="/admin/add-product"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                Add New Product
              </Link>
            </li>
            <li
              style={{
                listStyle: 'none',
                marginLeft: '45px',
                padding: '5px',
              }}
            >
              <Link
                to="/admin/order-list"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                OrderList
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/admin/user-list" component={UserList} />
            <Route path="/admin/add-product" component={AddProduct} />
            <Route path="/admin/product-list" component={ProductList} />
            <Route path="/admin/order-list" component={AllOrdersList} />
            <Route path="/admin/update-product/:id" component={UpdateProduct} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
