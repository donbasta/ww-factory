import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LogoutPage = (props) => {
    const authContext = useContext(AuthContext);

    return (
        <div>
            <h3>You've been logged out</h3>
            <h5>You'll be redirected to the login page</h5>
            {async () => {
                await authContext.logout();
            }}
            <Redirect to='/login' />;
        </div>
    );
};

export default LogoutPage;
