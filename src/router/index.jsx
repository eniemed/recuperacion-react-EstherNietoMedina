import {createBrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import LayoutPublic from "../layouts/LayoutPublic"
import Notfound from "../pages/NotFound"
import Shop from "../pages/Shop"
import Favorites from "../pages/Favorites"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../pages/Contact"
import Profile from "../pages/Profile"



export const router = createBrowserRouter([
    {
        path:"/",
        element: <LayoutPublic />,
        errorElement: <Notfound />,
        children: [
            {
                errorElement: <Notfound />,
                children: [
                    
                    {
                        index:true,
                        element: <Home />,
                    },
                    {
                        path:"/shop",
                        element: <Shop />,
                    },
                    {
                        path:"/favorites",
                        element: <Favorites />,
                    },
                    {
                        path:"/login",
                        element: <Login />
                    },
                    {
                        path:"/signup",
                        element: <Signup />
                    },
                    {
                        path:"/contact",
                        element: <Contact />
                    },
                    {
                        path:"/profile",
                        element: <Profile />
                    }
                ]
            }
        ]
    }
])