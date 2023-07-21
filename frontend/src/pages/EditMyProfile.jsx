import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
// import MyCreation from "../components/MyCreation";

export default function EditMyProfile() {
  const [user, setUser] = useState([]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [avatar, setAvatar] = useState("");
  const [about, setAbout] = useState("");
  const [mail, setMail] = useState("");

  const { idUser } = useUserContext();

  const getOneUser = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${idUser}`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
        setLastname(data.lastname);
        setFirstname(data.firstname);
        setPseudo(data.pseudo);
        setAvatar(data.avatar);
        setAbout(data.about);
        setAvatar(data.avatar);
        setMail(data.mail);
      })
      .catch((err) => console.error(err));
  };

  const handleHupdateUser = (e) => {
    e.preventDefault();

    const updateUser = {
      lastname,
      firstname,
      pseudo,
      about,
      avatar,
      mail,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${idUser}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      // navigate("/edit-profile")
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  useEffect(() => {
    getOneUser();
  }, [idUser]);

  if (!user) {
    return (
      <p className="text-white flex justify-center mt-96">
        Chargement du compte en cours...
      </p>
    );
  }

  return (
    <div className="">
      <div className="flex justify-center pt-28 gap-2 text-lg">
        <p className="italic">En cours de développement !!!</p>
      </div>
      <section>
        <form>
          <div>
            <div>
              <label htmlFor="firstname" className="">
                Prénom :
              </label>
              <input
                type="text"
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname" className="">
                Nom :
              </label>
              <input
                type="text"
                id="lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pseudo" className="">
                Pseudo :
              </label>
              <input
                type="text"
                id="pseudo"
                required
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mail" className="">
                Mail :
              </label>
              <input
                type="text"
                id="mail"
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="avatar" className="">
                Avatar :
              </label>
              <input
                type="text"
                id="avatar"
                required
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="about" className="">
                A propos :
              </label>
              <input
                type="text"
                id="about"
                required
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
          <Link to="/my-profile">
            <button
              className=" bg-slate-400"
              type="submit"
              onClick={handleHupdateUser}
            >
              Sauvegarder
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
