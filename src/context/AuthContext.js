import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    login: () => {},
    register: () => {},
    logout: () => {},
});

export default AuthContext;
