import { useState, useEffect } from 'react';
import { createBrowserRouter , Link, RouterProvider} from "react-router-dom"
import Navbar from './Navbar';

export default function DonationDashboardWithCharts() {
  const [user, setUser] = useState({
    name: "WEB5",
    donationsTotal: 41000,
    points: 520,
    ngosContributed: 17,
    totalNGOs: 100,
    healthPercentage: 45,
    educationPercentage: 30,
    environmentPercentage: 25
  });
  
  
  // Animation states
  const [animateNGOs, setAnimateNGOs] = useState(0);
  const [animateAmount, setAnimateAmount] = useState(0);
  const [animateCategories, setAnimateCategories] = useState(false);
  const colors = {
    primary: "rgb(32, 87, 129)", // #205781 - Dark Blue
    secondary: "rgb(79, 149, 157)", // #4F959D - Teal
    tertiary: "rgb(152, 210, 192)", // #98D2C0 - Mint
    light: "rgb(246, 248, 213)", // #F6F8D5 - Light Yellow
  };
  // Handle animations on component mount
  useEffect(() => {
    // Animate NGO count
    let ngoCounter = 0;
    const ngoInterval = setInterval(() => {
      ngoCounter += 1;
      setAnimateNGOs(ngoCounter);
      if (ngoCounter >= user.ngosContributed) {
        clearInterval(ngoInterval);
      }
    }, 50);
    
    // Animate donation amount
    let amountCounter = 0;
    const amountInterval = setInterval(() => {
      amountCounter += 50;
      setAnimateAmount(amountCounter);
      if (amountCounter >= user.donationsTotal) {
        clearInterval(amountInterval);
      }
    }, 30);
    
    // Animate category chart
    setTimeout(() => {
      setAnimateCategories(true);
    }, 300);
    
    // Cleanup
    return () => {
      clearInterval(ngoInterval);
      clearInterval(amountInterval);
    };
  }, [user.ngosContributed, user.donationsTotal]);
  
  const handleLogout = () => {
    alert("Logout functionality would go here");
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      {/* <nav className="bg-[#205781]shadow-md">
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
                <span className="ml-2 text-[#F6F8D5] hidden md:block">{user.name}</span>
              </div>
              
              <button 
                onClick={handleLogout}
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
       */}

        <Navbar/>

      {/* Main Content */}
      <div className="p-6 mt-20">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl text-[#205781]">Welcome, {user.name}</h1>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
          {/* NGOs Contributed Chart */}
          <div className="bg-white rounded-lg border-2 border-black/10 shadow-black/30 shadow-xl p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-lg font-medium text-[#205781] mb-4 text-center">NGOs You've Supported</h3>
            
            <div className="flex justify-center mb-4 border-4 border-black/10 rounded">
              <div className="relative w-48 h-48">
                {/* Circular progress background */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#E5E7EB" 
                    strokeWidth="8" 
                  />
                  
                  {/* Health segment (red) */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#dc2626" 
                    strokeWidth="8" 
                    strokeDasharray={`${animateCategories ? user.healthPercentage * 2.51 : 0} 251`}
                    strokeDashoffset="0" 
                    className="transition-all duration-1000 ease-out"
                  />
                  
                  {/* Education segment (purple) */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="8" 
                    strokeDasharray={`${animateCategories ? user.educationPercentage * 2.51 : 0} 251`}
                    strokeDashoffset={`${animateCategories ? -user.healthPercentage * 2.51 : 0}`}
                    className="transition-all duration-1000 ease-out"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Environment segment (green) */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="8" 
                    strokeDasharray={`${animateCategories ? user.environmentPercentage * 2.51 : 0} 251`}
                    strokeDashoffset={`${animateCategories ? -(user.healthPercentage + user.educationPercentage) * 2.51 : 0}`}
                    className="transition-all duration-1000 ease-out"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Center text */}
                  <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-[#205781]">
                    {animateNGOs}+
                  </text>
                  <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-600">
                    NGOs
                  </text>
                </svg>
              </div>
            </div>
            
            {/* Category legend */}
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#dc2626] mr-1"></div>
                <span className="text-sm text-gray-600">Health</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-1"></div>
                <span className="text-sm text-gray-600">Education</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#22c55e] mr-1"></div>
                <span className="text-sm text-gray-600">Environment</span>
              </div>
            </div>
            
            {/* <p className="text-center text-sm text-[#4F959D] mt-4">
              You've supported {animateNGOs} NGOs out of {user.totalNGOs}+ in our network
            </p> */}
          </div>
          
          {/* Total Contribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-black/10 shadow-black/30 shadow-xl p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-lg font-medium text-[#205781] mb-4 text-center">Your Total Contributions</h3>
            
            <div className="flex justify-center mb-4 border-4 border-black/10 rounded">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer circle */}
                <div className="absolute w-48 h-48 rounded-full border-8 border-[#E5E7EB]"></div>
                
                {/* Animated progress */}
                <svg className="absolute w-48 h-48" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke={`${animateAmount >= 1000 ? "#22c55e" : "#4F959D"}`}
                    strokeWidth="8" 
                    strokeDasharray={`${animateAmount / user.donationsTotal * 289} 289`}
                    strokeDashoffset="72.25" 
                    className="transition-all duration-300 ease-out"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                
                {/* Center amount */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#205781]">Rs.{animateAmount}</div>
                  <div className="text-sm text-[#4F959D]">Total Donated</div>
                </div>
              </div>
            </div>
            
            {/* Monthly comparison */}
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Goal:</span>
                <span className="text-sm font-medium text-[#205781]">Rs.60000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-[#4F959D] h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((animateAmount / 2000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-[#4F959D] mt-4">
                {animateAmount >= 1000 ? "Great progress!" : "Keep going to reach your monthly goal!"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Donate Card */}
          <div className="bg-white rounded-lg shadow-black/30 shadow-xl p-6 flex flex-col border-t-4 border-[#205781] hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#205781] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-lg font-medium text-[#205781] ">Donate Now</h3>
            </div>
            <p className="text-[#4F959D] mb-6 flex-grow">
              Your generosity helps us make a real impact. Support our mission with a donation today.
            </p>
            <Link to="/ngogrids" className="w-full bg-[#205781] hover:bg-red-500 text-white font-medium py-3 px-4 rounded transition duration-300 cursor-pointer text-center block">
              Donate Here
            </Link>

          </div>
          
          {/* Transaction History Card */}
          <div className="bg-white rounded-lg shadow-black/30 shadow-xl p-6 flex flex-col border-t-4 border-[#205781] hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#205781] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-[#205781]">Transaction History</h3>
            </div>
            <div className="text-[#4F959D] mb-6 flex-grow">
              <p className="mb-2">Total donations: ${user.donationsTotal}</p>
              <p>View all your past contributions and their impact.</p>
            </div>
            <button 
              className="w-full bg-[#205781] hover:bg-red-500 text-white font-medium py-3 px-4 rounded transition duration-300 cursor-pointer"
              onClick={() => alert("Navigate to transaction history page")}
            >
              Transaction History
            </button>
          </div>
          
          {/* Rewards Card */}
          <div className="bg-white rounded-lg shadow-black/30 shadow-xl p-6 flex flex-col border-t-4 border-[#205781] hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#205781] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-lg font-medium text-[#205781]">My Rewards</h3>
            </div>
            <div className="text-[#4F959D] mb-6 flex-grow">
              <p className="mb-2">Current points: {user.points}</p>
              <p>Redeem your donation points for rewards and special perks.</p>
            </div>
            <Link 
              className="w-full bg-[#205781] hover:bg-red-500 text-white font-medium py-3 px-4 rounded transition duration-300 cursor-pointer"
              to="/rewards"
            >
              View My Rewards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}