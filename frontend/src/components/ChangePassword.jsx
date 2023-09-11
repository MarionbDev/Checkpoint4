import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { changePasswordSchema } from "../schemas/changePasswordSchemas";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const notify = () => {
    toast.success("Mot de passe mis à jour !", {
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

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Validate the data using Yup schema
      changePasswordSchema.validateSync(
        {
          newPassword,
          confirmNewPassword,
        },
        { abortEarly: false }
      );

      if (newPassword === confirmNewPassword) {
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/change-password`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: newPassword,
            }),
          }
        )
          .then((res) => {
            res.json();
          })
          .then(() => {
            console.warn("ok");
            notify();
            setTimeout(() => {
              navigate("/my-profile");
            }, 3000);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        toast.error(
          "Attention : confirmation du nouveau mot de passe non valide !"
        );
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      const validationErrors = error.inner.reduce((acc, validationError) => {
        return {
          ...acc,
          [validationError.path]: validationError.message,
        };
      }, {});

      console.error("Validation errors:", validationErrors);

      if (validationErrors.newPassword) {
        toast.warn(validationErrors.newPassword);
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-lg sm:text-3xl  sm:ml-2 ">
          Modifier mon mot de passe
        </p>
      </div>
      <div className="flex justify-center  mb-8 mt-8 sm:mb-0 md:mt-24">
        <div className="flex flex-col justify-end text-white px-8 py-5 mx-10 mb-8 md:mx-36 xl:mx-48 xl:h-72 rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] ">
          <form onSubmit={handleSubmit} className="sm:p-4 flex flex-col mx-1">
            <div className="flex">
              <label
                htmlFor="new-password"
                className="text-sm  sm:text-base mt-6"
              >
                Nouveau mot de passe
                <input
                  className=" shadow-[#0e0f14] shadow-xl flex  h-8 px-2  bg-[#d9dae2] rounded-md text-black w-60 p-2 md:w-96 "
                  type={passwordIsVisible ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                />
              </label>
              <button
                className="relative"
                onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                type="button"
              >
                {passwordIsVisible ? (
                  <svg
                    className="absolute right-5 bottom-[8px] fill-black"
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
                    className="absolute right-5 bottom-[8px] fill-black"
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
            <div className="flex">
              <label
                htmlFor="confirm-new-password"
                className=" text-sm  sm:text-base mt-6"
              >
                Confirmer le nouveau mot de passe
                <input
                  className=" shadow-[#0e0f14] shadow-xl flex  h-8 px-2  bg-[#d9dae2] rounded-md text-black w-60 p-2 md:w-96 "
                  type={confirmPasswordIsVisible ? "text" : "password"}
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  onChange={handleChangeConfirmNewPassword}
                />{" "}
              </label>
              <button
                className="relative"
                onClick={() =>
                  setConfirmPasswordIsVisible(!confirmPasswordIsVisible)
                }
                type="button"
              >
                {confirmPasswordIsVisible ? (
                  <svg
                    className="absolute right-8 md:right-5 bottom-[8px] fill-black"
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
                    className="absolute right-5 bottom-[8px] fill-black"
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

            <div className="flex justify-center gap-6 ml-3">
              <button
                type="submit"
                onClick={handleSubmit}
                className="  hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] py-3 px-8 rounded-full text-center mt-6 duration-300"
              >
                Confirmer
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
      </div>
    </div>
  );
}
