import React, { useState, useEffect } from 'react';

function CardUI() {
    let bp = require('./Path.js');
    var card = '';
    var search = '';
    let text = '';
    var foodName, calories, fats, protein, carbohydrates, servingSize, numServings;
    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');
    var temp = '';

    const [mealPlan, setMealPlan] = useState({
        nameResults: [],
        caloriesResults: [],
        proteinResults: [],
        fatResults: [],
        carbsResults: [],
        numServings: []
    });

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.email;

    var storage = require('../tokenStorage.js');

    const addCard = async event => {
        event.preventDefault();

        var tok = storage.retrieveToken();
        var obj = { userId: userId, card: card.value, jwtToken: tok };
        var js = JSON.stringify(obj);

        try {

            const response = await fetch(bp.buildPath('api/addcard'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let txt = await response.text();
            let res = JSON.parse(txt);

            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('Card has been added');
                storage.storeToken(res.jwtToken);
            }
        }
        catch (e) {
            setMessage(e.toString());
        }

    };

    const searchCard = async event => {
        event.preventDefault();

        var tok = storage.retrieveToken();
        var obj = { userId: userId, search: search.value, jwtToken: tok };
        var js = JSON.stringify(obj);
        try {

            const response = await fetch(bp.buildPath('api/searchcards'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (var i = 0; i < _results.length; i++) {
                resultText += _results[i];
                if (i < _results.length - 1) {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
            storage.storeToken(res.jwtToken);
        }
        catch (e) {
            alert(e.toString());
            setResults(e.toString());
        }
    };

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

    const deleteUserFood  = async (foodName, year, day, month) => {
        var tok = storage.retrieveToken();
        let obj = {foodName: foodName, jwtToken: tok, year: year, day: day, month: month };

        let js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/deleteUserFood'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let res = JSON.parse(await response.text());
            if (res.error === "notDeleted") {
                setMessage("API Error: " + res.error);
            }
            else {
                setMessage('Food has been removed from your meal plan');
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    };

    const updateMealPlan = (newMealPlanData) => {
        setMealPlan(newMealPlanData);
    };

    const getUserMealPlan = async event => {
        event.preventDefault();
        var tok = storage.retrieveToken();
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let obj = { year: year, month: month, day: day, jwtToken: tok };
        let js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/getUserMealPlan'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            let text = await response.text();
            let res = JSON.parse(text);
            setMealPlan(res);
            console.log("mealPlan: ", mealPlan);
            console.log("length: ", mealPlan.nameResults.length);
        } catch (e) {
            setMessage(e.toString());
        }
    };

    console.log("mealPlan:", mealPlan);
    return (
        <div id="cardUIDiv">
            <br />
            <span id="userId">{temp}</span>
            <input
                type="text"
                id="searchText"
                placeholder="Card To Search For"
                ref={(c) => (search = c)}
            />
            <button
                type="button"
                id="searchCardButton"
                className="buttons"
                onClick={searchCard}
            >
                Search Card
            </button>
            <br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p>
            <br />
            <br />
            <input
                type="text"
                id="cardText"
                placeholder="Card To Add"
                ref={(c) => (card = c)}
            />
            <button
                type="button"
                id="addCardButton"
                className="buttons"
                onClick={addCard}
            >
                Add Card
            </button>
            <br />
            <span id="cardAddResult"></span>
            <input
                type="text"
                id="foodName"
                placeholder="Food Name"
                ref={(c) => (foodName = c)}
            />
            <input
                type="text"
                id="calories"
                placeholder="Calories"
                ref={(c) => (calories = c)}
            />
            <input type="text" id="fats" placeholder="Fats" ref={(c) => (fats = c)} />
            <input
                type="text"
                id="carbohydrates"
                placeholder="Carbs"
                ref={(c) => (carbohydrates = c)}
            />
            <input
                type="text"
                id="protein"
                placeholder="Protein"
                ref={(c) => (protein = c)}
            />
            <input
                type="text"
                id="servingSize"
                placeholder="Serving Size"
                ref={(c) => (servingSize = c)}
            />
            <input
                type="text"
                id="numServings"
                placeholder="Servings"
                ref={(c) => (numServings = c)}
            />
            <button
                type="button"
                id="addFoodButton"
                className="buttons"
                onClick={addUserFood}
            >
                Add Food
            </button>
            <button
                type="button"
                id="getMealPlanButton"
                className="buttons"
                onClick={getUserMealPlan}
            >
                Load Todays Meals
            </button>
            <span id="foodAddResult">{message}</span>

            <div className="grid-container">
                {mealPlan.nameResults && mealPlan.nameResults.length > 0 ? (
                    mealPlan.nameResults.map((foodName, index) => (
                        <div key={index} className="grid-item">
                            <h3>{foodName}</h3>
                            <tc>Calories: {mealPlan.caloriesResults[index]}</tc>
                            <tc>Protein: {mealPlan.proteinResults[index]}</tc>
                            <tc>Fats: {mealPlan.fatResults[index]}</tc>
                            <tc>Carbs: {mealPlan.carbsResults[index]}</tc>
                            <tc>Servings: {mealPlan.numServings[index]}</tc>
                            <tc><button onClick={() => deleteUserFood(foodName,mealPlan.year,mealPlan.day,mealPlan.month)}>Delete</button></tc>
                        </div>
                        
                    ))
                    
                )
                 : (
                    <p>Getting user meal plan</p>
                )}
            </div>
            <h3>Totals</h3>
            <tc>Calories: {mealPlan.Calories}</tc>
            <tc>Protein: {mealPlan.Protein}</tc>
            <tc>Fats: {mealPlan.Fats}</tc>
            <tc>Carbs: {mealPlan.Carbs}</tc>
        </div>
    );
}

export default CardUI;
