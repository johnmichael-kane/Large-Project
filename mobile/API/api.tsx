import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  userId: number;
  firstName: string;
  lastName: string;
  error: string;
}

function login(email: string, password: string) {
  axios
    .post<LoginResponse>('https://group7-largeproject-fcbd9bb42321.herokuapp.com/api/login', { email, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      const data: LoginResponse = response.data;
      if (data.error) {
        console.error('Login Error:', data.error);
      } else {
        const { userId, firstName, lastName } = data;
        console.log('Login successful!');
        console.log('User ID:', userId);
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
      }
    })
    .catch((error: any) => {
      console.error('Error in login:', error);
    });
}
