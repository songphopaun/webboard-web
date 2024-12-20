'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import notebook from '../assets/images/notebook.png';
import { login } from '@/services/auth';
import { useUserStore, useAlertStore } from '../../stores';
import { useEffect, useState } from 'react';
import axios from 'axios';

type LoginFormValues = {
    username: string;
};

export default function Login() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const showAlert = useAlertStore.getState().showAlert;

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await login({ username: data.username });
            localStorage.setItem('accessToken', res.data.accessToken);
            setUser(
                res.data.user.id,
                res.data.user.username,
                res.data.user.img
            );
            router.push('/');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showAlert(
                    error.response?.data?.message ||
                        'An unexpected error occurred.',
                    'error'
                );
            } else {
                showAlert(
                    'An unexpected system error occurred. Please try again later.',
                    'error'
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-brand-green500 flex flex-col-reverse md:flex-row text-white">
            <div className="flex-1 md:w-3/5 flex items-center justify-center p-8">
                <form
                    className="w-full max-w-md space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-2xl mb-2">Sign in</h1>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-full p-1.5 font-ibm text-black border rounded-md focus:ring-2 focus:ring-brand-green500 focus:outline-none"
                        {...register('username', {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Username must be at least 3 characters long',
                            },
                        })}
                    />
                    {errors.username && (
                        <p className="text-base-error">
                            {String(errors.username.message)}
                        </p>
                    )}

                    <button
                        disabled={isLoading}
                        className={`w-full py-2 bg-base-success rounded-lg font-ibm font-semibold text-sm hover:bg-brand-green300 ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-base-success hover:bg-brand-green300'
                        }`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
            <div className="h-2/5 md:h-auto md:w-2/5 bg-brand-green300 flex flex-col items-center justify-center rounded-b-3xl md:rounded-l-3xl md:rounded-none">
                <Image
                    src={notebook}
                    alt="Notebook Logo"
                    height={150}
                    className="w-32 h-32 md:w-[300px] md:h-[300px] mb-4"
                />
                <h1 className="font-castoro italic text-xl md:text-2xl">
                    a Board
                </h1>
            </div>
        </div>
    );
}
