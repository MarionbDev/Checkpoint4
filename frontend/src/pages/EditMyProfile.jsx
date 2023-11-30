import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUserContext } from "../contexts/UserContext";
import { userUpdateSchema } from "../schemas/userSchemas";
import "react-toastify/dist/ReactToastify.css";

export default function EditMyProfile() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pseudo, setPseudo] = useState("");
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
        // console.log("getOneUser :", data);
        setLastname(data.lastname);
        setFirstname(data.firstname);
        setPseudo(data.pseudo);
        setAbout(data.about);
        setMail(data.mail);
      })
      .catch((err) => console.error(err));
  };

  const notify = () => {
    toast.success("Profil mis à jour !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const updateUser = {
      lastname,
      firstname,
      pseudo,
      about,
      mail,
    };
    userUpdateSchema
      .validate(
        {
          firstname,
          lastname,
          mail,
          about,
          pseudo,
        },
        { abortEarly: false }
      )
      .then(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        })
          .then(() => {
            dispatch({ type: "UPDATE_USER", payload: updateUser });
            notify();
            setTimeout(() => {
              navigate("/my-profile");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      })
      .catch((err) => {
        const userErrors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: { hasError: true, message: error.message },
          };
        }, {});
        console.error("Error Yup :", userErrors);
      });
  };

  useEffect(() => {
    getOneUser();
  }, [id]);

  useEffect(() => {
    if (user) {
      setLastname(user.lastname);
      setFirstname(user.firstname);
      setPseudo(user.pseudo);
      setAbout(user.about);
      setMail(user.mail);
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-white flex justify-center mt-96 min-h-screen">
        Chargement du profil en cours...
      </p>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-xl sm:text-3xl  ml-2 ">Mettre à jour mon profil</p>
      </div>
      <section className="flex justify-center sm:mt-8 mb-8">
        <div className="text-white rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] xl:w-3/6 m-8 sm:m-0  ">
          <form className=" flex flex-col gap-4 p-10">
            <div className="flex flex-col gap-3 sm:gap-8 mx-auto w-full ">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-8  ">
                <div className="flex flex-col sm:justify-between sm:flex-row sm:gap-2 w-full">
                  <label htmlFor="firstname" className="">
                    Prénom :
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="shadow-[#0e0f14] shadow-xl flex sm:w-4/6 h-8 px-2 text-black bg-[#d9dae2] rounded-md "
                  />
                </div>
                <div className="flex flex-col  sm:justify-between sm:flex-row sm:gap-2 w-full ">
                  <label htmlFor="lastname">Nom :</label>
                  <input
                    type="text"
                    id="lastname"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="shadow-[#0e0f14] shadow-xl flex sm:w-4/6 h-8 px-2 text-black bg-[#d9dae2] rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row  gap-3 sm:gap-8 items-center ">
                <div className="flex flex-col  sm:justify-between sm:flex-row sm:gap-2 w-full">
                  <label htmlFor="pseudo" className=" flex items-center">
                    Pseudo :
                  </label>
                  <input
                    type="text"
                    id="pseudo"
                    required
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="shadow-[#0e0f14] shadow-xl flex sm:w-4/6 h-8 px-2 text-black bg-[#d9dae2] rounded-md"
                  />
                </div>
                <div className="flex flex-col  sm:justify-between sm:flex-row sm:gap-2 w-full">
                  <label htmlFor="mail" className="flex items-center w-12">
                    Mail :
                  </label>
                  <input
                    type="text"
                    id="mail"
                    required
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="shadow-[#0e0f14] shadow-xl flex w-full h-8 px-2 text-black bg-[#d9dae2] rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="h-48 mt-4">
              <label htmlFor="about" className="">
                A propos :
              </label>
              <textarea
                rows={6}
                cols={40}
                className="shadow-[#0e0f14] shadow-xl flex w-full mt-2 p-2 text-black bg-[#d9dae2] rounded-md"
                type="text"
                id="about"
                value={about}
                required
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-4 mt-4 ">
              <button
                className="  hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] py-3 px-8 rounded-full text-center mt-6 duration-300"
                type="submit"
                onClick={handleUpdateUser}
              >
                Sauvegarder
              </button>
              <Link
                to="/my-profile"
                className="  hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] py-3 px-8 rounded-full text-center mt-6 duration-300"
              >
                Annuler
              </Link>
              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
