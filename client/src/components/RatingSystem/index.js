import { FaFire } from 'react-icons/fa';

function RatingSystem({ filled, onClick }) {
    return (
        <FaFire
            color={filled ? 'red' : 'white'}
            onClick={onClick} 
        />
    );
};

export default RatingSystem;