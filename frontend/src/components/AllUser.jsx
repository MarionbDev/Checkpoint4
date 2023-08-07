import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import * as BsIcons from "react-icons/bs";

export default function GetAllUser() {
  const [user, setAllUser] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteOnCloseModal = () => setDeleteOpen(false);

  const handleNonDeleteButtonClick = () => {
    deleteOnCloseModal();
  };

  const handleDeleteOpenModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteOpen(true);
  };

  const getAllUser = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data);
        console.warn(data);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteUser = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${selectedUserId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        getAllUser();
        deleteOnCloseModal();
      })
      .catch((err) => console.error(err));
  };

  if (!user) {
    return (
      <p className="text-white flex justify-center mt-96">
        Chargement des utilisateurs...
      </p>
    );
  }

  const sortedUsers = [...user].sort((a, b) =>
    a.firstname.localeCompare(b.firstname)
  );

  return (
    <div>
      {sortedUsers.map((item) => {
        return (
          <div key={item.id} className="grid sm:grid-cols-4 gap-2 py-1 w-full ">
            <div className="md:grid md:grid-cols-2">
              <p className=" ">{item.firstname} </p>
              <p>{item.lastname}</p>
            </div>
            <p>{item.pseudo}</p>
            <p className="flex truncate lg:w-72">{item.mail}</p>

            <div className="flex justify-center items-start   sm:items-center ml-10 ">
              <button
                type="button"
                onClick={() => handleDeleteOpenModal(item.id)}
                className="bg-[#a1aee0] md sm:bg-[#4e557a] hover:bg-[#a1aee0] hover:shadow-md hover:shadow-[#23273f] rounded-full p-2 hover:text-black duration-300"
              >
                <p>
                  <BsIcons.BsTrash />
                </p>
              </button>
            </div>
          </div>
        );
      })}

      <div>
        <Modal
          open={deleteOpen}
          onClose={deleteOnCloseModal}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <span
              style={{
                fontSize: "20px",
                width: "18px",
                height: "18px",
                color: "white",
              }}
            >
              X
            </span>
          }
        >
          <h1 className="text-[#FFFFFF] text-center">
            Souhaitez-vous supprimer ce membre ?
          </h1>
          <div className="flex justify-center mt-2 gap-6 ">
            <button
              type="button"
              onClick={deleteUser}
              className="text-[#FFFFFF] bg-[#46526c] sm:rounded-full sm:mt-3 sm:w-20 sm:hover:bg-white/30  sm:hover:font-semibold"
            >
              Oui
            </button>

            <button
              type="button"
              onClick={handleNonDeleteButtonClick}
              className="text-[#FFFFFF] bg-[#46526c] sm:rounded-full sm:mt-3 sm:w-20 sm:hover:bg-white/30  sm:hover:font-semibold"
            >
              <p className=" text-center p-1">Non</p>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
