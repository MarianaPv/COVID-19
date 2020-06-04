import React, { useState } from "react";
import { Link } from "react-router-dom";
import "firebase/auth";
import app from "firebase/app";
import Navigation from "../NavBar/Navigation";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Routes/Routes";

import "firebase/database";

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function LoginBox(props) {
  return (
    <div className="inner-container">
      <div className="box">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="login-input"
            placeholder="Email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginBox;