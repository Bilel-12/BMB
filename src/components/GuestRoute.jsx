// src/components/GuestRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    if (userInfo) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;
