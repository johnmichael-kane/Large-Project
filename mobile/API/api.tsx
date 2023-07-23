import axios, { AxiosResponse } from "axios";

export interface LoginResponse {
  Email: string;
  accessToken: string;
  error: string;
}
export interface BigListResponse {
  nameResults: string[];
  caloriesResults: number[];
  proteinResults: number[];
  fatResults: number[];
  carbsResults: number[];
  servingResults: string[];
  error: string;
  accessToken: string;

}
export interface UserMealPlanResponse {
  nameResults: string[];
  caloriesResults: number[];
  proteinResults: number[];
  fatResults: number[];
  carbsResults: number[];
  numServings: number[];
  Calories: number;
  Fats: number;
  Protein: number;
  Carbs: number;
  error: string;
  accessToken: string;
}
export interface AddUserFoodResponse {
  accessToken: string;
  error: string;
}
export interface DeleteUserFoodResponse {
  accessToken: string;
  error: string;
}
export interface PasswordResetRequestResponse {
  code: string;
  error: string;
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<LoginResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login",
        { email, password }
      )
      .then((response: AxiosResponse<LoginResponse>) => {
        const data: LoginResponse = response.data;
        if (data.error === "loginFailure") {
          console.log("Login Error:", data.error);
          resolve(data);
        } else {
          console.log("Login successful!");
          console.log("User ID:", data.Email);
          console.log("Token " + data.accessToken);
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in login: ", error);
        reject(error);
      });
  });
}
// api call that gets the entire big list from the database - /getFood
export function getBigList(accessToken: string): Promise<BigListResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<BigListResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/getFood",
        { jwtToken : accessToken }
      )
      .then((response: AxiosResponse<BigListResponse>) => {
        const data: BigListResponse = response.data;
        if (!(data.error === "")) {
          console.log("Meal Plan Error:", data.error);
          reject(data);
        } else {
          console.log("Got the big list successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in getting big list: ", error);
        reject(error);
      });
  });
}
// api call that gets the user's meal plan
export function GetUserMealPlan(
  year: Number,
  month: Number,
  day: Number,
  accessToken: string
): Promise<UserMealPlanResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<UserMealPlanResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/getUserMealPlan",
        {year: year, month: month, day: day, jwtToken : accessToken }
      )
      .then((response: AxiosResponse<UserMealPlanResponse>) => {
        const data: UserMealPlanResponse = response.data;
        if (data.error === "mealPlanFailure") {
          console.log("Meal Plan Error:", data.error);
          resolve(data);
        } else {
          console.log("Got the meal plan successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in getting meal plan: ", error);
        reject(error);
      });
  });
}
// api call that adds a selected food item to the user's meal plan
export function AddUserFood(
  email: string,
  accessToken: string
): Promise<AddUserFoodResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<AddUserFoodResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/addUserFood",
        { email, accessToken }
      )
      .then((response: AxiosResponse<AddUserFoodResponse>) => {
        const data: AddUserFoodResponse = response.data;
        if (data.error === "addUserFoodError") {
          console.log("Adding Food Error:", data.error);
          resolve(data);
        } else {
          console.log("Added Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in adding food: ", error);
        reject(error);
      });
  });
}
// api call that removes a selected food item from the user's meal plan
export function RemoveUserFood(
  email: string,
  accessToken: string
): Promise<DeleteUserFoodResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<DeleteUserFoodResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/deleteUserFood",
        { email, accessToken }
      )
      .then((response: AxiosResponse<DeleteUserFoodResponse>) => {
        const data: DeleteUserFoodResponse = response.data;
        if (data.error === "addUserFoodError") {
          console.log("Adding Food Error:", data.error);
          resolve(data);
        } else {
          console.log("Added Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in adding food: ", error);
        reject(error);
      });
  });
}
// api call(s) that is/are used for password reset
export function PasswordResetRequest(
  email: string
): Promise<PasswordResetRequestResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<PasswordResetRequestResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/requestResetPassword",
        { email }
      )
      .then((response: AxiosResponse<PasswordResetRequestResponse>) => {
        const data: PasswordResetRequestResponse = response.data;
        if (data.error === "addUserFoodError") {
          console.log("Adding Food Error:", data.error);
          resolve(data);
        } else {
          console.log("Added Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in adding food: ", error);
        reject(error);
      });
  });
}
// api call(s) that is/are used for email verification
