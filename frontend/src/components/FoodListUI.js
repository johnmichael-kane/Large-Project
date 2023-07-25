import React, { useState, useEffect } from 'react';

function FoodListUI() {
    let bp = require('./Path.js');
    var search = '';
    var temp = '';
    var foodName, calories, fats, protein, carbohydrates, servingSize, numServings;
    const [message, setMessage] = useState('');
    const [foods, setFoods] = useState({
    nameResults: [],
    caloriesResults: [],
    proteinResults: [],
    fatResults: [],
    carbsResults: [],
    servingResults: []
  });
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
const [searchQuery, setSearchQuery] = useState('');
    var storage = require('../tokenStorage.js');
const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 const filteredFoods = foods.nameResults.filter(
    (foodName) =>
      foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const getFood = async (event) => {
  event.preventDefault();
  var tok = storage.retrieveToken();
  let obj = { jwtToken: tok };
  let js = JSON.stringify(obj);
  try {
    const response = await fetch(bp.buildPath('api/getFood'), {
      method: 'POST',
      body: js,
      headers: { 'Content-Type': 'application/json' }
    });

    let text = await response.text();
    let res = JSON.parse(text);

    console.log("API response:", res);

    if (Array.isArray(res.nameResults)) {
      const { nameResults, caloriesResults, proteinResults, fatResults, carbsResults, servingResults } = res;
      setFoods({ nameResults, caloriesResults, proteinResults, fatResults, carbsResults, servingResults });
    } else {
      setMessage("API Response Error");
    }
  } catch (e) {
    setMessage(e.toString());
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
console.log("foods:", foods);
     return (
    <div id="FoodListUIDiv">
      <br />
      <span id="userId">{temp}</span>
      { }
      <input
        type="text"
        placeholder="Search food..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="button" className="buttons" onClick={getFood}>
        Load all foods
      </button>
      <span id="foodAddResult">{message}</span>

      <div className="grid-container">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((foodName, index) => (
            <div key={index} className="grid-item">
              <h3>{foodName}</h3>
              <p>Calories: {foods.caloriesResults[index]}</p>
              <p>Protein: {foods.proteinResults[index]}</p>
              <p>Fats: {foods.fatResults[index]}</p>
              <p>Carbs: {foods.carbsResults[index]}</p>
              <p>Serving Size: {foods.servingResults[index]}</p>
              <button onClick={(event) => addUserFood(event, foodName)}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p>No matching foods found.</p>
        )}
      </div>
    </div>
  );
}

export default FoodListUI;
