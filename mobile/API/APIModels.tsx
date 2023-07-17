export class User {
  Email: string;
  Password: string;
  CalorieGoal: number;
  constructor(Email: string, Password: string, CalorieGoal: number) {
    this.Email = Email;
    this.Password = Password;
    this.CalorieGoal = CalorieGoal;
  }
}
export class Food {
  FoodName: string;
  Calories: number;
  Protein: number;
  Fats: number;
  Carbs: number;
  ServingSize: number;
  date: Date;
  constructor(
    foodName: string,
    calories: number,
    protein: number,
    fats: number,
    carbs: number,
    ServingSize: number,
    date: Date
  ) {
    this.FoodName = foodName;
    this.Calories = calories;
    this.Protein = protein;
    this.Fats = fats;
    this.Carbs = carbs;
    this.ServingSize = ServingSize;
    this.date = date;
  }
}
export class MealPlan {
  nameResults: string[];
  calorieResults: number[];
  proteinResults: number[];
  fatResults: number[];
  carbsResults: number[];
  numServings: number[];
  Fats: number;
  Protein: number;
  Carbs: number;
  totalCalories: number;
  constructor(
    nameResults: string[],
    calorieResults: number[],
    proteinResults: number[],
    fatResults: number[],
    carbsResults: number[],
    numServings: number[],
    Fats: number,
    Protein: number,
    Carbs: number,
    totalCalories: number
  ) {
    this.nameResults = nameResults;
    this.calorieResults = calorieResults;
    this.proteinResults = proteinResults;
    this.fatResults = fatResults;
    this.carbsResults = carbsResults;
    this.numServings = numServings;
    this.Fats = Fats;
    this.Protein = Protein;
    this.Carbs = Carbs;
    this.totalCalories = totalCalories;
  }
}
