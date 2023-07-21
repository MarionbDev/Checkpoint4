import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import * as BsIcons from "react-icons/bs";
import AdminCreateDrawing from "../components/AdminCreateDrawing";
import GetAllUser from "../components/AllUser";

export default function Admin() {
  const [drawList, setDrawList] = useState([]);
  const [selectedDrawingId, setSelectedDrawingId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteOnCloseModal = () => setDeleteOpen(false);

  const handleNonDeleteButtonClick = () => {
    deleteOnCloseModal();
  };

  const handleDeleteOpenModal = (userId) => {
    setSelectedDrawingId(userId);
    setDeleteOpen(true);
  };

  const getDrawings = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
      .then((resp) => resp.json())
      .then((data) => setDrawList(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDrawings();
  }, []);

  const deleteDrawing = () => {
    // if (confirm("Voulez-vous supprimer cette intervention ?")) {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/drawings/${selectedDrawingId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then(() => {
        getDrawings();
        deleteOnCloseModal();
      })
      .catch((err) => console.error(err));
    // }
  };

  if (drawList.length === 0) {
    return (
      <p className=" text-slate-500 flex justify-center mt-56">
        Chargement en cours...
      </p>
    );
  }
  return (
    <div className="flex flex-col  mx-10 mb-10 ">
      <div className="flex justify-start mt-8 border-b-2 border-[#282e4d] mx-10">
        <p className="text-3xl  ml-2 ">Gestion des membres</p>
      </div>
      <div className="flex justify-center">
        <div className=" flex flex-col  gap-3 text-white w-4/6 rounded-lg shadow-xl shadow-[#a4aac1] bg-[#4e557a]   m-8 ">
          <p className=" font-semibold p-2 pl-4 border-b-2 mx-4 border-[#3e466a] ">
            Liste des membres :
          </p>
          <div className="grid grid-cols-4 font-medium italic ">
            <p className="ml-4">Prénom, Nom</p>
            <p>Pseudo</p>
            <p>Email</p>
          </div>
          <div className="border-y-2  border-[#3e466a] flex scrollbar-thumb mx-4 mb-6  overflow-y-auto overflow-hidden h-48">
            <GetAllUser />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex justify-start mt-8 border-b-2 border-[#282e4d] mx-10">
          <p className="text-3xl  ml-2 ">Gestion de la Galerie</p>
        </div>
        <div className="mt-8">
          <AdminCreateDrawing />
        </div>
        <div className="px-8  flex items-center parent ">
          {drawList.map((item) => (
            <div
              key={item.id}
              className="bg-[#e2e4eb] hover:bg-[#6f77a2] shadow-xl shadow-[#7f88ad] rounded-md p-2  hover:text-white"
            >
              <div className="p-2 portrait-item bg-black ">
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/public/assets/drawings/${item.image}`}
                  alt="Drawing"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex justify-center mt-1">
                  <p className="ml-1 text-center truncate">{item.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteOpenModal(item.id)}
                  className="mr-1 mt-1 hover:bg-[#a1aee0] hover:shadow-md hover:shadow-[#4e557a] rounded-full p-2"
                >
                  <p>
                    <BsIcons.BsTrash />
                  </p>
                </button>
              </div>
            </div>
          ))}{" "}
        </div>
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
              onClick={deleteDrawing}
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
