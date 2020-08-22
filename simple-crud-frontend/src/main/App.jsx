import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/alert';

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../template/header';
import SideBar from '../template/side-bar';
import Main from '../template/main';

import Routes from './routes';
import Show from '../components/show';

function App() {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <BrowserRouter>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      {/* <Show condition={showSideBar}> */}
        <SideBar showSideBar={showSideBar} />
      {/* </Show> */}
      <Main showSideBar={showSideBar}>
        <Routes showSideBar={showSideBar} />
      </Main>
    </BrowserRouter>
  );
}

export default App;
