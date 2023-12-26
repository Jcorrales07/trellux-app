import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({children, authUser, path}) => {
    if (!authUser) {
        return <Navigate to={path} />
    }

    return children ? children : <Outlet/>
}

ProtectedRoute.propTypes = {
    children: PropTypes.elementType,
    authUser: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}