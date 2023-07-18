import React, { useState } from 'react';
import {useJwt} from 'react-jwt';

function PasswordReset()
{
    var storage = require('../tokenStorage.js');
    const query = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),  
    });
    const code = query.token; 
    const email = query.id
  
    let bp = require('./Path.js');

    const [message,setMessage] = useState('');
    const [password1, firstPassword] = useState('');
    const [password2, secondPassword] = useState('');

    const resetPassword = async event => 
    {
	    event.preventDefault();
        var obj = {email: email ,newPassword: password1, code: code}
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/resetPassword'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error === 'worked')
            {
                setMessage( "Password reset sucessful.");
            }
            else
            {
                setMessage('Password link invalid.');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

    return(
        <div id="passwordResetDiv">
        <br />
        <input 
            type="password" 
            id="password1" 
            placeholder="Password" 
            value = {password1}
            onChange={(c) => firstPassword(c.target.value)}
         />
        <br />
        <input 
            type="password" 
            id="password2" 
            placeholder="Confirm Password"  
            value = {password2}
            onChange={(c) => secondPassword(c.target.value)}
        />
        <button type="button" id="resetPassword" className="buttons" 
          onClick={resetPassword}> Reset Password</button><br />
        <span id="passwordResult">{message}</span>
      </div>
      
    );
}
export default PasswordReset;
