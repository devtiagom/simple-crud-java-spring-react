import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaList } from 'react-icons/fa';

import './styles.css';
import MenuList from '../../components/side-bar-menu/menu-list';
import MenuItem from '../../components/side-bar-menu/menu-item';

import Show from '../../components/show';

function SideBar({ showSideBar }) {
  const [showMenuList, setShowMenuList] = useState(false);

  useEffect(() => {
    if (showSideBar) setTimeout(() => setShowMenuList(true), 300);
    else setShowMenuList(false);
  }, [showSideBar]);

  return (
    <aside className={`app-side-bar ${showSideBar ? 'side-bar-on' : 'side-bar-off'}`}>
      <Show condition={showMenuList}>
        <MenuList>
          <MenuItem icon={FaShoppingCart} path="/products" text="Produtos" />
          <MenuItem icon={FaList} path="/categories" text="Categorias" />
        </MenuList>
      </Show>
    </aside>
  );
}

export default SideBar;
