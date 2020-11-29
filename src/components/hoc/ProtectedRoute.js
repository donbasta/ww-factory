import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn, ...rest }) => {
    const authContext = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authContext.user ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/login', state: { from: location } }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
