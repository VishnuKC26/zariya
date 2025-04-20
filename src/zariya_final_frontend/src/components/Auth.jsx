import React, { useEffect, useState } from "react";
import { initAuth, login, logout, getActor, getId } from "../utils/auth";

export default function Auth() {
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

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Zariya - Donation App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{isAuthenticated ? "✅ Logged in!" : "❌ Not Logged in"}</p>

      {!isAuthenticated ? (
        <button onClick={handleLogin} disabled={isLoading}>
          Login with Internet Identity
        </button>
      ) : (
        <>
          <button onClick={handleLogout} disabled={isLoading}>
            Logout
          </button>

          <div style={{ marginTop: "30px" }}>
            <h2>Make a Donation</h2>
            <input
              type="text"
              placeholder="NGO ID"
              value={ngoId}
              onChange={(e) => setNgoId(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <br />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <button onClick={handleDonate} style={{ marginTop: "10px" }}>
              Donate
            </button>
            {donationMsg && <p>{donationMsg}</p>}
          </div>

          <div style={{ marginTop: "40px" }}>
            <h2>My Donations</h2>
            <button onClick={fetchDonations}>View My Donations</button>
            <ul>
              {donationHistory.map((donation, index) => (
                <li key={index}>
                  <strong>NGO ID:</strong> {donation.ngoId} |{" "}
                  <strong>Amount:</strong> {donation.amount.toString()} |{" "}
                  <strong>Timestamp:</strong>{" "}
                  {new Date(Number(donation.timestamp / BigInt(1_000_000))).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
