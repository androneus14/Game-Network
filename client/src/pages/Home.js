import React from 'react';
import { useQuery} from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries'

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <main>
            <div className='flex-row justify-center'>
                <div
                    className='col-12 col-md-10 mb-3 p-3'
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <PostForm />
                </div>
                <div className='col-12 col-md-8 mb-3'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PostList
                            posts={posts}
                            title='What other gamers are playing at the moment...'
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;