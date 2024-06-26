import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import store from "store/reducers/store";
import { Provider } from "react-redux";
import Finish from "views/Midtrans/Finish";
import Unfinish from "views/Midtrans/Unfinish";
import Gagal from "views/Midtrans/Gagal";
import Login from "views/Login/Login";
import LupaPassword from "views/Login/LupaPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //Provider berguna untuk menghubungkan komponen dengan redux
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} exact />
        <Route path="/lupaPassword" component={LupaPassword} exact />
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/unfinish" component={Unfinish} exact />
        <Route path="/payment/error" component={Gagal} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
