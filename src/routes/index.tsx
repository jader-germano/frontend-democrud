import React from 'react';
import { Switch } from 'react-router-dom';
import UserDetail from '../pages/UserDetail';
import SignIn from '../pages/SignIn';
import Route from './Route';

const Routes: React.FC = () => (
    <>
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/userdetail" component={UserDetail} />
        </Switch>
    </>
);

export default Routes;
