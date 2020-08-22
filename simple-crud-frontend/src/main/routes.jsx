import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Products from '../pages/products';
import Categories from '../pages/categories';

export default ({ showSideBar }) => (
  <Switch>
    <Route path="/products" render={() => <Products showSideBar={showSideBar} />} />
    <Route path="/categories" render={() => <Categories showSideBar={showSideBar} />} />
    <Redirect from="*" to="/products" />
  </Switch>
);