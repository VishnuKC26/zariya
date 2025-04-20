import { useState } from 'react';
import Navbar from './Navbar';

export default function NGOGridPage() {
  // Sample NGO data
  const ngos = [
    {
      id: 1,
      name: "Narayan Seva Sansthan",
      image: "https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745073937/WhatsApp_Image_2025-04-19_at_20.13.49_xlizkk.jpg",
      description: "Providing education and healthcare to underprivileged children in rural communities."
    },
    {
      id: 2,
      name: "Chintan NGO",
      image: "https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745072457/WhatsApp_Image_2025-04-19_at_19.30.00_l2v1o2.jpg",
      description: "Dedicated to promoting environmental justice and sustainable development.Focuses on reducing waste, advocating for responsible consumption, and improving the livelihoods of marginalized communities, particularly waste worker."
    },
    {
      id: 3,
      name: "Dog Home Foundation",
      image: "https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745074884/WhatsApp_Image_2025-04-19_at_20.30.40_hfz63h.jpg",
      description: "Dedicated to rescuing, treating, and providing shelter to injured and stray animals, particularly dogs. Offering free medical services, rehabilitation, and adoption opportunities for over 1,200 animals monthly."
    },
    {
      id: 4,
      name: "Clean Future",
      image: "https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745072402/WhatsApp_Image_2025-04-19_at_19.29.59_1_htn3gk.jpg",
      description: "Focused on promoting new and renewable energy solutions, the foundation aims to enhance environmental sustainability through various initiatives."
    },
    {
      id: 5,
      name: "TechBridge",
      image: "https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745072424/WhatsApp_Image_2025-04-19_at_19.29.59_2_knbstp.jpg",
      description: "Dedicated to empowering underserved communities by providing access to technology and digital skills trainingImproving access to healthcare services in underserved regions around the world.Aim to bridge the digital divide, fostering economic opportunities and social inclusion"
    }
  ];

  // Mock user data
  const user = {
    name: "WEB5"
  };

  // Handle logout function
  const handleLogout = () => {
    console.log("Logging out");
    // Add logout functionality here
  };

  // Custom style variables based on the color palette
  const colors = {
    primary: "rgb(32, 87, 129)", // #205781 - Dark Blue
    secondary: "rgba(255, 0, 0, 0.76)", // #4F959D - Teal
    tertiary: "rgb(152, 210, 192)", // #98D2C0 - Mint
    light: "rgb(255, 255, 255)", // #F6F8D5 - Light Yellow
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      {/* Navigation Bar */}
      {/* <nav className="bg-[rgb(32, 87, 129)] shadow-md">
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
      </nav> */}

      <Navbar/>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl  text-center mb-12" style={{ color: colors.primary }}>Featured NGOs</h1>
        
        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngos.map((ngo) => (
            <NGOCard key={ngo.id} ngo={ngo} colors={colors} />
          ))}
        </div>
      </main>

    </div>
  );
}

function NGOCard({ ngo, colors }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div style={{ backgroundColor: colors.primary }} className="h-2"></div>
      <img 
        src={ngo.image} 
        alt={`${ngo.name} logo`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>{ngo.name}</h2>
        <p className="text-gray-600">{ngo.description}</p>
        <button 
          style={{ backgroundColor: colors.secondary  }} 
          className="mt-4 text-white py-2 px-4 rounded hover:transition-opacity duration-300 cursor-pointer"
        >
          Donate
        </button>
      </div>
    </div>
  );
}