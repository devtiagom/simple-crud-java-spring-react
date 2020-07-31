import React from 'react';
import { FaShoppingCart, FaList } from 'react-icons/fa';

import './styles.css';
import MenuList from '../../components/side-bar-menu/menu-list';
import MenuItem from '../../components/side-bar-menu/menu-item';

function SideBar() {
  return (
    <aside className="app-side-bar">
      <MenuList>
        <MenuItem icon={FaShoppingCart} path="/products" text="Produtos" />
        <MenuItem icon={FaList} path="/categories" text="Categorias" />
      </MenuList>
    </aside>
  );
}

export default SideBar;
