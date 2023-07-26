import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Accordion from 'react-bootstrap/Accordion';
import "react-datepicker/dist/react-datepicker.css";

function CardUI() {
  let bp = require("./Path.js");
  var goal;
  const [message, setMessage] = useState("");
  const [calorieMessage, setCalorieMessage] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");
  var temp = "";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState({
    nameResults: [],
    caloriesResults: [],
    proteinResults: [],
    fatResults: [],
    carbsResults: [],
    numServings: [],
  });

  var storage = require("../tokenStorage.js");

    const deleteUserFood = async (foodName, year, day, month) => {
    const deleteConfirmation = window.confirm(
      `Do you want to remove ${foodName} from your meal plan?`,
    );
    if (deleteConfirmation) {
      try {
        var tok = storage.retrieveToken();
        let obj = {
          foodName: foodName,
          jwtToken: tok,
          year: year,
          day: day,
          month: month,
        };

        let js = JSON.stringify(obj);

        try {
          const response = await fetch(bp.buildPath("api/deleteUserFood"), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
          });

          let res = JSON.parse(await response.text());
          if (res.error === "notDeleted") {
            setMessage("API Error: " + res.error);
          } else {
            setMessage("Food has been removed from your meal plan");
            getUserMealPlan();
          }
        } catch (e) {
          setMessage(e.toString());
        }
      } catch (e) {
        setMessage(e.toString());
      }
    }
  };

  const handleLoadTodayMeals = () => {
    const currentDate = new Date();

    setSelectedDate(currentDate);

    getUserMealPlan(currentDate);
  };

  const updateMealPlan = (newMealPlanData) => {
    setMealPlan(newMealPlanData);
  };

  const resetCalorieGoal = async (newGoal) => {
    var tok = storage.retrieveToken();
    if(newGoal <= 0){
      setCalorieMessage('Please set a goal greater than 0');
      return;
    }
    let obj = { jwtToken: tok, newGoal: newGoal };
    let js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/resetCalorieGoal"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      let text = await response.text();
      let res = JSON.parse(text);
      if (res.error === "worked") setCalorieMessage("Calorie Goal reset");
    } catch (e) {
      setCalorieMessage(e.toString());
    }
    getCalorieGoal();
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    } else {
      // Handle the case when the user clears the date
      // For example, you can show an alert or reset the selected date to today
      alert("Please select a valid date.");
      // Alternatively, you can set the selected date to a default value, for example, today's date
      setSelectedDate(new Date());
    }
  };

  const getCalorieGoal = async event => {
    var tok = storage.retrieveToken();
    let obj = { jwtToken: tok };
    console.log("Token: " + obj);
    let js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/getCalorieGoal"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" }
      })

      let text = await response.text();
      let res = JSON.parse(text);
      setCalorieGoal(res.calorieGoal);
      console.log(calorieGoal);
    }
    catch (e) {
      setCalorieGoal(e.toString());
    }
  };



  const getUserMealPlan = async () => {
    var tok = storage.retrieveToken();
    const date = selectedDate;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let obj = { year: year, month: month, day: day, jwtToken: tok };
    let js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/getUserMealPlan"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let text = await response.text();
      let res = JSON.parse(text);
      setMealPlan(res);
      getCalorieGoal();
      console.log("mealPlan: ", mealPlan);
      console.log("length: ", mealPlan.nameResults.length);
    } catch (e) {
      setMessage(e.toString());
    }
  };

  useEffect(() => {
    getUserMealPlan();
  }, [selectedDate]);

  console.log("mealPlan:", mealPlan);

  return (
    <div id="cardUIDiv" style={{ width: '100%', textAlign: 'center' }}>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Load Another Day's Plan"
      />

      <button
        type="button"
        id="getMealPlanButton"
        className="buttons"
        onClick={handleLoadTodayMeals}
      >
        Load Today's Meals
      </button>
      <br/>
      <span>{message}</span>
      <br/>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap5.min.css"
      ></link>

      <script defer src="https://code.jquery.com/jquery-3.7.0.js"></script>
      <script
        defer
        src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"
      ></script>
      <script
        defer
        src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap5.min.js"
      ></script>
      <script defer src="script.js"></script>
      <table
        id="example"
        className="table"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <thead class="table-dark" style={{ top: '0px', position: 'sticky' }}>
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
              <td>{mealPlan.fatResults[index]}g</td>
              <td>{mealPlan.carbsResults[index]}g</td>
              <td>{mealPlan.proteinResults[index]}g</td>
              <td>{mealPlan.numServings[index]}</td>
              <td class="table-dark">
                <button
                  onClick={() =>
                    deleteUserFood(
                      foodName,
                      mealPlan.year,
                      mealPlan.day,
                      mealPlan.month,
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p>Choose Meals from a Different Day, or Click Today's Meal Plan</p>
        )}
        <tfoot class="table-secondary" style={{ bottom: '0px', position: 'sticky' }}>
          <tr>
            <th>Totals:</th>
            <th>{mealPlan.Calories}</th>
            <th>{mealPlan.Fats}g</th>
            <th>{mealPlan.Carbs}g</th>
            <th>{mealPlan.Protein}g</th>
            <th>Calorie Goal: {calorieGoal}</th>
            <th> 
              <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0" style={{ marginLeft: '20%', width: '50%'}}>
                <Accordion.Header>Edit Calorie Goal</Accordion.Header>
                <Accordion.Body>
                  <span>{calorieMessage}</span>
                  <br/>
                  <input type="number" id="goalBox" style={{marginRight: '1px', width: '50%'}}placeholder={calorieGoal} required ref={(c) => (goal = c)} />
                  <button type="button" id="editGoalButton" className="buttons"
                    onClick={() => resetCalorieGoal(goal.value)} >
                    Submit </button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CardUI;
