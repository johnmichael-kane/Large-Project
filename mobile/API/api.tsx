import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  userId: number;
  firstName: string;
  lastName: string;
  error: string;
}

function login(email: string, password: string) {
  axios
    .post<LoginResponse>('/api/login', { email, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      const data: LoginResponse = response.data;
      if (data.error) {
        console.error('Login Error:', data.error);
      } else {
        const { userId, firstName, lastName } = data;
        console.log('Login successful!');
      }
    })
    .catch((error: any) => {
      console.error('Error in login:', error);
    });
}
