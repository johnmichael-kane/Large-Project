import React, {useState } from 'react';
import { useJwt } from 'react-jwt';

function CardUI() {

    let email = "";
    let bp = require('./Path.js');
    var card = '';
    var search = '';
    var foodName, calories, fats, protein, carbohydrates, servingSize, numServings;
    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');
    var temp = ''

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
    
        const addUserFood = async event => 
        {
            event.preventDefault();
    
            var tok = storage.retrieveToken();
            let obj = {foodName: foodName.value, calories: calories.value, fats: fats.value, 
                carbohydrates: carbohydrates.value, protein: protein.value, servingSize: servingSize.value, 
                numServings: numServings.value, jwtToken: tok};
            let js = JSON.stringify(obj);
    
            try
            {
                const response = await fetch(bp.buildPath('api/addUserFood'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                let res = JSON.parse(await response.text());
                temp = res.toString;
                if( res.error === "notAdded" )
                {
                    setMessage( "API Error: " + res.error );
                }
                else
                {
                    setMessage('Food has been added to your meal plan');
                }
            }
            catch(e)
            {
                setMessage(e.toString());
            }
    
        }
       

    return (
        <div id="cardUIDiv">
            <br />
            <span id="userId">{temp}</span>
            <input type="text" id="searchText" placeholder="Card To Search For"
                ref={(c) => search = c} />
            <button type="button" id="searchCardButton" class="buttons"
                onClick={searchCard}> Search Card</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            <input type="text" id="cardText" placeholder="Card To Add"
                ref={(c) => card = c} />
            <button type="button" id="addCardButton" class="buttons"
                onClick={addCard}>Add Card</button><br />
            <span id="cardAddResult">{email}</span>
            <input type="text" id="foodName" placeholder="Food Name"
                ref={(c) => foodName = c}/>
            <input type="text" id="calories" placeholder="Calories"
                ref={(c) => calories= c}/>
            <input type="text" id="fats" placeholder="Fats"
                ref={(c) => fats = c}/>
            <input type="text" id="carbohydrates" placeholder="Carbs"
                ref={(c) => carbohydrates = c}/>
            <input type="text" id="protein" placeholder="Protein"
                ref={(c) => protein = c}/>
            <input type="text" id="servingSize" placeholder="Serving Size"
                ref={(c) => servingSize = c}/>
            <input type="text" id="numServings" placeholder="Servings"
                ref={(c) => numServings = c}/>    
            <button type="button" id="addFoodButton" class="buttons"
                onClick={addUserFood}>Please</button>
            <span id="foodAddResult">{message}</span>
        </div>

    );
}

export default CardUI;
