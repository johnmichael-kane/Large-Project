import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
function EmailVerification()
{

  var storage = require('../tokenStorage.js');

  const query = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  const code = query.token; // "some_value"
  const email = query.id
  

  const [message,setMessage] = useState('');
  useEffect(() => {
    const verifyEmail = async ()=> 
    {
      let bp = require('./Path.js');
      var obj = {email:email,code:code};
      var js = JSON.stringify(obj);

      try
      {    
            const response = await fetch(bp.buildPath('api/verifyEmail'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if( res.error === 'worked' )
          {
              setMessage('Email Verification Successful');
          }
          else if (res.error === 'token invalid')
          {
            setMessage('Email Verification failed. Link is invalid.');
          }
          else setMessage('Email Verification failed. Link is expired.');
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }    
  };

    verifyEmail();
  }, []);
  
    return(
        <div>
          <div class="container">
            <div class="row text-center">
            <div class="col-md">
                <div class="card-body text-center">
                  <div class="h1 mb-3">
                    <i class="bi bi-check-circle-fill"></i>
                  </div>
                  <span id="loginResult">{message}</span>
                  <div>
                    <span> Return to log in </span>
                    <Link to="/">here</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default EmailVerification;
