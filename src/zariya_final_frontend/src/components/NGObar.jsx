import React from 'react';
import ngoList from './NGOdata.jsx';
import { Link, useNavigate, useParams } from 'react-router';

const NGOListBar = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="p-6 pl-10 bg-gray-800">
            <h2 className="text-5xl font-bold mb-4 text-white">Featured NGOs</h2>
            <div className="overflow-x-auto flex space-x-6 pb-4">
                {ngoList.slice(0, 10).map((ngo, index) => (
                    <div
                        key={index}
                        className="min-w-[350px] bg-white rounded-lg shadow-md p-4">
                        <img
                            src={ngo.image}
                            alt={ngo.name}
                            className="h-40 w-full object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-semibold">{ngo.name}</h3>
                        <p className="text-sm text-gray-600">{ngo.location}</p>
                        <p className="text-sm italic text-blue-700">{ngo.cause}</p>

                        <Link to={`/ngo/${ngo.id}`} // This is your dynamic route
                            className="mt-3 text-blue-600 font-semibold hover:underline self-start"
                        >
                            View Details →
                        </Link>


                      
                    </div>
                ))}
                <Link to="/ngogrids"
                    onClick={() => navigate('/all-ngos')}
                    className="min-w-[150px] bg-blue-500 text-white rounded-lg shadow-md px-6 py-4 font-semibold hover:bg-blue-600"
                >
                    More →
                </Link>
            </div>
        </div>
    );
};

export default NGOListBar;