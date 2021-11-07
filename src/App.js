import React, { useContext, useEffect } from "react";
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
import Router from "./Helpers/Router";
import WebSocket from "./Contexts/Socket";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthContext from "./Contexts/AuthContext";
import MessengerProvider from "./Contexts/MessengerProvider";
import Layout from "./Components/Layout/Layout";
import SocketProvider from "./Contexts/Socket";
import DarkTheme from "./Components/Themes/DarkTheme";
import { BrowserRouter,Route,Switch } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <BrowserRouter>
        <CssBaseline />
        <SocketProvider>
          <AuthContext>
            <MessengerProvider>
              <Layout>
                <Switch>
                  <Router exact path="/" view={Newsfeed} />
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <Router exact path="/user/:id" view={Profile} />
                  <Router exact path="/admissions" view={Admissions} />
                  <Router
                    exact
                    path="/admissions/lessons/:id"
                    view={LessonOverview}
                  />
                  <Router exact path="/messages" view={Messages} />
                  <Router exact path="/notifications" view={AllNotifications} />
                  <Router
                    exact
                    path="/messages/inbox/conversations/:id"
                    view={ConversationsBody}
                  />
                  <Router exact path="/user/:id/edit" view={EditProfile} />
                  <Router
                    exact
                    path="/financial/balance/deposit"
                    view={Deposit}
                  />
                  <Router
                    exact
                    path="/financial/transactions"
                    view={Transactions}
                  />
                  <Router exact path="/orders" view={Orders} />
                  <Router exact path="/courses" view={Courses} />
                  <Router
                    exact
                    path="/courses/overview/:uuId"
                    view={CourseSingle}
                  />

                  {/* //GATEWAY PAGE URLS */}

                  <Router
                    exact
                    path="/gateway/payment/success"
                    view={Success}
                  />
                  <Router exact path="/gateway/payment/failed" view={Failed} />
                  <Router exact path="/gateway/payment/cancel" view={Cancel} />
                </Switch>
              </Layout>
            </MessengerProvider>
          </AuthContext>
        </SocketProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
