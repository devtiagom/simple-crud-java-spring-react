import React from 'react';

import './styles.css';

function PageHeader({ icon, title }) {
  const Icon = icon;

  return (
    <div className="page-header">
      <Icon className="page-icon" />
      <span className="page-title">{title}</span>
    </div>
  );
}

export default PageHeader;