import axios, { AxiosResponse } from 'axios';

export interface LoginResponse {
  Email: string;
  error: string;
}

export function login(Email: string, Password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<LoginResponse>('https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login', { Email, Password })
      .then((response: AxiosResponse<LoginResponse>) => {
        const data: LoginResponse = response.data;
        if (data.error) {
          console.log('Login Error:', data.error);
          reject(new Error(data.error));
        } else {
          console.log('Login successful!');
          console.log('User ID:', data.Email);
          resolve(data);
        }
      })
      .catch((error: any) => {
        console.error('Error in login:', error);
        reject(error);
      });
  });
}
