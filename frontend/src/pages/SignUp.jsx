import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userCreationSchema } from "../schemas/userSchemas";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [about, setAbout] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [acceptePolitique, setAcceptePolitique] = useState(false);

  const navigate = useNavigate();

  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleChangePseudo = (e) => {
    setPseudo(e.target.value);
  };

  const handleChangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setMail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Validate the data using Yup schema
      userCreationSchema.validateSync(
        {
          firstname,
          lastname,
          mail,
          password,
          about,
          pseudo,
        },
        { abortEarly: false }
      );

      if (!acceptePolitique) {
        toast.warning("Veuillez accepter la politique de confidentialité.");
      } else if (!mail || !password) {
        toast.warning("Veuillez renseigner un email et un mot de passe.");
      } else {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            mail,
            password,
            about,
            pseudo,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Votre compte a été créé avec succès !");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch(() => {
            toast.error(
              "Error à la création du compte, veuillez rééssayer !!!"
            );
          });
      }
    } catch (error) {
      const validationErrors = error.inner.reduce((acc, validationError) => {
        return {
          ...acc,
          [validationError.path]: validationError.message,
        };
      }, {});

      console.error("Validation errors:", validationErrors);

      if (validationErrors.firstname) {
        toast.error(validationErrors.firstname);
      }
      if (validationErrors.lastname) {
        toast.error(validationErrors.lastname);
      }
      if (validationErrors.mail) {
        toast.error(validationErrors.mail);
      }
      if (validationErrors.password) {
        toast.error(validationErrors.password);
      }
    }
  };

  return (
    <section className="pt-28 sm:flex px-4 text-black min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-[#282e4d] shadow-[#1a1c27] shadow-xl rounded-xl text-white px-4 sm:px-20 py-10 lg:w-8/12  xl:w-6/12 m-auto flex flex-col"
      >
        <div className="flexflex-col w-auto">
          <div className="sm:flex gap-3 mb-2 sm:mb-5">
            <label htmlFor="pseudo" className=" flex items-center">
              Pseudo :{" "}
            </label>
            <input
              className="shadow-[#0e0f14] shadow-xl flex w-full sm:w-2/6 sm:h-8 px-2 text-black bg-[#d9dae2] rounded-md"
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={handleChangePseudo}
            />
          </div>

          <div className="sm:flex gap-3 mb-3 flex-wrap">
            <label htmlFor="firstname" className="flex items-center ">
              * Prénom :
            </label>
            <input
              className="w-full shadow-[#0e0f14] shadow-xl sm:h-8 px-2 text-black flex-1 bg-[#d9dae2] rounded-md mb-2 sm:mb-0"
              type="text"
              id="firstname"
              value={firstname}
              onChange={handleChangeFirstname}
            />
            <label htmlFor="lastname" className=" flex items-center">
              * Nom :{" "}
            </label>
            <input
              className="shadow-[#0e0f14] shadow-xl flex w-full px-2 sm:h-8 text-black flex-1 bg-[#d9dae2] rounded-md"
              type="text"
              id="lastname"
              value={lastname}
              onChange={handleChangeLastname}
            />
          </div>
          <div className="sm:flex sm:flex-col">
            <label htmlFor="about" className="mb-2">
              A propos de vous :
            </label>
            <textarea
              rows={5}
              cols={40}
              className=" shadow-[#0e0f14] shadow-xl text-black flex-1 mb-5 px-4 py-3 bg-[#d9dae2] rounded-md w-full"
              type="text"
              id="about"
              value={about}
              onChange={handleChangeAbout}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 ">
            <label htmlFor="mail" className=" flex items-center">
              * Email :{" "}
            </label>
            <input
              className="shadow-[#0e0f14] shadow-xl w-full sm:h-8 px-2 text-black flex-1 bg-[#d9dae2] rounded-md"
              type="mail"
              id="mail"
              value={mail}
              onChange={handleChangeEmail}
            />
            <label htmlFor="password" className=" flex items-center">
              * Mot de passe :{" "}
            </label>
            <input
              className="w-full shadow-[#0e0f14] shadow-xl sm:h-8 px-2 text-black flex-1 bg-[#d9dae2] rounded-md "
              type={passwordIsVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={handleChangePassword}
            />
            <button
              className="relative"
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
              type="button"
            >
              {!passwordIsVisible ? (
                <svg
                  className="absolute right-5 bottom-[10px] md:bottom-[7px] fill-black"
                  src="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
                  <path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z" />
                </svg>
              ) : (
                <svg
                  className="absolute right-5 bottom-[10px] md:bottom-[7px] fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z" />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-4 ">
            <label className="flex items-start pt-4">
              <input
                type="checkbox"
                id="acceptePolitique"
                checked={acceptePolitique}
                onChange={(e) => setAcceptePolitique(e.target.checked)}
              />
              <span className="ml-2">
                * En soumettant ce formulaire, j'accepte que mes données
                personnelles soient utilisées pour me recontacter. Aucun autre
                traitement ne sera effectué avec mes informations. Pour
                connaître et exercer vos droits, veuillez consultez la{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" font-semibold italic"
                >
                  politique de confidentialité .
                </a>{" "}
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="mx-4 mt-8 bg-[#52597a] rounded-full shadow-[#0b0b10] shadow-xl px-6 py-2 hover:text-white hover:bg-[#3c4369]"
          >
            <p className="text-sm">Finaliser votre inscription</p>
          </button>
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
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
        <p className="italic text-xs mt-4">* Mentions obligatoires</p>
      </form>
    </section>
  );
}
