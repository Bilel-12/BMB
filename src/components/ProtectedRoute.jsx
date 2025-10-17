// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    if (!userInfo) {
        return <Navigate to="/login" replace />; // redirection si pas connecté
    }

    return children;
};

export default ProtectedRoute;
