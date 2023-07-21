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
    })
    .catch((error: any) => {
      console.error('Error in login:', error);
    });
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    login(email, password);
  };
  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
