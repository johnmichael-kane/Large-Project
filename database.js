const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const app = require('./server');
const { MongoMemoryServer } = require('mongodb-memory-server');

//**************************************New Implementations**************************************
describe('checkSharedWord', () => {//check if the same keyword exists in multiple database entries
    it('Checks if multiple items exist containing the same keyword', async () => {
        const success = { error: "exists" };
        const searchWord = "Salad"; // Shared word to search for
        const res = await request(app)
            .post('/api/checkFoodDatabaseDuplicate')
            .send({ 'foodName': searchWord });
        const hasSharedWord = res.body.some(item => item.name.includes(searchWord));
        expect(hasSharedWord).to.be.true;
    });
});

describe('jwtExpired', () => { //non-arbitrary version, no input
  it('Should check if a JWT is expired', async () => {
    const { accessToken } = createToken('user123');
    await new Promise(resolve => setTimeout(resolve, 3600000));
    const isExpired = isExpired(accessToken);
		expect(isExpired).to.be.true;
  });
});

describe('jwtRefresh', () => {//refreshes an expired json webtoken
  it('Should refresh an expired JWT token', async () => {
    const { accessToken } = createToken('user123');
    const refreshedToken = refresh(accessToken);
    const isExpired = isExpired(refreshedToken.accessToken);expect(isExpired).to.be.false;
  });
});

describe('jwtVerifyOriginalExpiration ', () => {//create and verify original custom expiration of a json webtoken
  it('Should create a JWT token with a custom expiration time and should verify the original expiration', async () => {
    const customExpiration = '30m'; 
    const { accessToken } = createToken('user123', { expiresIn: customExpiration });
    const isExpired = isExpired(accessToken);
    const decodedToken = jwt.decode(accessToken);
    const originalExpiration = decodedToken.exp * 1000; 
    expect(isExpired).to.be.true;
    expect(originalExpiration).to.equal(Date.now() + parseDuration(customExpiration));
  });
});

describe('jwtDetectInvalid', () => {//create invalid webtoken and verify it as invalid
  it('Should detect an invalid JWT token', async () => {
    const invalidToken = 'invalid-token';
    const isExpiredOrInvalid = isExpired(invalidToken);
    expect(isExpiredOrInvalid).to.be.true;
  });
});

describe('addCard', () => {//create new card
  it('Should create a new card document', async () => {
    const cardData = {
      UserId: 1,
      Card: '3a2bcf28e48e9dcf0ea1a6f43f47ef81'
    };

    const card = await Card.create(cardData);
    expect(card).to.exist;
    expect(card.UserId).to.equal(1);
    expect(card.Card).to.equal('3a2bcf28e48e9dcf0ea1a6f43f47ef81');
  });
});

describe('addFood', () => {//create new food
  it('Should create a new database food document', async () => {
    const foodData = {
      FoodName: 'Chicken Breast',
      Calories: 120,
      Fats: 2.5,
      Carbohydrates: 0,
      Protein: 26,
      ServingSize: '100g'
    };

    const food = await DatabaseFood.create(foodData);
    expect(food).to.exist;
    expect(food.FoodName).to.equal('Chicken Breast');
    expect(food.Calories).to.equal(120);
    expect(food.Fats).to.equal(2.5);
    expect(food.Carbohydrates).to.equal(0);
    expect(food.Protein).to.equal(26);
    expect(food.ServingSize).to.equal('100g');
  });
});

describe('UserFood Model', () => {//create new userFood
  it('Should create a new user food document', async () => {
    const userFoodData = {
      UserId: 1,
      Year: 2023,
      Month: 7,
      Day: 13,
      FoodName: 'Salmon',
      Calories: 280,
      Fats: 18,
      Carbohydrates: 0,
      Protein: 26,
      ServingSize: '4 oz',
      NumServings: 2
    };

    const userFood = await UserFood.create(userFoodData);
    expect(userFood).to.exist;
    expect(userFood.UserId).to.equal(1);
    expect(userFood.Year).to.equal(2023);
    expect(userFood.Month).to.equal(7);
    expect(userFood.Day).to.equal(13);
    expect(userFood.FoodName).to.equal('Salmon');
    expect(userFood.Calories).to.equal(280);
    expect(userFood.Fats).to.equal(18);
    expect(userFood.Carbohydrates).to.equal(0);
    expect(userFood.Protein).to.equal(26);
    expect(userFood.ServingSize).to.equal('4 oz');
    expect(userFood.NumServings).to.equal(2);
  });
});
//**************************************End of New Implementations**************************************

