import { Grid } from 'gridjs-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function GridUI(){
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const grid = new Grid({
        columns: [{
            id: 'nameResults',
            name: 'Food'
        }, {
            id: 'caloriesResults',
            name: 'Calories'
        }, {
            id: 'proteinResults',
            name: 'Protein'
        }, {
            id: 'fatResults',
            name: 'Fat'
        }, {
            id: 'carbsResults',
            name: 'Carbs'
        }, {
            id: 'numServings',
            name: 'Servings'
        }],
        search: true,
        pagination: true,
        sort: true,
        fixedHeader: true,
        height: '400px',

        data: Meals //@TODO Make this an API call
    })

    return( //@TODO Do the HTML here
        <div id = "gridDiv">
        </div>
    );
};
export default GridUI;