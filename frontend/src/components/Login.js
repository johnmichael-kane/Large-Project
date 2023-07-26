import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
function Login() {
  let bp = require('./Path.js');
  var storage = require('../tokenStorage.js');

  var loginName;
  var loginPassword;

  const [message, setMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const doLogin = async event => {
    event.preventDefault();
    let flag = 0;

    if (loginName.value == '' || loginPassword.value == '') {
      setEmailMessage('Email/Password field is empty');
      flag = 1;
    }
    else {
      setEmailMessage('');
      flag = 0;
    }
    if (flag == 0) {
      var obj = { email: loginName.value, password: loginPassword.value };
      var js = JSON.stringify(obj);

      try {
        const response = await fetch(bp.buildPath('api/login'),
          { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

        var res = JSON.parse(await response.text());
        console.log(res);
        if (res.id <= 0) {
          setMessage('Email/Password combination incorrect');
        }
        else {
          // might be res.accessToken
          storage.storeToken(res);
          let userId = res.id;

          var user = { id: res.id }
          localStorage.setItem('user_data', JSON.stringify(user));


          setMessage('');
          window.location.href = '/meals';
        }
      }
      catch (e) {
        console.log(e.toString());
        return;
      }
    }
  };

  const requestPasswordReset = async event => {
    var obj = { email: loginName.value };
    let emailReset = JSON.stringify(obj);
    event.preventDefault();
    try {
      const request = await fetch(bp.buildPath('api/requestResetPassword'),
        { method: 'POST', body: emailReset, headers: { 'Content-Type': 'application/json' } });

      var req = JSON.parse(await request.text());
      console.log(req);

      if (req.id <= 0) {
        setMessage("User not found.");
      }
      else {
        setMessage('Password reset email sent.');
      }
    }
    catch (e) {
      setMessage(e.toString());
    }
  }

  return (
    <div>
      <p></p>
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
          <div class="row align-items-center">
            <div class="header-text input-group-lg">
              <p><font size="+3"><center>Log in to Macrotracker</center></font></p>
            </div>
            <form onSubmit={doLogin}>
              <div class="input-group mp-3">
                <br />
                <input type="text" class="form-control form-control-lg bg-light fs 6"
                  id="loginName" placeholder="Email" ref={(c) => loginName = c}></input>
              </div>
              <div class="input-group mp-3">
                <input type="password" class="form-control form-control-lg bg-light fs 6"
                  id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}></input>
              </div>
              <div class="forgot">
                <form onSubmit={requestPasswordReset}>
                  <small><a href="#" id="resetButton" onClick={requestPasswordReset}>Forgot Password?</a></small>
                  <br />
                  <span id="result">{message}</span>
                </form>
              </div>
              <p></p>
              <div class="input-group mb-3">
                <span id="emailRes">{emailMessage}</span>
                <br />
                <button class="btn btn-lg btn-primary w-100 fs-6" onClick={doLogin}
                  input type="submit">Login</button>
              </div>
            </form>
            <div>
              <span>Don't have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
