import React from 'react';

import './styles.css';

function Page({ children }) {
  return (
    <div className="page">
      {children}
    </div>
  );
}

export default Page;