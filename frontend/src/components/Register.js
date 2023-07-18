import React, { useState } from 'react'
let bp = require('./Path.js');
var storage = require('../tokenStorage.js');

function Register() {
  var email;
  var password;

const doRegister = async event => 
{
    event.preventDefault();
    var obj = {email:email.value,password:password.value};
    var js = JSON.stringify(obj);
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    try
    {    
          const response = await fetch(bp.buildPath('api/register'),
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          let txt = await response.text();
          let res = JSON.parse(txt);

          if( res.error.length > 0 )
          {
              setMessage( "API Error:" + res.error );
          }
          else
          {
              setMessage('User has been added');
          }
      }
      catch(e)
      {
          setMessage(e.toString());
      }

};  

return(
    <div id="loginDiv">
      <form onSubmit={doRegister}>
      <span id="inner-title">PLEASE Register</span><br />
      <input type="text" id="email" placeholder="Email" 
        ref={(c) => loginName = c} /><br />
      <input type="password" id="password" placeholder="Password" 
        ref={(c) => loginPassword = c} /><br />

      <input type="submit" id="loginButton" class="buttons" value = "Do It"
        onClick={doRegister} />
      </form>
      <span id="loginResult">{message}</span>
   </div>
  );
}
export default Register;
