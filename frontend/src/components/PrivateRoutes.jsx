import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../contexts/UserContext";

export default function PrivateRoutes({ authorizedRoles }) {
  const [{ user }] = useUserContext();

  if (!user || !authorizedRoles.find((role) => role === user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

PrivateRoutes.propTypes = {
  // authorizedRoles: PropTypes.string.isRequired,
  authorizedRoles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
