import { useNavigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/auth";
import { useEffect } from "react";

export default function NotRequireAuth() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated ? <Outlet /> : null;
}
