//add the new serving size amount from userFood
//assign the date 
const user = require('./models/user.js');
const Token = require("./models/Token.js");
const { JsonWebTokenError } = require('jsonwebtoken');
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

require('express');
require('mongodb');

exports.setApp = function(app, client) {

  app.post('/api/resetPassword',  async (req, res, next) => {
    const {email, newPassword, code} = req.body;
    const db = client.db("database");
    const users = db.collection("Users");
    
    theEmail = await users.find({"Email" : email}).toArray();
    console.log(theEmail.length);
    query = {Email : theEmail[0].Email}
    newPass = {$set: {"Password" : newPassword}}
  
    const result = await users.updateOne(query, newPass);
    res.status(200).json({error: 'worked'});
  });

  app.post("/api/requestResetPassword", async (req, res, next) => 
  {
    const{email} = req.body;
    const db = client.db("database");
    const resetUser = await db.collection('Users').findOne({"Email": email});

    if (!resetUser)
      res.status(200).json({error :  'Email does not exist.'});
  
    let token = await db.collection('Tokens').find({"UserId": email});
    if (token) console.log('there\'s a token')
      await db.collection('Tokens').remove({"Email" : email});

    creation = Date.now();
    expiration = creation + 1800000;

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));
    const newToken ={userId: email, token: hash,createdAt: new Date(creation), expireAt: new Date(expiration)}
    const result = await db.collection('Tokens').insertOne(newToken);
  
    const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${email}`;
  
    // sendEmail(email, link);
    var ret = { error: 'email sent', link: link};
    res.status(200).json(ret);
  });
	
app.post('/api/addUserFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  //const { userId, foodName, calories } = req.body;
  const token = require('./createJWT.js');
  const {foodName, calories, fats, carbohydrates, protein, servingSize, numServings, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      console.log('token expired')
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }
//set year/month/day
const date=new Date();
let year=date.getFullYear();
let month=date.getMonth()+1;
let day=date.getDate();
	
  const newFood = {Email: jwtToken.Email, Year: year, Month: month, Day: day, FoodName: foodName, Calories: calories, Fats: fats, Carbohydrates: carbohydrates, Protein: protein, ServingSize: servingSize, NumServings: numServings};
  var error = 'notAdded';

  try
  {
    const db = client.db("database");
    const result = db.collection('Meals').insertOne(newFood);
    error = 'added';
  }
  catch(e)
  {
    error = e.toString();
  }

  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  // userMealList.push(foodName);
  // userCaloriesList.push(calories);

  var ret = { error: error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});
	
app.post('/api/addDatabaseFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  // const {foodName, calories } = req.body;
  const token = require('./createJWT.js');
  const {foodName, calories, fats, carbohydrates, protein, servingSize, jwtToken} = req.body;
  
  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  const newFood = {FoodName: foodName, Calories: calories, Fats: fats, Carbohydrates: carbohydrates, Protein: protein, ServingSize: servingSize};
  var error = 'failure';

  try
  {
    const db = client.db("database");
    const result = db.collection('Foods').insertOne(newFood);
    error = 'success';
  }
  catch(e)
  {
    error = e.toString();
  }
  
  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  // userMealList.push(foodName);
  // userCaloriesList.push(calories);

  var ret = { error: error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  // const {email, password } = req.body;
  const {email, password} = req.body;

  const newUser = {Email: email, Password: password, EmailAuth: false};
  var error = 'failure';

  try
  {
    const db = client.db("database");
    const result = db.collection('Users').insertOne(newUser);
    error = 'success';
  }
  catch(e)
  {
    error = e.toString();
  }


  // userMealList.push(foodName);
  // userCaloriesList.push(calories);

  var ret = { error: error};
  res.status(200).json(ret);
});

//finish this test
app.post('/api/UserMealsDate', async (req, res, next) =>
{
  // incoming: int userId, 
  // outgoing: error, Array of JSON objects: String foodName, int calories
	
  // Needs filling
  const token = require('./createJWT.js');
  const {year, month, day, jwtToken} = req.body;
  var error = 'success';

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }
const db = client.db("database");
const result = await db.collection('Meals').find({"Email": jwtToken.Email, "Year": year, "Month": month, "Day": day}).toArray();
if(result.length<1){
error='does not exist';
}
  nutritionResult = getTotalNutrition(result);
  var _name = [];
  var _calories = [];
  var _protein = [];
  var _fats = [];
  var _carbs = [];
  var _servings = [];
	
  for( var i=0; i<result.length; i++ )
  {
    _name.push(result[i].FoodName);
    _calories.push(result[i].Calories);
    _protein.push(result[i].Protein);
    _fats.push(result[i].Fats);
    _carbs.push(result[i].Carbohydrates)
    _servings.push(result[i].NumServings)

  }

  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  var ret = { nameResults: _name, caloriesResults: _calories, proteinResults: _protein, fatResults: _fats, carbsResults: _carbs, numServings: _servings,
     Calories: nutritionResult.calories, Fats: nutritionResult.Fats, Protein: nutritionResult.Protein, Carbs: nutritionResult.Carbs,
      totalCalories: nutritionResult.Calories, error: error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: email, password
  // outgoing: id, firstName, lastName, error
	
  var loginError = 'loginFailure';
  var ret;
  const token = require('./createJWT.js');
  const { email, password} = req.body;

  const db = client.db("database");
  const results = await db.collection('Users').find({Email:email,Password:password}).toArray();

  if( results.length > 0 )
  {
    if(results.EmailAuth == true)
    {
      ret = { Email:email, error:'loginSuccess'};

      try
      {
        const token = require("./createJWT.js");
        ret = token.createToken(email);
      }
      catch(e)
      {
        ret = {error:e.message};
      }
    }
    else 
    {
      ret = { Email: email, error: loginError}
    }
  }
  else
  {
     ret = { Email: email, error: loginError}
  }


  res.status(200).json(ret);
});

app.post('/api/searchFood', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const token = require('./createJWT.js');
  const {search, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  var _search = search.trim();
  
  const db = client.db("database");
  const results = await db.collection('Foods').find({"FoodName":{$regex:_search+'.*', $options:'i'}}).toArray();
  
  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push(results[i].FoodName);
  }
  
  var ret = {results:_ret, error:error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});


app.post('/api/sendEmail', async (req, res, next) => {
  const token = require('./createJWT.js');
  const{email, jwtToken} = req.body;
  let error = 'failure';

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }
  error = 'success';

  try{
    sendPasswordRecovery(email);
  }
  catch(e)
  {
    console.log(e.message);
  }
  ret = {Error: error}
  res.status(200).json(ret);


});


app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';
  const token = require("./createJWT.js");
  const { userId, search, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      console.log('token expired')
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  var _search = search.trim();
  
  const db = client.db("database");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  console.log(jwtToken);
  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  // cardList.push( card );

  var ret = { results:_ret, error: error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  // const { userId, card } = req.body;
  const token = require('./createJWT.js');
  const { userId, card, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  const newCard = {Card:card,UserId:userId};
  var error = '';

  try
  {
    const db = client.db("database");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }

  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  // cardList.push( card );

  var ret = { error: error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

	
app.post('/api/checkUserDuplicate', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = 'dne';
  const token = require('./createJWT.js');
  const {email, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  const db = client.db("database");
  const results = await db.collection('Users').find({ "Email": email}).toArray();
  if(results.length > 0)
  {
    error = 'exists';
  }

  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }
  
  var ret = {error:error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

app.post('/api/checkFoodDuplicate', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = 'dne';

  const token = require('./createJWT.js');
  const {foodName, jwtToken} = req.body;

  try{
    if(token.isExpired(jwtToken))
    {
      var r = {error: 'The JWT is no longer valid', jwtToken: ''};
      res.status(200).json(r);
      return
    }
  }
  catch(e)
  {
    console.log(e.message);
  }

  const db = client.db("database");
  const results = await db.collection('Foods').find({ "FoodName": foodName}).toArray();
  if(results.length > 0)
  {
    error = 'exists';
  }
  
  var refreshedToken = null;
  try{
    refreshedToken = token.refresh(jwtToken);
  }
  catch(e)
  {
    console.log(e.message);
  }

  var ret = {error:error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});
	
}

function getTotalNutrition(array){
  //start off with an array
var rows=array.length;
var calories=0;
var carbs=0;
var fats=0;
var protein=0;
  
for(var i=0;i<rows;i++){
calories+=array[i].Calories * array[i].NumServings;
carbs+=array[i].Carbohydrates * array[i].NumServings;
protein+=array[i].Protein * array[i].NumServings;
fats+=array[i].Fats * array[i].NumServings;
}
return {Calories: calories , Carbs: carbs, Protein : protein, Fats: fats}
}

function sendPasswordRecovery(email){
  let nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nutritionapp7@gmail.com',
      pass: 'afzttirvjllddhre'
    }
  });
  
  var mailOptions = {
    from: 'nutritionapp7@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Trying this again'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}
