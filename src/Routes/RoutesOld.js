import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Newsfeed from "./Home/Newsfeed";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Profile from "./User/Profile";
import EditProfile from "./User/EditProfile";
import Deposit from "./Commerce/Deposit/Deposit";
import Transactions from "./Finances/Transactions/Transactions";
import Orders from "./Finances/Orders/Orders";
import Messages from "./Messages/Messages";
import ConversationsBody from "./Messages/ConversationsBody";
import Courses from "./Courses/Courses";
import CourseSingle from "./Courses/CourseSingle";
import LessonOverview from "./Admissions/LessonOverview";
import Admissions from "./Admissions/Admissions";
import AllNotifications from "./Notifications/AllNotifications";


function Routes() {

  return (
    <Switch>
      <Route exact path="/">
        <Newsfeed />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/user/:id">
        <Profile />
      </Route>
      <Route exact path="/admissions">
        <Admissions />
      </Route>
      <Route exact path="/admissions/lessons/:id">
        <LessonOverview />
      </Route>
      <Route exact path="/messages">
        <Messages />
      </Route>
      <Route exact path="/notifications">
        <AllNotifications />
      </Route>
      <Route exact path="/messages/inbox/conversations/:id">
        <ConversationsBody />
      </Route>

      <Route exact path="/user/:id/edit">
        <EditProfile />
      </Route>
      <Route exact path="/financial/balance/deposit">
        <Deposit />
      </Route>
      <Route exact path="/financial/transactions">
        <Transactions />
      </Route>
      <Route exact path="/orders">
        <Orders />
      </Route>

      <Route exact path="/courses">
        <Courses />
      </Route>

      <Route exact path="/courses/overview/:uuId">
        <CourseSingle />
      </Route>
    </Switch>
  );
}

export default Routes;
