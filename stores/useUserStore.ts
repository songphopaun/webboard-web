import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    id: number | null;
    username: string;
    img: string;
    setUser: (id: number, username: string, img: string) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            id: null,
            username: '',
            img: '',
            setUser: (id: number, username: string, img: string) =>
                set({ id, username, img }),
            resetUser: () => set({ id: null, username: '', img: '' }),
        }),
        {
            name: 'user-store',
        }
    )
);
