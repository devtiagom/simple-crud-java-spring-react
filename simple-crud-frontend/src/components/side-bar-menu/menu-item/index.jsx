import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import './styles.css';

function Item({ icon, path, text }) {
  const Icon = icon;

  const match = useRouteMatch({
    path: path,
    exact: true
  });

  return (
    <li className="menu-item">
      <Link className={`menu-item-link ${match ? 'active' : ''}`} to={path}>
        <span className="menu-item-icon"><Icon /></span>
        <span className="menu-item-text">{text}</span>
      </Link>
    </li>
  );
}

export default Item;