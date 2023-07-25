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
                getUserMealPlan();
            }
        }
        catch (e) {
            setMessage(e.toString());
        }
    }

    const deleteUserFood  = async (foodName, year, day, month) => {
      const deleteConfirmation = window.confirm(`Do you want to remove ${foodName} from your meal plan?`);
  if (deleteConfirmation) {
    try {
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
              getUserMealPlan();
          }
      }
      catch (e) {
          setMessage(e.toString());
      }
    } catch (e) {
      setMessage(e.toString());
    }
  }
};

    const updateMealPlan = (newMealPlanData) => {
        setMealPlan(newMealPlanData);
    };

    const getUserMealPlan = async () => {
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

    useEffect(() => {
        getUserMealPlan();
      }, []);

    console.log("mealPlan:", mealPlan);
    return (
        <div id="cardUIDiv">
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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap5.min.css"></link>

            <script defer src="https://code.jquery.com/jquery-3.7.0.js"></script>
            <script defer src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
            <script defer src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js"></script>
            <script defer src="script.js"></script>
            <table id="example" class="table" style={{width: '100%'}}>
        <thead class="table-dark">
            <tr>
                <th>Food Name</th>
                <th>Calories</th>
                <th>Fats</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Servings</th>
                <th> </th>
            </tr>
        </thead>
        {mealPlan.nameResults && mealPlan.nameResults.length > 0 ? (
                    mealPlan.nameResults.map((foodName, index) => (
                        <tr key={index}>
                            <td>{foodName}</td>
                            <td>{mealPlan.caloriesResults[index]}</td>
                            <td>{mealPlan.fatResults[index]}</td>
                            <td>{mealPlan.carbsResults[index]}</td>
                            <td>{mealPlan.proteinResults[index]}</td>
                            <td>{mealPlan.numServings[index]}</td>
                            <td class="table-dark"><button onClick={() => deleteUserFood(foodName,mealPlan.year,mealPlan.day,mealPlan.month)}>Delete</button></td>
                        </tr>
                        
                    ))
                    
                )
                 : (
                    <p>Getting user meal plan</p>
                )}
        <tfoot class="table-secondary">
            <tr>
                <th>Totals:</th>
                <th>{mealPlan.Calories}</th>
                <th>{mealPlan.Fats}</th>
                <th>{mealPlan.Carbs}</th>
                <th>{mealPlan.Protein}</th>
                <th>Servings</th>
                <th> </th>
            </tr>
        </tfoot>
    </table>
        </div>
    );
}

export default CardUI;
