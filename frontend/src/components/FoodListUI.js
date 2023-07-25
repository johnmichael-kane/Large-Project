import React, { useState, useEffect } from 'react';

function FoodListUI() {
    let bp = require('./Path.js');
    var search = '';
    var temp = '';
    var foodName, calories, fats, protein, carbohydrates, servingSize, numServings;
    const [message, setMessage] = useState('');
    const [foods, setFoods] = useState([]);
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

    var storage = require('../tokenStorage.js');

    const getFood = async event => {
        event.preventDefault();
        var tok = storage.retrieveToken();
        let obj = { jwtToken: tok }
        let js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/getFood'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application.json' }
            });

            let text = await response.text();
            let res = JSON.parse(text);
            setFoods(res);
            console.log("food list", foods);
            console.log("length", foods.nameResults.length);
        }
        catch (e) {
            setMessage(e.toString());
        }
    }

    const addUserFood = async event => {
        event.preventDefault();

        var tok = storage.retrieveToken();
        let obj = {
            foodName: foodName.value, calories: calories.value, fats: fats.value,
            carbohydrates: carbohydrates.value, protein: protein.value, servingSize: servingSize.value,
            numServings: numServings.value, jwtToken: tok
        };
        let js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/addUserFood'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let res = JSON.parse(await response.text());
            if (res.error === "notAdded") {
                setMessage("API Error: " + res.error);
            }
            else {
                setMessage('Food has been added to your meal plan');
                //getUserMealPlan();
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    }

    return (
        <div id="FoodListUIDiv">
            <br />
            <span id="userId">{temp}</span>
            <button
                type="button"
                id="getFoodsButton"
                className="buttons"
                onClick={getFood}
            >
                Load all foods
            </button>
            <span id="foodAddResult">{message}</span>

            <div className="grid-container">
                {foods.nameResults && foods.nameResults.length > 0 ? (
                    foods.nameResults.map((foodName, index) => (
                        <div key={index} className="grid-item">
                            <h3>{foodName}</h3>
                            <tc>Calories: {foods.caloriesResults[index]}</tc>
                            <tc>Protein: {foods.proteinResults[index]}</tc>
                            <tc>Fats: {foods.fatResults[index]}</tc>
                            <tc>Carbs: {foods.carbsResults[index]}</tc>
                            <tc>Servings: {foods.numServings[index]}</tc>
                            <tc><button onClick={() => addUserFood(foodName)}>Add</button></tc>
                        </div>

                    ))

                )
                    : (
                        <p>Getting all foods</p>
                    )}
            </div>
        </div>
    );
}

export default FoodListUI;