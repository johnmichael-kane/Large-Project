import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import validator from 'validator'

function Register() {
  let bp = require('./Path.js');
  var storage = require('../tokenStorage.js');
  let email;
  let password;
  let passwordConfirm;
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('Please enter a valid Email');
  const [extraError, setExtraError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonState, setButtonState] = useState();

  const validateEmail = (e) => {
    email = e.target.value;

    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid Email');
    } else {
      setEmailError('');
    }
  }

  const validatePassword = (pass) => {
    password = pass.target.value;

    if (!validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setPasswordError('Password must contain at least eight characters and one of the following: ');
      setExtraError('Lowercase letter, Uppercase letter, Number, Special Character');
    }
    else {
      setPasswordError('');
      setExtraError('');
    }

  }

  const validateConfirm = (conf) => {
    passwordConfirm = conf.target.value;
  }

  const headers = { 'Content-Type': 'application/json' }

  const doRegister = async event => {
    event.preventDefault();
    if (emailError == '' && passwordError == '') {
      if (validator.equals(password.value, passwordConfirm.value)) {
        var obj = { email: email.value, password: password.value };
        var js = JSON.stringify(obj);


        try {
          const response = await fetch(bp.buildPath('api/register'),
            { method: 'POST', body: js, headers: headers });

          let txt = await response.text();
          let res = JSON.parse(txt);

          if (res.error === 'created') {
            setMessage("Account created.");
          }
          else if (res.error === 'exists') {
            setMessage('User already exists');
          }
        }
        catch (e) {
          setMessage(e.toString());
        }
        try {
          let emailObject = { email: email.value }
          js = JSON.stringify(emailObject);
          const emailRes = await fetch(bp.buildPath('api/requestEmailAuthorization'),
            { method: 'POST', body: js, headers: headers });

          let emailText = await emailRes.text();
          let emailResponse = JSON.parse(emailText);
          if (emailResponse.error === 'email sent')
            setMessage("Account created. Verification Email sent");
          else
            setMessage("Problem sending verification email.");
        }
        catch (e) {
          setMessage(e.toString());
        }
      }
      else {
        setMessage("Passwords do not match");
      }
    }
    else {
      setMessage("Registration failed, please fill out the form correctly");
    }
  };

  return (
    <div>
      <p></p>
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row border rounded-5 p-3 bg-white shadow box-area">
          <div class="row align-items-center">
            <div class="header-text input-group-lg">
              <p><font size="+3"><center>Please Register</center></font></p>
            </div>
            <div id="loginDiv">
              <span style={{ color: 'red' }} id="emailResult">{emailError}</span>
              <form onSubmit={doRegister}>
                <div class="input-group mp-3">
                  <input type="text" onChange={(e) => validateEmail(e)}
                    class="form-control form-control-lg bg-light fs 6"
                    id="email" placeholder="Email" ref={(c) => email = c}></input>
                </div>
                <div class="input-group mp-3">
                  <input type="password" onChange={(e) => validatePassword(e)} class="form-control form-control-lg bg-light fs 6"
                    id="password" placeholder="Password" ref={(c) => password = c} />

                  <input type="password" class="form-control form-control-lg bg-light fs 6"
                    id="confirmPassword" placeholder="Confirm password" ref={(c) => passwordConfirm = c} />
                </div>
                <span style={{ color: 'red' }} id="passwordError">{passwordError}</span>
                <br/>
                <span style={{ color: 'red' }} id="extraError">{extraError}</span>
                <p></p>
                <div class="input-group mb-3">
                  <button class="btn btn-lg btn-primary w-100 fs-6" id="loginButton"
                    onClick={doRegister} input type="submit">Register</button>
                </div>
                <div>
                  <span> Already have an account? Log in </span>
                  <Link to="/">here</Link>
                </div>
              </form>
              <span id="loginResult">{message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
