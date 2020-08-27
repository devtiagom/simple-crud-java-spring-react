import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaShoppingCart, FaList } from 'react-icons/fa';

import './styles.css';
import Show from '../../components/show';

function SideBar({ showSideBar }) {
  const [showMenuList, setShowMenuList] = useState(false);

  useEffect(() => {
    if (showSideBar) setTimeout(() => setShowMenuList(true), 300);
    else setShowMenuList(false);
  }, [showSideBar]);

  const productsMatch = useRouteMatch({ path: '/products', exact: true });
  const categoriesMatch = useRouteMatch({ path: '/categories', exact: true });

  return (
    <aside className={`app-side-bar ${showSideBar ? 'side-bar-on' : 'side-bar-off'}`}>
      <Show condition={showMenuList}>
        <div className="menu-list">
          <Link
            className={`menu-item ${productsMatch ? 'menu-item-active' : ''}`}
            to="/products"
          >
            <FaShoppingCart />
            <span className="ml-3">Produtos</span>
          </Link>

          <Link
            className={`menu-item ${categoriesMatch ? 'menu-item-active' : ''}`}
            to="/categories"
          >
            <FaList />
            <span className="ml-3">Categorias</span>
          </Link>
        </div>
      </Show>
    </aside>
  );
}

export default SideBar;
