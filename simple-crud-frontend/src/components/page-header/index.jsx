import React from 'react';

import './styles.css';

function PageHeader({ icon, title, showSideBar }) {
  const Icon = icon;

  return (
    <div className={`page-header ${showSideBar ? 'with-side-bar' : 'without-side-bar'}`}>
      <Icon className="page-icon" />
      <span className="page-title">{title}</span>
    </div>
  );
}

export default PageHeader;