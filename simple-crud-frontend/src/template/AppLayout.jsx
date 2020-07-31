import React from 'react';

import Header from './header';
import SideBar from './side-bar';
import Main from './main';

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <SideBar />
      <Main>{children}</Main>
    </>
  );
}

export default AppLayout;