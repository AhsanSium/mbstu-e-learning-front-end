import logo from './logo.svg';
import "./index.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeTwo from "./components/HomeTwo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoMAtch from "./pages/404";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Login from "./auth/Login";
import Register from "./auth/Register";
import UserList from "./admin/showallusers";
import CreateUser from "./admin/createuser";
import EditUser from "./admin/edituser";
import ShowCategoryList from "./admin/ShowCategoryAdmin";
import ShowCourseList from "./admin/showCourseAdmin";
import EditCourseList from "./admin/editCourseAdmin";
import CreateCategoryAdmin from "./admin/createCategoryAdmin";
import EditCategoryList from "./admin/editCategoryAdmin";
import EnrollmentList from "./admin/showEnrollAdmin";
import Dashboard from "./admin/Dashboard";
import CreateEnrollAdmin from "./admin/createEnrollAdmin";
import Forgot from "./auth/Forgot";

import Services from "./service/Services";
import ServicesForInstructor from "./service/ServicesByInstructor";
import Servicesforstudent from "./service/ServiceforStudent"
import ServiceDetailsLeftSidebar from "./service/ServiceDetailsLeftSidebar";
import Projects from "./project/Projects";
import ProjectDetails from "./project/ProjectDetails";
import BlogLeftSidebar from "./blog/BlogLeftSidebar";
import AddCourse from "./blog/AddCourse";
import AddLecture from "./blog/Addlecture";
import BlogDetailsLeftSidebar from "./blog/BlogDetailsLeftSidebar";
import PageNotFound from "./pages/404";
import * as serviceWorker from "./serviceWorker";

import PrivateRoute from "./components/common/PrivateRoute";
//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

//profile stuff

import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profile from "./components/profile/Profile";
import FinalDashboard from "./components/FinalDashboard";
import FinalProfiles from "./components/FinalProfiles";

//check for token  to avoid state destroy on reload
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and export default
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  //we can call any action using below method
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "/";
  }
}



function App() {
  return (
    <div className="App">
      <Provider store={store}>

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
              path={`${process.env.PUBLIC_URL}/ShowCourseList`}
              component={ShowCourseList}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgot-password`}
              component={Forgot}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login/:role`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register/:role`}
              component={Register}
            />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/services`}
              component={Services}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/addcourse/:id`}
              component={AddCourse}
            />


            <Route
              exact
              path={`${process.env.PUBLIC_URL}/*`}
              component={NoMAtch}
            />

          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