//**************************************start createJWT.js import**************************************
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

describe('getFoodNutrition', () => {
    it('Should get nutrition data for a given food', async () =>{
    const expectedMilk =
    {
        name: 'Whole Milk',
        calories: 150
    }

    const response = await request(app)
    .post('./api/getFoodNutrition')
    .send('Whole Milk');

    expect(res.body).deepStrictEqual(expectedMilk);
    assert.deepStrictEqual(expectedMilk, milk);

    const expectedEgg =
    {
        name: 'Egg',
        calories: 90
    }

    const egg = getFoodNutrition('Egg');
    assert.deepStrictEqual(expectedEgg, egg);
    
    })
})

/*
describe('searchFood', () => {
    it('Should return an Array of JSON objects matching food name and calories', () =>{
        const expectedMilkSearch =
            [
                {
                    name: 'Whole Milk',
                    calories: 150
                },
                {
                    name: '2% Reduc  apiEndpoints

})

describe('addDatabaseFood', () => {
    it('Adds a foods nutrition content to the database', () => {
        const success = "added";
        expect(addUserFood('Salmon Fillet', 824)).deepStrictEqual(success);
        })

})
*/

describe('addUserFood', () => {
    let mongoServer;
    let client;
    let db;

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        db = client.db("database");
    });

    after(async () => {
        await client.close();
        await mongoServer.stop();
    });


    it('Adds food nutrition content to users daily meal plan', async () => {
        const success = {error : "added"};

        const res = await request(app)
        .post('/api/addUserFood')
        .send({"userId": 1, "foodName": 'Whole Milk', "calories": 130})
        expect(res.body).deep.equal(success);
    })
})
/*
describe('deleteUserFood', () => {
    it('Removes a food item from a user\'s meal plan', () => {
        expect(deleteUserFood('Ribeye Steak', 15)).deepStrictEqual('deleted');
    })
})
*/
describe('checkFoodDatabaseDuplicate', () => {
    it('Checks if a food already exists in the database', async () => {
        const success = {error : "exists"};

        const res = await request(app)
        .post('/api/checkFoodDatabaseDuplicate')
        .send({'foodName': '1000 Island,Salad Drsng,Local'})
        expect(res.body).deep.equal(success);
    })
})


describe('login', () => {
    it('Logs a user into the app', async () => {
        const loginSuccess = {
            id: 1,
            firstName: 'Tylar',
            lastName: 'Aynes',
            error: 'loginSuccess'
        }
        const res = await request(app)
        .post('/api/login')
        .send({'login': 'Tylar', 'password' : 'Tarzan'})
        expect(res.body).deep.equal(loginSuccess);
    })
})
/*
describe('getUserMealPlan', () => {
    it('Returns a user\'s meal plan as a JSON object', () => {
        const expectedMealPlan = 
        [
            {
                name: 'Egg',
                calories: 90
            },
            {
                name: 'Whole Milk',
                calories: 150
            }
        ]

        expect(getUserMealPlan(15).deepStrictEqual(expectedMealPlan));

    })
})
describe('register', () => {
    it('Registers a new user to the app', () => {
        expect(register('TylarA', 'Tarzan1!')).deepStrictEqual('registerSuccess');
    })
})

describe('checkUserDuplicate', () => {
    it('Checks if a user already exists in the database', () => {
        expect(checkUserDuplicate('Tarzan')).deepStrictEqual('exists');
        })
})

describe('sortFood', () => {
    it('Sorts Food in ascending order based on calorie count', () => {
        const expectedMilkSort =
        [
            {
                name: 'Fat-free Milk',
                calories: 90
            },
            {
                name: '2% Reduced Fat Milk',
                calories: 130
            },
            {
                name: 'Whole Milk',
                calories: 150
            },
        ]

        const MilkSearch =
            [
                {
                    name: 'Whole Milk',
                    calories: 150
                },
                {
                    name: '2% Reduced Fat Milk',
                    calories: 130
                },
                {
                    name: 'Fat-free Milk',
                    calories: 90
                }
            ]
        expect(sortFood(MilkSearch)).deepStrictEqual(expectedMilkSort);
    })
})

describe('userPasswordRecovery', () => {
    it('Sends an email to a user in order to reset the password', () => {

    })
})

describe('twoFactorAuthentication', () => {
    it('Sends an email to a user to verify a login', () => {

    })
})
*/
