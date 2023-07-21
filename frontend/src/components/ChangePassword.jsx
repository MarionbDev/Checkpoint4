import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function ChangePassword() {
  // const navigate = useNavigate();
  const { userId } = useUserContext();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword === confirmNewPassword) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      })
        .then((res) => res.json())

        // .then(() => {
        //   console.warn("ok");
        //   navigate(`${userId}/my-profile`);
        // })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Attention : confirmation du nouveau mot de passe non valide !");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen ">
      <div className="mb-16">
        <h1 className="">Modifiez votre mot de passe</h1>
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col items-start">
        <label htmlFor="password" className=" text-base mt-6">
          Mot de passe actuel
        </label>
        <input
          className="rounded-lg text-black w-60 h-8 p-2 md:w-96"
          type="password"
          id="password"
          value={password}
          onChange={handleChangePassword}
        />

        <label htmlFor="new-password" className="  text-base mt-6">
          Nouveau mot de passe
        </label>
        <input
          className=" rounded-lg text-black w-60 h-8 p-2 md:w-96"
          type="password"
          id="new-password"
          value={newPassword}
          onChange={handleChangeNewPassword}
        />

        <label htmlFor="confirm-new-password" className=" text-base mt-6">
          Confirmer le nouveau mot de passe
        </label>
        <input
          className=" rounded-lg text-black w-60 h-8 p-2 md:w-96"
          type="password"
          id="confirm-new-password"
          value={confirmNewPassword}
          onChange={handleChangeConfirmNewPassword}
        />

        {/* Ajoutez d'autres labels ici */}
        <div className="flex justify-center">
          <Link to="my-profil">
            <button type="submit" className="">
              Confirmer
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
