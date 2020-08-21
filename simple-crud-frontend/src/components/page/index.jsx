import React from 'react';

import './styles.css';

function Page({ children, showSideBar }) {
  return (
    <div className="page">
      {React.Children.map(children, child => {
        return React.cloneElement(child, { showSideBar })
      })}
    </div>
  );
}

export default Page;