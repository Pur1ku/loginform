import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "../pages/loginpage";
import Insert from "../pages/insertpage";
import SignUp from "../pages/signuppage";
import RedirectIfAuthenticated from "../features/auth/RedirectIfAuthenticated";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/SignUp",
        element: (
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/insertpage",
        element: (
        
            <Insert />
        
        ),
      },

]);

export default function Route() {
    return <RouterProvider router={router} />;
  }