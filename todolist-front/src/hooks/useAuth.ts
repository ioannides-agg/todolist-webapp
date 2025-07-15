import axios from 'axios';
import { useState } from 'react';
import type { LoginResponse, LoginRequest, SignupRequest } from '../types/auth';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState<LoginResponse | null>(null);

    const login = async (credentials: LoginRequest): Promise<void> => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post<LoginResponse>('http://localhost:3000/api/auth/login', credentials);
            setUserData(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || 'Login failed.');
            } else {
                setError('Login failed. Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignupRequest) => {
        setLoading(true);
        setError("");
        try {
            await axios.post<SignupRequest>('http://localhost:3000/api/auth/signup', data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Sign up failed.');
            } else {
                setError('Sign up failed. Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUserData(null);
      };

    return {
        userData, //userData right now is irrelevant but can be use later to store info on the user when fetched with a /me or /profile route
        login,
        signup,
        logout,
        loading,
        error,
      };
}