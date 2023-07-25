import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

// import MyCreation from "../components/MyCreation";

export default function EditMyProfile() {
  const [userProf, setUserProf] = useState([]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [avatar, setAvatar] = useState("");
  const [about, setAbout] = useState("");
  const [mail, setMail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useUserContext();

  const getOneUser = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("data users:", data);
        setUserProf(data);
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

  useEffect(() => {
    if (user) {
      setLastname(user.lastname);
      setFirstname(user.firstname);
      setPseudo(user.pseudo);
      setAvatar(user.avatar);
      setAbout(user.about);
      setMail(user.mail);
    }
  }, [user]);

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

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then(() => {
        // console.log("User updated successfully:", data);
        dispatch({ type: "UPDATE_USER", payload: updateUser });
        navigate("/my-profile");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  useEffect(() => {
    getOneUser();
  }, [id]);

  if (!userProf) {
    return (
      <p className="text-white flex justify-center mt-96">
        Chargement du compte en cours...
      </p>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-3xl  ml-2 ">Mettre à jour mon profil</p>
      </div>
      <section>
        <div className="  mt-20 mx-96 h-76 flex flex-col  p-5 rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] ">
          <form>
            <div className="flex flex-col gap-10">
              <div className="flex justify-between">
                <label htmlFor="firstname" className="">
                  Prénom :
                </label>
                <input
                  type="text"
                  id="firstname"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full"
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

            <button
              className=" bg-slate-400"
              type="submit"
              onClick={handleHupdateUser}
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
