import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login..."); 
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
