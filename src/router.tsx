import { createBrowserRouter } from "react-router-dom";
import Sevices from "./features/services";
import { ServiceDetailsPage } from "./features/serviceDetails";
import { MyBookingsPage } from "./features/myBookings";
const router = createBrowserRouter([
    {
path:'/',
element:<Sevices/>
    },
    {
        path:'/service-details',
        element:<ServiceDetailsPage/>
    },
    {
        path:'/my-bookings',
        element:<MyBookingsPage/>
    }
])

export default router