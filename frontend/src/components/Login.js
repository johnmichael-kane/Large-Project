import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login()
{
  let bp = require('./Path.js');
  var storage = require('../tokenStorage.js');

  var loginName;
  var loginPassword;

  const [message,setMessage] = useState('');

  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {email:loginName.value,password:loginPassword.value};
      var js = JSON.stringify(obj);

      try
      {    
          const response = await fetch(bp.buildPath('api/login'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
              // might be res.accessToken
              storage.storeToken(res);
              let userId = res.id;

              var user = {id:res.id}
              localStorage.setItem('user_data', JSON.stringify(user));

              
              setMessage('');
              window.location.href = '/cards';
          }
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }    
  };

    const requestPasswordReset = async event =>
    {
        var obj = {email:loginName.value};
        let emailReset = JSON.stringify(obj);
        event.preventDefault();
        try
        {
          const request = await fetch(bp.buildPath('api/requestResetPassword'),
              {method:'POST',body:emailReset,headers:{'Content-Type': 'application/json'}});

          var req = JSON.parse(await request.text());

          if( req.error === 'Email does not exist')
          {
              setMessage( "User not found.");
          }
          else
          {
              setMessage('Password reset email sent.');
          }
      }
      catch(e)
      {
          setMessage(e.toString());
      }
    }

    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="email" 
          ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="password" 
          ref={(c) => loginPassword = c} /><br />

        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
        <div>
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
        <div>
        <form onSubmit={requestPasswordReset}>
        <input type="submit" id="resetButton" class="buttons" value = "Forgot Password?"
          onClick={requestPasswordReset} />
          </form>
        </div>
     </div>
    );
};

export default Login;
