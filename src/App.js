import React from 'react';
import logo from './logo.svg';
import "./index.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeTwo from "./components/HomeTwo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoMAtch from "./pages/404";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={"/"} >
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={HomeTwo}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/home-two`}
            component={HomeTwo}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/about-us`}
            component={About}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/contact-us`}
            component={Contact}
          />


          <Route
            exact
            path={`${process.env.PUBLIC_URL}/*`}
            component={NoMAtch}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
