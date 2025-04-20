import { Link,useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { initAuth, login, logout, getActor, getId } from "../utils/auth";
// Adjust this path based on where your logo is stored
// import logo3 from "../assets/logo3.png";

export default function Navbar() {
  const navigate = useNavigate();
  /////-------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState("");
    const [ngoId, setNgoId] = useState("");
    const [donationMsg, setDonationMsg] = useState("");
    const [donationHistory, setDonationHistory] = useState([]);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          await initAuth();
          const actor = getActor();
          setIsAuthenticated(actor !== null);
          console.log("Actor Here",actor);
        } catch (err) {
          console.error("Authentication check failed:", err);
          setError("Failed to check authentication status");
        } finally {
          setIsLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    const handleLogin = async () => {
      setIsLoading(true);
      try {
        await login();
        setIsAuthenticated(true);
        navigate("/Login");
      } catch (err) {
        console.error("Login failed:", err);
        setError("Failed to login. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleLogout = async () => {
      setIsLoading(true);
      try {
        await logout();
        setIsAuthenticated(false);
        navigate("/");
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleDonate = async () => {
      setDonationMsg(""); // Clear the donation message
      try {
        // Ensure the actor is initialized and accessible
        const actor = getActor();
        if (!actor) {
          throw new Error("Actor not initialized. Please log in.");
        }
        
        // Retrieve the principal from the actor's identity
        const userPrincipal = getId().getPrincipal();
        console.log("Current principal:", userPrincipal);
    
        // Call the donate function from the canister
        const result = await actor.donate(ngoId, BigInt(amount),userPrincipal);
        console.log("Donation successful:", result);
        
        // Set the donation success message
        setDonationMsg(result);
      } catch (err) {
        console.error("Donation failed:", err);
        // Set the donation failure message
        setDonationMsg("❌ Failed to donate: " + err.message);
      }
    };
    
  
    const fetchDonations = async () => {
      try {
        const actor = getActor();
        const donations = await actor.getDonationsByUser();
        setDonationHistory(donations);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
  
   
  //----------------------------------------------------------------


  return (
    <nav className="absolute top-0 bg-black/50 p-4 shadow-md pl-5 pt-5 text-2xl w-full shadow-black/70 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Image */}
        <div className="flex flex-cols-2">
          <Link to="/">
            <img src="https://res.cloudinary.com/dr3l5ctpr/image/upload/v1745011108/WhatsApp_Image_2025-04-19_at_02.41.09_z3owch.jpg" alt="Zariya Logo" className="h-[80px] object-cover" />
          </Link>
          <h1 className="px-4 pt-4 text-5xl font-bold text-white">ZARIYA</h1>
        </div>


        <ul className="flex">
          <li>
            <Link to="/" className="text-white hover:underline pr-10">
              Home
            </Link>
          </li>
          <li>
            <Link to="/donate" className="text-white hover:underline pr-10">
              Donate
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline pr-10">
              About
            </Link>

          </li>
          <ul className="flex ">
            <li>
              {!isAuthenticated ? (<button onClick={handleLogin} className="bg-gray-700 text-white py-2 px-10 rounded-lg hover:bg-gray-500 transition duration-200 mr-2">
                Login
              </button>):
              (<button onClick={handleLogout} className="bg-gray-700 text-white py-2 px-10 rounded-lg hover:bg-gray-500 transition duration-200 mr-2">
                Logout
              </button>)}

            </li>

          </ul>

        </ul>
      </div>
    </nav>
  );
}