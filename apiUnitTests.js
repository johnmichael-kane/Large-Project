const chai = window.chai
const expect = chai.expect

describe('getFoodNutrition', () => {
    it('Should get nutrition data for a given food', () =>{
    const expectedMilk =
    {
        name: 'Whole Milk',
        calories: 150
    }

    const milk = getFoodNutrition('Whole Milk');
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

describe('searchFood', () => {
    it('Should return an Array of JSON objects matching food name and calories', () =>{
        const expectedMilkSearch =
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
    })
})

describe('addDatabaseFood', () => {
    it('Adds a foods nutrition content to the database', () => {
        const success = "added";
        expect(addUserFood('Salmon Fillet', 824)).deepStrictEqual(success);
        })

})

describe('addUserFood', () => {
    it('Adds food nutrition content to users daily meal plan', () => {
        const success = "added";
        expect(addUserFood('Ribeye Steak', 847)).deepStrictEqual(success);
        })
})

describe('deleteUserFood', () => {
    it('Removes a food item from a user\'s meal plan', () => {
        expect(deleteUserFood('Ribeye Steak', 15)).deepStrictEqual('deleted');
    })
})

describe('checkFoodDatabaseDuplicate', () => {
    it('Checks if a food already exists in the database', () => {
        expect(checkDatabaseDuplicate('Whole Milk')).deepStrictEqual('exists');
        })
})

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

describe('login', () => {
    it('Logs a user into the app', () => {
        expect(login('Tarzan', 'Tarzan1!')).deepStrictEqual('loginSuccess');

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