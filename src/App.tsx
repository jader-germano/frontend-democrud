import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';

import GlobalStyled from './styles/global';

const App: React.FC = () => (
    <>
        <AppProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AppProvider>
        <GlobalStyled />
    </>
);
export default App;
