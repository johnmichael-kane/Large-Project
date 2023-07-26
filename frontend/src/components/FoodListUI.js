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

  const [servings, getServings] = useState([]);

  const updateServings = (index, value) => {
    getServings((previous) =>
      previous.map((last, i) => (i === index ? value : last))
    );
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
      const initialServings = res.nameResults.map(() => 1); // Default value is 1, change it as needed
      getServings(initialServings);
    } else {
      setMessage("API Response Error");
    }
  } catch (e) {
    setMessage(e.toString());
  }
};

    const addUserFood = async (foodName,calories,protein,fat,carbs,servingSize, numServings) => {
        if(numServings <= 0)
        {
          setMessage("Serving size must be greater than zero.")
          return;
        }
        var tok = storage.retrieveToken();
        let obj = {foodName: foodName, calories: calories, fats: fat, carbohydrates : carbs, protein : protein,
           servingSize : servingSize, numServings: numServings, jwtToken: tok};
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

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap5.min.css"></link>

            <script defer src="https://code.jquery.com/jquery-3.7.0.js"></script>
            <script defer src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
            <script defer src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js"></script>
            <script defer src="script.js"></script>
            <table id="example" class="table" style={{width: '100%', textAlign: 'center'}}>
        <thead class="table-dark" style={{top: '0px', position: 'sticky'}} >
            <tr>
                <th>Food Name</th>
                <th>Calories</th>
                <th>Fats</th>
                <th>Carbs</th>
                <th>Protein</th>
                <th>Serving Size</th>
                <th> </th>
            </tr>
        </thead>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((foodName, index) => (
                        <tr key={index}>
                            <td>{foodName}</td>
                            <td>{foods.caloriesResults[index]}</td>
                            <td>{foods.proteinResults[index]}g</td>
                            <td>{foods.fatResults[index]}g</td>
                            <td>{foods.carbsResults[index]}g</td>
                            <td>{foods.servingResults[index]}</td>
                            <td class="table-dark"><input
                               type="number"
                               placeholder="Total Servings"
                               value ={servings[index]}
                               onChange={(e) => updateServings(index, e.target.value)}
                              /><button onClick={() => addUserFood(foodName, foods.caloriesResults[index],
                               foods.proteinResults[index], foods.fatResults[index], foods.carbsResults[index], foods.servingResults[index],servings[index])}>Add</button>
                            </td>
                        </tr>
                    ))
                    
                )
                 : (
                    <p>No matching foods found.</p>
                )}
    </table>
    </div>
  );
}

export default FoodListUI;
