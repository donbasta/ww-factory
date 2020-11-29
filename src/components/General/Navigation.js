import { Link, withRouter } from 'react-router-dom';
import Saldo from './Saldo';

const Navigation = (props) => {
    return (
        <div className='navigation'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container'>
                    <Link className='navbar-brand' to='/homepage'>
                        Willy Wangky's Factory
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarResponsive'
                        aria-controls='navbarResponsive'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarResponsive'
                    >
                        <ul className='navbar-nav ml-auto'>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/'>
                                    Home
                                    <span className='sr-only'>(current)</span>
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/bahan'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/bahan'>
                                    Bahan
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/stock'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/stock'>
                                    Stock
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/coklat'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/coklat'>
                                    Coklat
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/pesanan'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/pesanan'>
                                    Pesanan Coklat
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.location.pathname === '/logout'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Link className='nav-link' to='/logout'>
                                    Logout
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Saldo />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default withRouter(Navigation);
