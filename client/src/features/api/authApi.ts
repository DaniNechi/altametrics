import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

const authApi = {
  login: async (credentials: LoginDto): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
};

export default authApi; 