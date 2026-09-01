import { createBrowserRouter } from "react-router-dom";
import Sevices from "./features/services";
const router = createBrowserRouter([
    {
path:'/',
element:<Sevices/>
    }
])

export default router