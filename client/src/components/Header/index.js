import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    // When logged in, Profile and Logout links will be visible
    // When not logged in, Sign Up and Login link will be visible
    return (
        <header className='bg-primary text-light mb-4 py-2 flex-row align-center'>
            <div className='container flex-row justify-space-between-lg justify-center align-center'>
                <div>
                    <Link className='text-light' to='/'>
                        <h1 className='m-0'>GAMERS NETWORK</h1>
                    </Link>

                    <nav className='text-center' id='navigation'>
                        {Auth.loggedIn() ? (
                            <>
                                <Link to='/profile'>Profile</Link>
                                <a href='/' onClick={logout}>
                                    Logout
                                </a>
                            </>
                        ) : (
                            <>
                                <Link className='nav-btn' id='navbar' to='/login'>Login</Link>
                                <Link className='nav-btn' id='navbar' to='/signup'>Sign Up</Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;