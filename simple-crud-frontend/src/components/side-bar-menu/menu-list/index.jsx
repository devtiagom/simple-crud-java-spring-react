import React from 'react';

import './styles.css';

function Menu({ children }) {
  return (
    <nav className="menu-nav">
      <ul className="menu-list">{children}</ul>
    </nav>
  );
}

export default Menu;