import { useEffect, useState } from 'react';
import axios from 'axios';

function login(email: string, password: string) {
  axios
    .post('http://your-server-url/api/login', { email, password })
    .then((response) => {
      const data = response.data;
    })
    .catch((error) => {
      console.error('Error in login:', error);
    });
}
