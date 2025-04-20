import { useState } from 'react';
import { Ticket, Home, User, Gift, LogOut } from 'lucide-react';

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(500);
  
  const coupons = [
    { id: 1, title: 'MOVIE NIGHT', description: 'One free movie ticket', points: 200, color: 'bg-red-100', borderColor: 'border-red-500' },
    { id: 2, title: 'COFFEE BREAK', description: 'Free medium coffee', points: 100, color: 'bg-amber-100', borderColor: 'border-amber-500' },
    { id: 3, title: 'PIZZA TIME', description: '$5 off any large pizza', points: 150, color: 'bg-green-100', borderColor: 'border-green-500' },
    { id: 4, title: 'BOOK WORM', description: '25% off any book', points: 125, color: 'bg-blue-100', borderColor: 'border-blue-500' },
    { id: 5, title: 'SWEET TOOTH', description: 'Free dessert with purchase', points: 75, color: 'bg-purple-100', borderColor: 'border-purple-500' },
    { id: 6, title: 'GAME NIGHT', description: 'Rent one game free', points: 175, color: 'bg-indigo-100', borderColor: 'border-indigo-500' },
    { id: 7, title: 'SHOPPING SPREE', description: '15% off any purchase', points: 300, color: 'bg-pink-100', borderColor: 'border-pink-500' },
    { id: 8, title: 'TECH DISCOUNT', description: '$10 off electronics', points: 250, color: 'bg-teal-100', borderColor: 'border-teal-500' },
    { id: 9, title: 'SPA DAY', description: '20% off spa services', points: 350, color: 'bg-yellow-100', borderColor: 'border-yellow-500' },
    { id: 10, title: 'PREMIUM UPGRADE', description: '1 month premium membership', points: 500, color: 'bg-gray-100', borderColor: 'border-gray-500' },
  ];

  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const redeemCoupon = (coupon) => {
    if (userPoints >= coupon.points && !redeemedCoupons.includes(coupon.id)) {
      setUserPoints(userPoints - coupon.points);
      setRedeemedCoupons([...redeemedCoupons, coupon.id]);
      setSuccessMessage(`Successfully redeemed ${coupon.title}!`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#205781] shadow-md">
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745011108/WhatsApp_Image_2025-04-19_at_02.41.09_z3owch.jpg" 
                alt="Website Logo" 
                className="h-12 w-12 rounded-md"
              />
              <span className="ml-3 text-xl font-semibold text-[#F6F8D5]">ZARIYA</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6F8D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-[#F6F8D5] hidden md:block">WEB5</span>
              </div>
              
              <button 
                className="flex items-center text-[#F6F8D5] hover:text-[#98D2C0] transition-colors pl-4 border-l border-[#4F959D]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="ml-1 hidden md:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Rewards ({userPoints} Points)</h1>
        
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}
        
        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div 
              key={coupon.id} 
              className={`${coupon.color} border-2 ${coupon.borderColor} border-dashed rounded-lg overflow-hidden shadow-sm`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
                    <p className="text-gray-700 mb-4">{coupon.description}</p>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full border border-gray-300">
                    <span className="font-medium text-gray-700">{coupon.points} pts</span>
                  </div>
                </div>
                <button
                  onClick={() => redeemCoupon(coupon)}
                  disabled={userPoints < coupon.points || redeemedCoupons.includes(coupon.id)}
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    redeemedCoupons.includes(coupon.id)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : userPoints < coupon.points
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {redeemedCoupons.includes(coupon.id)
                    ? 'Redeemed'
                    : userPoints < coupon.points
                    ? 'Not Enough Points'
                    : 'Redeem Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}