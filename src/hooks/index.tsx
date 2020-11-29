import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
    <ToastProvider>{children}</ToastProvider>
);

export default AppProvider;
