import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
  };

  return (
    <div className=" ">
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-xl sm:text-3xl  sm:ml-2 ">
          Modifier mon mote de passe
        </p>
      </div>
      <div className="flex justify-center mb-8 mt-8 sm:mb-0 md:mt-24">
        <div className="flex flex-col justify-end text-white px-8 py-5 mx-10 mb-8 md:mx-36 xl:mx-48 xl:h-72 rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] ">
          <form onSubmit={handleSubmit} className="sm:p-4 flex flex-col">
            <label
              htmlFor="new-password"
              className="text-sm  sm:text-base mt-6"
            >
              Nouveau mot de passe
            </label>
            <input
              className=" shadow-[#0e0f14] shadow-xl flex  h-8 px-2  bg-[#d9dae2] rounded-md text-black w-60 p-2 md:w-96 "
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleChangeNewPassword}
            />

            <label
              htmlFor="confirm-new-password"
              className=" text-sm  sm:text-base mt-6"
            >
              Confirmer le nouveau mot de passe
            </label>
            <input
              className=" shadow-[#0e0f14] shadow-xl flex  h-8 px-2  bg-[#d9dae2] rounded-md text-black w-60 p-2 md:w-96 "
              type="password"
              id="confirm-new-password"
              value={confirmNewPassword}
              onChange={handleChangeConfirmNewPassword}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="  hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] py-3 px-8 rounded-full text-center mt-6 duration-300"
              >
                Confirmer
              </button>
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
