const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// mongodb+srv://aynestylar1993:Tarzan@largeproject.vxo9q7g.mongodb.net/?retryWrites=true&w=majority

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();
client.connect(console.log("mongodb connected"));


app.post('/api/addUserFood', async (req, res, next) =>
{
  // incoming: int userId, string foodName, int calories
  // outgoing: error
	
  const { userId, foodName, calories } = req.body;

  const newFood = {UserId:userId, FoodName: foodName, Calories: calories};
  var error = 'failure';

  try
  {
    const db = client.db("database");
    const result = db.collection('UserMealPlans').insertOne(newFood);
    error = 'success';
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
    const result = await db.collection('UserMealPlans').find(userId);
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
	
 var error = '';

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
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
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


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
