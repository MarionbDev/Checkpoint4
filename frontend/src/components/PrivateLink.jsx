import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../contexts/UserContext";
import "./Navbar.css";

export default function PrivateLink({ authorizedRoles, to, text }) {
  const [{ user }] = useUserContext();

  if (user && authorizedRoles.find((role) => role === user.role)) {
    return (
      <li className="nav-text">
        <NavLink className="menu-bar " to={to}>
          <span className="ml-4">{text}</span>
        </NavLink>
      </li>
    );
  }
}

PrivateLink.propTypes = {
  authorizedRoles: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
