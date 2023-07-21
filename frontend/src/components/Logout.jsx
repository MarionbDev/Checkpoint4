import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Logout() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useUserContext();

  const handleLogout = () => {
    dispatch({ type: "RESET_USER" });
    navigate("/");
  };

  return (
    <Link to="/gallery">
      <button type="button" onClick={handleLogout}>
        Déconnexion
      </button>
    </Link>
  );
}
