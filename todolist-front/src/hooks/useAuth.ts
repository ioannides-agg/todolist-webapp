import axios from 'axios';
import { useState } from 'react';
import type { UserData, LoginRequest, SignupRequest } from '../types/auth';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = async (credentials: LoginRequest): Promise<void> => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);

            const token = response.data.accessToken;
            setAccessToken(token);
            
            if (token) {
                localStorage.setItem('token', response.data.accessToken);
                await getProfile(response.data.accessToken);
            }
        } catch (error) {
            setAuth(false);
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
        setAuth(false);
        setUserData(null);
        setAccessToken(null);
        localStorage.removeItem('token');
      };

    const getProfile = async (accessToken: string | null): Promise<boolean> => {
        try {
            const res = await axios.get<UserData>('http://localhost:3000/api/auth/me', {
                headers: { authorization: `Bearer ${accessToken}`}
            })

            setUserData(res.data)
            setAuth(true);
            return true;
        } catch {
            setAuth(false);
            setUserData(null);
            setAccessToken(null);
            localStorage.clear();
            return false;
        }
    }

    return {
        userData,
        auth,
        accessToken,
        login,
        signup,
        logout,
        loading,
        error,
        getProfile,
      };
}