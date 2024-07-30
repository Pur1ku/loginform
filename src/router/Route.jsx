import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "../pages/loginpage";
import Insert from "../pages/insertpage";
import SignUp from "../pages/signuppage";
import Forgot from "../pages/forgotpasswordpage";
import Resetpassword from "../pages/resetpasswordpage";
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
        path: "/signUp",
        element: (
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        ),
      },

      {
        path: "/forgotpassword",
        element: (
          <RedirectIfAuthenticated>
            <Forgot />
          </RedirectIfAuthenticated>
        ),
      },

      {
        path: "/reset-password/:token", // เปลี่ยน path เป็น /resetpassword/:token
        element: (
          <RedirectIfAuthenticated>
            <Resetpassword />
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