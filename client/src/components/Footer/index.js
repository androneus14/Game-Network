import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <footer className='w-100 mt-auto bg-primary p-4'>
            <div className='container text-center mb-5'>
                {location.pathname !== '/' && (
                    <button
                        className='back-btn'
                        onClick={() => navigate(-1)}
                    >
                        &larr; Go Back
                    </button>
                )}
                <h4>
                    Gamers Network created by
                    <a href='https://github.com/androneus14' rel='noreferrer' target='_blank'>androneus14</a>
                    <br></br>
                    Made for Gamers. By a Gamer.
                </h4>
            </div>
        </footer>
    );
};

export default Footer;