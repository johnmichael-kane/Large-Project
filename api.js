const { JsonWebTokenError } = require('jsonwebtoken');

require('express');
require('mongodb');

exports.setApp = function(app, client) {

app.post('/api/addUserFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  //const { userId, foodName, calories } = req.body;
  const token = require('./createJWT.js');
  const { userId, foodName, calories, fats, carbohydrates, protein, servingSize, jwtToken} = req.body;

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

  const newFood = {UserId:userId, FoodName: foodName, Calories: calories, Fats: fats, Carbohydrates: carbohydrates, Protein: protein, ServingSize: servingSize};
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
	
  // const {login, password } = req.body;
  const token = require('./createJWT.js');
  const {email, password, jwtToken} = req.body;

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

  const newUser = {Email: email, Password: password};
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

app.post('/api/getUserMealPlan', async (req, res, next) =>
{
  // incoming: int userId, 
  // outgoing: error, Array of JSON objects: String foodName, int calories
	
  // Needs filling
  const token = require('./createJWT.js');
  const {jwtToken} = req.body;
  var error = 'failure';

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

  try
  {
    const db = client.db("database");
    const result = await db.collection('Meals').find(userId);
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

  var ret = { error: error, jwtToken: refreshedToken};
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
	
//CHANGE THIS ONE
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
  var loginError = 'loginFailure';
  var ret;
  const token = require('./createJWT.js');
  const { login, password} = req.body;

  const db = client.db("database");
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
    ret = { id:id, firstName:fn, lastName:ln, error:'loginSuccess'};

    try
    {
      const token = require("./createJWT.js");
      ret = token.createToken(fn, ln, id);
    }
    catch(e)
    {
      ret = {error:e.message};
    }
  }
  else
  {
    // Will this break the code?
     ret = { id: id, firstName: fn, lastName: ln, error: loginError}
  }


  res.status(200).json(ret);
});

app.post('/api/searchFood', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const token = require('./createJWT.js');
  const { userId, search, jwtToken} = req.body;

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
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
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
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error, jwtToken: refreshedToken};
  res.status(200).json(ret);
});

app.post('/api/checkUserDuplicate', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = 'dne';
  const token = require('./createJWT.js');
  const {login, jwtToken} = req.body;

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
  const results = await db.collection('Users').find({ "Login": login}).toArray();
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

app.post('/api/checkFoodDatabaseDuplicate', async (req, res, next) => 
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
