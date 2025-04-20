import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DonationDashboardWithCharts from './components/sample'
import NgoDashboard from './components/dashboard'

const colors ={
  deepBlue: "#205781",
  teal:"#4F959D" , 
  mint:"#98D2C0" , 
  cream:"#F6F8D5"

}

const App3 = () => {
  const router = createBrowserRouter([
    {
      path: "/ngogrids",
      element: <NgoDashboard />,
    },
    {
      path: "/",
      element: <DonationDashboardWithCharts />,
    },
    {
      path: "*",
      element: <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! This page doesn't exist.</p>
      </div>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App3;