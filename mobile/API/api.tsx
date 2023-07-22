import axios, { AxiosResponse } from 'axios';

export interface LoginResponse {
  Email: string;
  error: string;
}

export function login(email: string, password: string) {
  axios
    .post<LoginResponse>('https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login', { email, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      const data: LoginResponse = response.data;
      if (data.error) {
        console.error('Login Error:', data.error);
      } else {
        const { Email, error } = data;
        console.log('Login successful!');
        console.log('User ID:', email);
        console.log('error: ', error);
      }
    })
    .catch((error: any) => {
      console.error('Error in login:', error);
    });
}
