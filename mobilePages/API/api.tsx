import axios, { AxiosResponse } from "axios";

export interface LoginResponse {
  Email: string;
  calorieGoal: number;
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
  jwtToken: string;
  error: string;
}
export interface DeleteUserFoodResponse {
  jwtToken: string;
  error: string;
}
export interface PasswordResetRequestResponse {
  code: string;
  error: string;
}
export interface CalorieResetRequestResponse {
  error: string;
}
export interface EnterPasswordResetRequestResponse {
  error: string;
}
export interface EmailVerificationRequestResponse {
  error: string;
}
export interface RegisterResponse {
  error: string;
}
export interface GetUserCalorieGoalResponse {
  calorieGoal: number;
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
        { jwtToken: accessToken }
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
        { year: year, month: month, day: day, jwtToken: accessToken }
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
  foodName: string,
  calories: number,
  fats: number,
  carbohydrates: number,
  protein: number,
  servingSize: string,
  numServings: number,
  accessToken: string
): Promise<AddUserFoodResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<AddUserFoodResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/addUserFood",
        {
          foodName: foodName,
          calories: calories,
          fats: fats,
          carbohydrates: carbohydrates,
          protein: protein,
          servingSize: servingSize,
          numServings: numServings,
          jwtToken: accessToken,
        }
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
  foodName: string,
  accessToken: string,
  year: number,
  day: number,
  month: number
): Promise<DeleteUserFoodResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<DeleteUserFoodResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/deleteUserFood",
        {
          foodName: foodName,
          jwtToken: accessToken,
          year: year,
          day: day,
          month: month,
        }
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
        if (data.error != "email sent") {
          console.log("Error:", data.error);
          resolve(data);
        } else {
          console.log("Sent Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in sending request: ", error);
        reject(error);
      });
  });
}
export function ResetPasswordAPI(
  email: string,
  newPassword: string,
  code: string
): Promise<EnterPasswordResetRequestResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<EnterPasswordResetRequestResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/resetPassword",
        { email, newPassword, code }
      )
      .then((response: AxiosResponse<EnterPasswordResetRequestResponse>) => {
        const data: EnterPasswordResetRequestResponse = response.data;
        if (data.error != "email sent") {
          console.log("Error:", data.error);
          resolve(data);
        } else {
          console.log("Sent Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in sending request: ", error);
        reject(error);
      });
  });
}
// api call calorie goal reset

export function CalorieResetRequest(
  accessToken: string,
  newGoal: number
): Promise<CalorieResetRequestResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<CalorieResetRequestResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/resetCalorieGoal",
        { jwtToken: accessToken, newGoal: newGoal }
      )
      .then((response: AxiosResponse<CalorieResetRequestResponse>) => {
        const data: CalorieResetRequestResponse = response.data;
        if (!(data.error === "worked")) {
          console.log("Calorie goal reset error: ", data.error);
          resolve(data);
        } else {
          console.log("Calorie goal reset successfully");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in  resetting calorie goal: ", error);
        reject(error);
      });
  });
}

// api call(s) that is/are used for email verification
export function EmailVerificationRequest(
  email: string
): Promise<EmailVerificationRequestResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<EmailVerificationRequestResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/requestEmailAuthorization",
        { email }
      )
      .then((response: AxiosResponse<EmailVerificationRequestResponse>) => {
        const data: EmailVerificationRequestResponse = response.data;
        if (!(data.error === "email sent")) {
          console.log("Email verification error: ", data.error);
          resolve(data);
        } else {
          console.log("Email sent successfully");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in email verification: ", error);
        reject(error);
      });
  });
}

// api call used for user registration
export function Register(
  email: string,
  password: string
): Promise<RegisterResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<RegisterResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/register",
        { email, password }
      )
      .then((response: AxiosResponse<RegisterResponse>) => {
        const data: RegisterResponse = response.data;
        if (!(data.error === "email sent")) {
          console.log("User Registration error: ", data.error);
          resolve(data);
        } else {
          console.log("User Registered successfully");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in User Registration: ", error);
        reject(error);
      });
  });
}
//api call to get user's calorie goal
export function GetUserCalorieGoal(
  jwtToken: string
): Promise<GetUserCalorieGoalResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<GetUserCalorieGoalResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/getCalorieGoal",
        { jwtToken }
      )
      .then((response: AxiosResponse<GetUserCalorieGoalResponse>) => {
        const data: GetUserCalorieGoalResponse = response.data;
        if (!(data.error === "success")) {
          console.log("Couldn't get calorie goal: ", data.error);
          resolve(data);
        } else {
          console.log("Got calorie goal");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in getting calorie goal: ", error);
        reject(error);
      });
  });
}
