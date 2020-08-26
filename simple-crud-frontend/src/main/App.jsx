import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/alert';

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from '../template/header';
import SideBar from '../template/side-bar';
import Main from '../template/main';


function App() {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <BrowserRouter>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <SideBar showSideBar={showSideBar} />
      <Main showSideBar={showSideBar}>
        <Routes showSideBar={showSideBar} />
      </Main>
    </BrowserRouter>
  );
}

export default App;
