import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import NewDrivers from './pages/NewDrivers';
import NewDrivers1 from './pages/NewDrivers1';
import Drivers from './pages/Drivers';
import UpdateDrivers from './pages/UpdateDriver';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={NewDrivers} path="/newDrivers" />
      <Route component={NewDrivers1} path="/newDrivers1" />
      <Route component={Drivers} path="/drivers" />
      <Route component={UpdateDrivers} path="/update" />
    </BrowserRouter>
  );
}

export default Routes;