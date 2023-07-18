import React, { useState } from 'react'

function Register() {
  let bp = require('./Path.js');
  var storage = require('../tokenStorage.js');
  let email;
  let password;
  const [message,setMessage] = useState('');
  const headers = {'Content-Type': 'application/json'}

const doRegister = async event => 
{
    event.preventDefault();
    var obj = {email:email.value,password:password.value};
    var js = JSON.stringify(obj);

    try
    {    
          const response = await fetch(bp.buildPath('api/register'),
          {method:'POST',body:js,headers:headers});

          let txt = await response.text();
          let res = JSON.parse(txt);

          if(res.error === 'created')
          {
              setMessage( "Account created.");
          }
          else if (res.error === 'exists')
          {
              setMessage('User already exists');
          }
      }
      catch(e)
      {
          setMessage(e.toString());
      }
      try
      {  
            let emailObject = {email:email.value}
            js = JSON.stringify(emailObject);  
            const emailRes = await fetch(bp.buildPath('api/requestEmailAuthorization'),
            {method:'POST',body:js,headers:headers});

            let emailText = await emailRes.text();
            let emailResponse = JSON.parse(emailText);
            if(emailResponse.error === 'email sent')
                setMessage( "Account created. Verification Email sent");
            else 
              setMessage( "Problem sending verification email.");
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
        ref={(c) => email = c} /><br />
      <input type="password" id="password" placeholder="Password" 
        ref={(c) => password = c} /><br />

      <input type="submit" id="loginButton" class="buttons" value = "Do It"
        onClick={doRegister} />
      </form>
      <span id="loginResult">{message}</span>
   </div>
  );
}
export default Register;
