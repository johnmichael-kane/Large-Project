require('express');
require('mongodb');

exports.setApp = function(app, client) {

app.post('/api/addUserFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  const { userId, foodName, calories } = req.body;

  const newFood = {UserId:userId, FoodName: foodName, Calories: calories};
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

//  userMealList.push(foodName);
//  userCaloriesList.push(calories);

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addDatabaseFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  const {foodName, calories } = req.body;

  const newFood = {FoodName: foodName, Calories: calories};
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

 // userMealList.push(foodName);
 // userCaloriesList.push(calories);

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  const {login, password } = req.body;

  const newUser = {Login: login, Password: password};
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

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/getUserMealPlan', async (req, res, next) =>
{
  // incoming: int userId, 
  // outgoing: error, Array of JSON objects: String foodName, int calories
	
  // Needs filling
  const {} = req.body;
  var error = 'failure';

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

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const { userId, card } = req.body;

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

  // cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});


app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
 var loginError = 'loginFailure';
 var ret;
  const { login, password } = req.body;

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
  }
  else
  {
     ret = { id: id, firstName: fn, lastName: ln, error: loginError}
  }


  res.status(200).json(ret);
});

// Similar to searchcards, needs to be updated
app.post('/api/searchFood', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db("database");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db("database");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/checkUserDuplicate', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = 'dne';

  const {login} = req.body;

  const db = client.db("database");
  const results = await db.collection('Users').find({ "Login": login}).toArray();
  if(results.length > 0)
  {
    error = 'exists';
  }
  
  var ret = {error:error};
  res.status(200).json(ret);
});

app.post('/api/checkFoodDatabaseDuplicate', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = 'dne';

  const {foodName} = req.body;

  const db = client.db("database");
  const results = await db.collection('Foods').find({ "FoodName": foodName}).toArray();
  if(results.length > 0)
  {
    error = 'exists';
  }
  
  var ret = {error:error};
  res.status(200).json(ret);
});
}