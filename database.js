// unit tests can be run from Windows command line using 'npx mocha database.js' assuming dependencies (or their folder) 
// are stored within same directory, and all npm dependencies are downloaded somewhere in your machine and added to PATH
// generally, you install npm dependencies by doing 'npm install x' in the command line 
// MAKE SURE YOUR COMMAND LINE IS CD'D TO THE SAME DIRECTORY AS DATABASE.JS WHEN INSTALLING DEPENDENCIES

//The last 3 unit tests fail by design!

const chai = require('chai');
const expect = chai.expect;
//const assert = chai.assert;
const assert = require('assert');
const request = require('supertest');
const app = require('./server');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const jwt = require("jsonwebtoken");
require("dotenv").config();

//**************************************start createJWT.js import**************************************


exports.createToken = function (id)
{
    return _createToken(id);
}

_createToken = function (id)
{
    try
    {
        // Leinecker says we may want to implement date
      const expiration = new Date();
      const user = {userId:id};

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

      var ret = {accessToken:accessToken, id:id};
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

  var userId = ud.payload.userId;

  return _createToken(userId);
}

//**************************************end createJWT.js import**************************************

//**************************************start Unit tests**************************************





describe('Contains Keyword', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('Should find all foods in the Foods collection that contain a specific keyword', async () => {
    const searchString = 'milk';
    const searchRegex = new RegExp(searchString, 'i');

    const foods = await db
      .collection('Foods')
      .find({ FoodName: { $regex: searchRegex } })
      .toArray();

    assert.ok(foods.length > 0, 'No foods found matching the search criteria.');

    // Print all the foods with the matching string in their name
    console.log('Foods: Searching with keyword "milk"');
    for (const food of foods) {
      console.log(food.FoodName);
    }
  });
});



describe('Refresh JWT', () => {
  it('should refresh an expired JWT token and decode it', (done) => {
    const expiration = Math.floor(Date.now() / 1000) - 3600; 
    const payload = { userId: '123', exp: expiration };
    const secretKey = 'secret-key'; 
    const expiredToken = jwt.sign(payload, secretKey);
console.log(' ');
    console.log('Expired Token:', expiredToken);

    
    setTimeout(() => {
      
      const decoded = jwt.decode(expiredToken);
      decoded.exp = Math.floor(Date.now() / 1000) + 3600; 
      const refreshedToken = jwt.sign(decoded, secretKey);
     console.log(' ');
      console.log('Refreshed Token:', refreshedToken);
console.log(' ');
      jwt.verify(refreshedToken, secretKey, (verifyErr, decodedToken) => {
        expect(verifyErr).to.be.null;
        console.log('Decoded Token:', decodedToken);
        done();
      });
    }, 1000); 
  });
});

describe('Check if User Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if a user already exists', async () => {
    const login = 'DeadMau5'; 

    const user = await db.collection('Users').findOne({ Login: login });

    if (user) {
      console.log('DeadMau5 already exists:', user);
      expect.fail('DeadMau5@gmail.com value exists');
    } else {
      console.log('DeadMau5 does not exist.');
    }

    expect(user).to.not.exist;
  });
});

describe('Check if Email Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if an email already exists', async () => {
    const email = 'DeadMau5@gmail.com'; 

    const user = await db.collection('Users').findOne({ Email: email });

    if (user) {
      console.log('DeadMau5@gmail.com already exists:', user);
      expect.fail('DeadMau5@gmail.com value exists');
    } else {
      console.log('DeadMau5@gmail.com does not exist.');
    }

    expect(user).to.not.exist;
  });
});

describe('Check if Card Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if a value in the "Card" field already exists', async () => {
    const cardValue = 'Jonathon'; 

    const card = await db.collection('Cards').findOne({ Card: cardValue });

    if (card) {
      console.log('Jonathon value exists:', card);
      expect.fail('Jonathon value exists');
    } else {
      console.log('Jonathon value does not exist.');
      expect(card).to.not.exist;
    }
  });
});

describe('Check if Card Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if a value in the "Card" field already exists', async () => {
    const cardValue = 'DebugMe'; 

    const card = await db.collection('Cards').findOne({ Card: cardValue });

    if (card) {
      console.log('DebugMe value exists:', card);
      expect.fail('DebugMe value exists');
    } else {
      console.log('DebugMe value does not exist.');
      expect(card).to.not.exist;
    }
  });
});

describe('Check if Email Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if an email already exists', async () => {
    const email = 'sajlsatt98@aol.com'; 

    const user = await db.collection('Users').findOne({ Email: email });

    if (user) {
      console.log('sajlsatt98@aol.com already exists:', user);
expect.fail('sajlsatt98@aol.com value exists');
    } else {
      console.log('sajlsatt98@aol.com does not exist.');
    }

    expect(user).to.not.exist;
  });
});

describe('Check if User Does Not Exist', () => {
  let connection;
  let db;

  before(async () => {
    const uri = 'mongodb+srv://James:prankem@largeproject.vxo9q7g.mongodb.net/database';
    const client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db('database');
  });

  after(async () => {
    await connection.close();
  });

  it('should check if a user already exists', async () => {
    const login = 'James'; 

    const user = await db.collection('Users').findOne({ Login: login });

    if (user) {
      console.log('James already exists:', user);
      expect.fail('James value exists');
    } else {
      console.log('James does not exist.');
    }

    expect(user).to.not.exist;
  });
});
