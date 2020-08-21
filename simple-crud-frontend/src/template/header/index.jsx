import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaBars, FaShoppingCart, FaList } from 'react-icons/fa';

import './styles.css';

function Header({ showSideBar, setShowSideBar }) {
  const productsMatch = useRouteMatch({ path: '/products', exact: true });
  const categoriesMatch = useRouteMatch({ path: '/categories', exact: true });

  return (
    <header className="app-header">
      <button
        type="button"
        className="app-bar-item"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <FaBars />
      </button>

      <h1 className="header-title">e-Commerce Admin</h1>

      <div className="header-links">
        <Link
          className={`app-bar-item ${productsMatch ? 'app-bar-item-active' : ''}`}
          to="/products"
        >
          <FaShoppingCart />
        </Link>

        <Link
          className={`app-bar-item ${categoriesMatch ? 'app-bar-item-active' : ''}`}
          to="/categories"
        >
          <FaList />
        </Link>
      </div>
    </header>
  );
}

export default Header;
