import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("cvb_token");

    if (!token) {
        return <Navigate to="/login" />
    }
    return <>{children}</>;
}

export default ProtectedRoute