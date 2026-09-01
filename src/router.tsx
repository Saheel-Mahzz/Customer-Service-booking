import { createBrowserRouter } from "react-router-dom";
import Sevices from "./features/services";
import { ServiceDetailsPage } from "./features/serviceDetails";
const router = createBrowserRouter([
    {
path:'/',
element:<Sevices/>
    },
    {
        path:'/service-details',
        element:<ServiceDetailsPage/>
    }
])

export default router