const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserFoodSchema = new Schema({
  Email: {
    type: String
  },
  Year: {
  type: Number
  },
  Month:{
  type: Number
  },
  Day:{
  type: Number
  },
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
  type: String,
  required: true
  },
  NumServings: {
    type: Number
  }
});

module.exports = UserFood = mongoose.model('UserMealPlans', UserFoodSchema);
