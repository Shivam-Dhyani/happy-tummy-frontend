import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    toast(message, { type });
};
