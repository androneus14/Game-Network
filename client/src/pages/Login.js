import React, { useState } from 'react';
import { useMutation} from '@apollo/client';
import { LOGIN_USER} from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className='flex-row justify-center mb-3'>
            <div className='col-12 col-md-6'>
                <div className='card'>
                    <h4 className='card-header'>Login</h4>
                    <div className='card-body'></div>
                        {data ? (
                            <p>
                                Login Successful!
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className='form-input'
                                    placeholder='Enter email here'
                                    name='email'
                                    type='email'
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='form-input'
                                    placeholder='Enter password here'
                                    name='password'
                                    type='password'
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    id='submit-btn'
                                    type='submit'
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className='my-3 p-3 bg-danger text-white'>
                                {error.message}
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
};

export default Login;