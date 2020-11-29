import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    const authContext = useContext(AuthContext);

    return <h2 className='text-center mt-5'>Hello, {authContext.user}</h2>;
};

export default HomePage;
