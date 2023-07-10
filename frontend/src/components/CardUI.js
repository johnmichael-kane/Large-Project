import React, { useState } from 'react';
import {useJwt} from 'react-jwt';

function CardUI()
{
    let bp = require('./Path.js');
    var card = '';
    var search = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;

    var storage = require('../tokenStorage.js');
 /*   const app_name = 'group7-largeproject-fcbd9bb42321'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else  let bp = require('.Path.js');
            return 'http://localhost:5000/' + route;
        }
    }    
*/
    const addCard = async event => 
    {
	    event.preventDefault();

        //let obj = {userId:userId,card:card.value};
        //let js = JSON.stringify(obj);

        var tok = storage.retrieveToken();
        var obj = {userId: userId, card: card.value, jwtToken:tok};
        var js = JSON.stringify(obj);

        try
        {
//          const response = await fetch('http://localhost:5000/api/addcard',
            const response = await fetch(bp.buildPath('api/addcard'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
                storage.storeToken(res.jwtToken);
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

    const searchCard = async event => 
    {
        event.preventDefault();
        		
//        let obj = {userId:userId,search:search.value};
//        let js = JSON.stringify(obj);
        var tok = storage.retrieveToken();
        var obj = {userId: userId, search: search.value, jwtToken:tok};
        var js = JSON.stringify(obj);
        try
        {
//          const response = await fetch('http://localhost:5000/api/searchcards',
            const response = await fetch(bp.buildPath('api/searchcards'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
            storage.storeToken(res.jwtToken);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };
/*
    const addUserFood = async event => 
    {
	    event.preventDefault();

        let obj = {userId:userId,food:foodName, calories: calories};
        let js = JSON.stringify(obj);

        try
        {
//          const response = await fetch('http://localhost:5000/api/addcard',
            const response = await fetch(bp.buildPath('api/addUserFood'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
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
    */

    return(
        <div id="cardUIDiv">
        <br />
        <input type="text" id="searchText" placeholder="Card To Search For" 
          ref={(c) => search = c} />
        <button type="button" id="searchCardButton" class="buttons" 
          onClick={searchCard}> Search Card</button><br />
        <span id="cardSearchResult">{searchResults}</span>
        <p id="cardList">{cardList}</p><br /><br />
        <input type="text" id="cardText" placeholder="Card To Add" 
          ref={(c) => card = c} />
        <button type="button" id="addCardButton" class="buttons" 
          onClick={addCard}> Add Card </button><br />
        <span id="cardAddResult">{message}</span>
      </div>
      
    );
}

export default CardUI;
