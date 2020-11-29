import ProtectedRoute from './components/hoc/ProtectedRoute';
import Navigation from './components/General/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import HomePage from './pages/HomePage';
import BahanPage from './pages/BahanPage';
import AuthContext from './context/AuthContext';
import useProvideAuth from './helpers/useProvideAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            <div className='App'>
                <Router>
                    {auth.user ? <Navigation /> : null}
                    <Switch>
                        <Route path='/login' exact>
                            <LoginPage />
                        </Route>
                        <Route path='/register' exact>
                            <RegisterPage />
                        </Route>
                        <ProtectedRoute path='/' exact>
                            <HomePage />
                        </ProtectedRoute>
                        <Route path='/bahan' exact>
                            <BahanPage />
                        </Route>
                        <ProtectedRoute path='/logout' exact>
                            <LogoutPage />
                        </ProtectedRoute>
                    </Switch>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
