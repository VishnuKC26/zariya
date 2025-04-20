import React from 'react';
import { useNavigate,useParams } from 'react-router';
const NGODetail = ({ ngo }) => {

    const navigate = useNavigate();
        const { id } = useParams();
    
    return (
        <div className="max-w-8xl mx-auto px-6 py-10">
            <div className="gap-10 flex flex-col lg:flex-row">
                
                <img
                    src={ngo.image}
                    alt={ngo.name}
                    className="rounded-lg shadow-lg w-full lg:w-[60%] h-[60vh] object-cover"
                />
                <div className="w-full lg:w-[40%]">
                    <h1 className="text-6xl font-bold text-blue-900 pt-5">{ngo.name}</h1>
                    <p className="text-gray-600 mt-7 text-xl">
                        <strong>Location:</strong> {ngo.location}
                    </p>
                    <p className="text-gray-600 text-xl">
                        <strong>Cause:</strong> {ngo.cause}
                    </p>
                    <p className="mt-4 text-lg">{ngo.description}</p>

                    {ngo.trustVerified && (
                        <span className="mt-4 inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                            ✅ Trust Verified
                        </span>
                    )}

                    <div className="mt-4">
                        <p className="text-lg font-semibold">
                            Total Donors: {ngo.totalDonations}
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">📞 Contact Details:</h3>
                        <p className="text-gray-700">Email: <a href={`mailto:${ngo.email}`} className="text-blue-600 underline">{ngo.email}</a></p>
                        <p className="text-gray-700">Phone: {ngo.phone}</p>
                        <p className="text-gray-700">Website: <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{ngo.website}</a></p>
                    </div>

                    <div className='text-left'>
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow w-60 h-18 text-2xl">
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Thank You Note */}
            <div className="mt-12 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">💛 Thank You for Your Support!</h2>
                <p className="text-lg">
                    Your contribution helps this NGO continue its impactful work. Every rupee makes a difference in creating a better future for those in need.
                </p>
            </div>
        </div>
    );
};

export default NGODetail;