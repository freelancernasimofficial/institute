import React from "react";
import Newsfeed from "./Routes/Home/Newsfeed";
import Login from "./Routes/Authentication/Login";
import Register from "./Routes/Authentication/Register";
import Profile from "./Routes/User/Profile";
import EditProfile from "./Routes/User/EditProfile";
import Deposit from "./Routes/Commerce/Deposit/Deposit";
import Transactions from "./Routes/Finances/Transactions/Transactions";
import Orders from "./Routes/Finances/Orders/Orders";
import Messages from "./Routes/Messages/Messages";
import ConversationsBody from "./Routes/Messages/ConversationsBody";
import Courses from "./Routes/Courses/Courses";
import CourseSingle from "./Routes/Courses/CourseSingle";
import LessonOverview from "./Routes/Admissions/LessonOverview";
import Admissions from "./Routes/Admissions/Admissions";
import AllNotifications from "./Routes/Notifications/AllNotifications";
import Success from "./Routes/Commerce/Checkout/Success";
import Failed from "./Routes/Commerce/Checkout/Failed";
import Cancel from "./Routes/Commerce/Checkout/Cancel";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthContext from "./Contexts/AuthContext";
import MessengerProvider from "./Contexts/MessengerProvider";
import Layout from "./Components/Layout/Layout";
import SocketProvider from "./Contexts/Socket";
import DarkTheme from "./Components/Themes/DarkTheme";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          {/*=========== PUBLIC ROUTES ========== */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {/*=========== PUBLIC ROUTES ========== */}

          {/*=========== PRIVATE ROUTES ========== */}
          <AuthContext>
            <SocketProvider>
              <MessengerProvider>
                <Layout>
                  <Route exact path="/">
                    <Newsfeed />
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

                  {/* //GATEWAY PAGE URLS */}

                  <Route exact path="/gateway/payment/success">
                    <Success />
                  </Route>
                  <Route exact path="/gateway/payment/failed">
                    <Failed />
                  </Route>
                  <Route exact path="/gateway/payment/cancel">
                    <Cancel />
                  </Route>
                </Layout>
              </MessengerProvider>
            </SocketProvider>
          </AuthContext>
          {/*=========== PRIVATE ROUTES =========== */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
