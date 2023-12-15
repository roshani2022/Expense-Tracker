import React from "react";
import { Route, BrowserRouter,Switch } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login/Login";
import Welcome from "./Component/Pages/Welcome";
import Root from "./Component/Layout/Root";
import Home from "./Component/Pages/Home";
import ProfilePage from "./Component/Pages/ProfilePage";
import ForgotPassWord from "./Component/Pages/ForgotPassWord";

function App() {
  return (
    <BrowserRouter>
      <Root>
       <Switch>
       <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/Login'>
          <Login/>
        </Route>
        <Route path='/Welcome'>
          <Welcome/>
        </Route>
        <Route path='/ProfilePage'>
          <ProfilePage/>
        </Route>
        <Route path='/ForgotPassWord'>
         <ForgotPassWord/>
        </Route>
       </Switch>
      </Root>
    </BrowserRouter>
  );
}

export default App;
