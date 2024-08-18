import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/Store.auth";
import { useEffect } from "react";

export default function RequireAuth() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Outlet /> : null;
}
