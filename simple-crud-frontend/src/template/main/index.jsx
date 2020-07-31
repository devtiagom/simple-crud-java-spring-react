import React from 'react';

import './styles.css';

function Main({children}) {
  return (
    <main className="app-main-area">{children}</main>
  );
}

export default Main;
