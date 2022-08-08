import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
        return <p className='profile-friendList'>
           Make some friends and see what games they're playing!</p>;
    }

  return (
    <div>
        <h5>
            {username}'s {friendCount=== 'friends'} friends
        </h5>
        {friends.map(friend => (
            <button className='friend-btn' key={friend._id}>
            <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
            </button>
         ))}
    </div>
  );
};

export default FriendList;