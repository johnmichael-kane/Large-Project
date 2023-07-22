import axios, { AxiosResponse } from 'axios';

export interface LoginResponse {
  Email: string;
  accessToken: string;
  error: string;
}

export function login(email: string, password: string) : Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
  axios
    .post<LoginResponse>('https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login', { email, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      const data: LoginResponse = response.data;
      if (data.error === "loginFailure") {
        console.log('Login Error:', data.error);
        resolve(data);
      } else {
          console.log('Login successful!');
          console.log('User ID:', data.Email);
          console.log('Token ' + data.accessToken)
        resolve(data);
    
      }
    })
    .catch((error: any) => {
      console.error('Error in login:', error);
      reject(error);
    });
});
}
