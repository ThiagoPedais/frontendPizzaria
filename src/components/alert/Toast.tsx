'use client'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Toast = () => {
    return <ToastContainer autoClose={3000} />;
};

export default Toast;