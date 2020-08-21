import React from 'react';

import './styles.css';

function Main({ children, showSideBar }) {
  return (
    <main className={`app-main-area ${showSideBar ? 'main-with-side-bar' : 'main-without-side-bar'}`}>
      {children}
    </main>
  );
}

export default Main;
