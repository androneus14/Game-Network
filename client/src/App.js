import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import SinglePost from './pages/SinglePost'
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className='flex-column justify-flex-start min-100-vh'>
                    <Header />
                    <div className='container'>
                        <Routes>
                            <Route
                                path='/'
                                element={<Home />}
                            />
                            <Route
                                path='/login'
                                element={<Login />}
                            />
                            <Route
                                path='/signup'
                                element={<Signup />}
                            />
                            <Route
                                path='/profile'
                                element={<Profile />}
                            />
                            <Route path='/profile'>
                                <Route path=":username" element={<Profile />} />
                                <Route path="" element={<Profile />} />
                            </Route>
                            <Route
                                path='/post/:postId'
                                element={<SinglePost />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;