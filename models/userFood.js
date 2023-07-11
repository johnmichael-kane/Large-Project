const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserFoodSchema = new Schema({
  UserId: {
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
  type: Number
  },
});

module.exports = UserFood = mongoose.model('UserMealPlans', UserFoodSchema);
