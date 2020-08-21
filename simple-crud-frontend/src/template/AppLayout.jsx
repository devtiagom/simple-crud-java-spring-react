import React, { useState } from 'react';

import Header from './header';
import SideBar from './side-bar';
import Main from './main';

import Show from '../components/show';

function AppLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Show condition={showSideBar}>
        <SideBar />
      </Show>
      <Main showSideBar={showSideBar}>
        {React.cloneElement(children, { showSideBar })}
      </Main>
    </>
  );
}

export default AppLayout;