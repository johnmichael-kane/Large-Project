const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const DatabaseFoodSchema = new Schema({

  FoodName: {
    type: String,
    required: true
  },
  Calories: {
    type: Number
  },
  Fats: {
    type: Number
  },
  Carbohydrates: {
  type: Number
  },
  Protein: {
  type: Number
  },
  ServingSize: {
  type: Number
  }
});

module.exports = DatabaseFood = mongoose.model('Food', DatabaseFoodSchema);
