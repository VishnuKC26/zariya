import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import NGODetailPage from "./components/NGODetailPage";
import Navbar from "./components/Navbar";
import DonationDashboardWithCharts from "./components/sample";
import NGOGridPage from "./components/dashboard";
import RewardsPage from "./components/Coupon";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div>
          <App />

        </div>

      ),
    }, {
      path: "/ngo/:id", // Use :id to define a dynamic route
      element: (
        <div>
          <Navbar />
          <div className="pt-20">
          <NGODetailPage /> {/* This component should handle reading the dynamic id */}
          </div>
        </div>
      )
    },{
      path:"/Login",
      element:(
        <DonationDashboardWithCharts />
      )
    },{
      path:"/ngogrids",
      element:(
        <NGOGridPage/>
      )
    }
    ,{
      path:"/rewards",
      element:(
        <RewardsPage/>
      )
    }


  ]
);
function App2() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App2;