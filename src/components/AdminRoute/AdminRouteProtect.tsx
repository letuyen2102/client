/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

const AdminRouteProtect: React.FC<{ children: React.ReactNode }> = (props) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    if (!handleLoginAndCart.token || !(handleLoginAndCart.user.role === 'admin')) {
        // user is not authenticated
        return <Navigate to="/admin/login" />;
    }
    return <div>
        {props.children}
    </div>
};

export default AdminRouteProtect