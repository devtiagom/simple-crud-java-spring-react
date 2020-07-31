import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Products from '../pages/products';
import Categories from '../pages/categories';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/products" component={Products} />
      <Route path="/categories" component={Categories} />
      <Redirect from="*" to="/products" />
    </Switch>
  </BrowserRouter>
);