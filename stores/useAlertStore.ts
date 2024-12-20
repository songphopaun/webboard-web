import { create } from 'zustand';

interface AlertState {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    showAlert: (
        message: string,
        type: 'success' | 'error' | 'info' | 'warning'
    ) => void;
    hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    isVisible: false,
    message: '',
    type: 'info',
    showAlert: (message, type) => {
        set({ message, type, isVisible: true });
        setTimeout(() => set({ isVisible: false }), 5000);
    },
    hideAlert: () =>
        set({
            isVisible: false,
            message: '',
            type: 'info',
        }),
}));
