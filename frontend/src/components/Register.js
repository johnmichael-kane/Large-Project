import React, { useState } from 'react'
function Register() {


const doRegister = async event => 
{
    event.preventDefault();

    var obj = {login:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    try
    {    
//          const response = await fetch('http://localhost:5000/api/login',
          const response = await fetch(buildPath('api/register'),
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
      <input type="text" id="loginName" placeholder="Username" 
        ref={(c) => loginName = c} /><br />
      <input type="password" id="loginPassword" placeholder="Password" 
        ref={(c) => loginPassword = c} /><br />

      <input type="submit" id="loginButton" class="buttons" value = "Do It"
        onClick={doRegister} />
      </form>
      <span id="loginResult">{message}</span>
   </div>
  );
}
export default Register;