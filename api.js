//add the new serving size amount from userFood
//assign the date 

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
//email auth is a variable that is autoset to false, it will be set to true
//after email authorization and users will not be able to log in until after
//the email auth is set
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
	
  var id = -1;

  if( results.length > 0 )
  {
    if(EmailAuth == true)
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
  }
  else
  {
    // Will this break the code?
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
	
function getTotalNutrition(array){
	//so an array gets sent here containing all of the variables per day
	//it adds up the total here for total nutrition information and returns it for another function
	var rows=array.length;
	var calories=0;
	var carbs=0;
	var fats=0;
	var protein=0;

	//for loop adds up all of the totals
	for(var i=0;i<rows;i++){
	calories+=array[i].Calories * array[i].NumServings;
	carbs+=array[i].Carbohydrates * array[i].NumServings;
	protein+=array[i].Protein * array[i].NumServings;
	fats+=array[i].Fats * array[i].NumServings;
	}
	return {Calories: calories , Carbs: carbs, Protein : protein, Fats: fats}
	}
}

/*
	
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
*/
