import api from './api';

export interface LoginPayload {
    username: string;
}

export interface LoginResponse {
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        user: {
            id: number;
            username: string;
            img: string;
        };
    };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/users/login', payload);
    return data;
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};
