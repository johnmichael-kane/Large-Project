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

export interface EmailVerificationRequestResponse{
  error: string;
}

export interface PasswordResetResponse {
  error: string;
}

export interface EmailVerifyResponse {
  error: string;
}

export interface VerifyEmailResponse {
  error: string;
}

export interface RegisterResponse {
  error: string;
}


export function Register(email: string, password: string): Promise<RegisterResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<RegisterResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login",
        {email: email, password: password }
      )
      .then((response: AxiosResponse<RegisterResponse>) => {
        const data: RegisterResponse = response.data;
        if (data.error === "exists") {
          console.log("Register Error: ", data.error);
          resolve(data);
        } else {
          console.log("Register successful!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in login: ", error);
        reject(error);
      });
  });
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
        if (!(data.error === "success")) {
          console.log("Meal Plan Error: ", data.error);
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
        { email: email, jwtToken: accessToken }
      )
      .then((response: AxiosResponse<AddUserFoodResponse>) => {
        const data: AddUserFoodResponse = response.data;
        if (!(data.error === "added")) {
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
        { email: email, jwtToken : accessToken }
      )
      .then((response: AxiosResponse<DeleteUserFoodResponse>) => {
        const data: DeleteUserFoodResponse = response.data;
        if (data.error === "notDeleted") {
          console.log("Deleting Food Error:", data.error);
          resolve(data);
        } else if (data.error === "deleted"){
          console.log("Deleted Successfully!");
          resolve(data);
        } else {
          console.log(data.error);
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in deleting food: ", error);
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
        { email : email }
      )
      .then((response: AxiosResponse<PasswordResetRequestResponse>) => {
        const data: PasswordResetRequestResponse = response.data;
        if (!(data.error === "email sent")) {
            console.log("Password Reset Existence Error: ", data.error);

          resolve(data);
        } else {
          console.log("Password recent email successful!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in password reset request: ", error);
        reject(error);
      });
  });
}

export function PasswordReset(
  email: string
): Promise<PasswordResetResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<PasswordResetResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/resetPassword",
        { email : email }
      )
      .then((response: AxiosResponse<PasswordResetResponse>) => {
        const data: PasswordResetResponse = response.data;
        if (!(data.error === "worked")) {
          console.log("Password Reset Error: ", data.error);
          resolve(data);
        } else {
          console.log("Password Reset Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in resetting password: ", error);
        reject(error);
      });
  });
}

export function EmailVerificationRequest(
  email: string
): Promise<EmailVerificationRequestResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<EmailVerificationRequestResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/requestEmailAuthorization",
        { email : email}
      )
      .then((response: AxiosResponse<EmailVerificationRequestResponse>) => {
        const data: EmailVerificationRequestResponse = response.data;
        if (!(data.error === "email sent")) {
          console.log("Email verification error: ", data.error);
          resolve(data);
        } else {
          console.log("Verification email sent Successfully!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in sending verification email: ", error);
        reject(error);
      });
  });
}

export function VerifyEmail(
  email: string
): Promise<VerifyEmailResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<VerifyEmailResponse>(
        "https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/verifyEmail",
        { email : email }
      )
      .then((response: AxiosResponse<VerifyEmailResponse>) => {
        const data: VerifyEmailResponse = response.data;
        if (!(data.error === 'worked')) {
          console.log("Email verification Error: ", data.error);
          resolve(data);
        } else {
          console.log("Email verified!");
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error("Error in verifying email: ", error);
        reject(error);
      });
  });
}

// api call(s) that is/are used for email verification
