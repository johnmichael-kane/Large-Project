const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (email)
{
    return _createToken(email);
}

_createToken = function (email)
{
    try
    {
        // Leinecker says we may want to implement date
      const expiration = new Date();
      const user = {Email:email};

      const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        // Default is 20 minutes
      // In order to exoire with a value other than the default, use the 
       // following
      /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */

      var ret = {accessToken:accessToken, Email:email};
    }
    catch(e)
    {
      var ret = {error:e.message};
    }
    return ret;
}

exports.isExpired = function (token) {
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return false; // Token is valid, not expired
    } catch (err) {
      return true; // Token is expired or invalid
    }
  };

exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});

  var Email = ud.payload.Email;

  return _createToken(Email);
}