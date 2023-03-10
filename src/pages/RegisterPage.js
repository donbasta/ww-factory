import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Auxiliary from '../components/hoc/Auxiliary';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const location = useLocation();
    const authContext = useContext(AuthContext);

    const { from } = location.state || { from: { pathname: '/' } };

    const submitHandler = async (event) => {
        event.preventDefault();
        await authContext.register(username, email, password);
        history.replace(from);
    };

    return (
        <Auxiliary>
            <header className='jumbotron'>Willy Wangky's Factory</header>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-6 mx-auto'>
                        <form className='mb-5' onSubmit={submitHandler}>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    key='username'
                                    type='text'
                                    className='form-control'
                                    id='username'
                                    aria-describedby='username'
                                    required
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    value={username}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='username'>Email</label>
                                <input
                                    key='email'
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    aria-describedby='email'
                                    required
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    value={email}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    key='password'
                                    type='password'
                                    className='form-control'
                                    id='password'
                                    required
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>
                        </form>
                        <Link to='/login'>Already has an account?</Link>
                    </div>
                </div>
            </div>
        </Auxiliary>
    );
};

export default RegisterPage;
