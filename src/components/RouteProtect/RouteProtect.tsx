import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

export const ProtectedAdminRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    const isAdmin = handleLoginAndCart.token && handleLoginAndCart.user.role === 'admin';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
        } else if (isAdmin && window.location.pathname === '/admin/login') {
            navigate('/myway/admin');
        }
    }, [isAdmin, navigate]);

    return <>{element}</>;
};
export const ProtectedUserRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    const isLogin = handleLoginAndCart.token

    useEffect(() => {
        if ((!isLogin && window.location.pathname === '/account/login')) {
            navigate("/account/login");
        }
        else if ((!isLogin && window.location.pathname === '/account/signup')) {
            navigate("/account/signup");
        }
        else if ((isLogin && window.location.pathname === '/account/login') || (isLogin && window.location.pathname === '/account/signup')) {

            navigate('/profile/account/user');
        }
    }, [isLogin, navigate]);

    return <>{element}</>;
};