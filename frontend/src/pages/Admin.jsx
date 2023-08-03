import React, { useEffect, useState } from "react";
// import { Modal } from "react-responsive-modal";
// import * as BsIcons from "react-icons/bs";
import AdminCreateDrawing from "../components/AdminCreateDrawing";
import GetAllUser from "../components/AllUser";
// import Drawing from "../components/Drawing";

export default function Admin() {
  const [drawList, setDrawList] = useState([]);
  // const [selectedDrawingId, setSelectedDrawingId] = useState(null);

  // const [deleteOpen, setDeleteOpen] = useState(false);

  // const deleteOnCloseModal = () => setDeleteOpen(false);

  // const handleNonDeleteButtonClick = () => {
  //   deleteOnCloseModal();
  // };

  // const handleDeleteOpenModal = (userId) => {
  //   setSelectedDrawingId(userId);
  //   setDeleteOpen(true);
  // };

  const getDrawings = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
      .then((resp) => resp.json())
      .then((data) => setDrawList(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDrawings();
  }, []);

  if (drawList.length === 0) {
    return (
      <p className=" text-slate-500 flex justify-center mt-56">
        Chargement en cours...
      </p>
    );
  }
  return (
    <div className=" flex flex-col sm:mt-20 px-2 sm:px-0 md:mx-10 mb-10">
      <div className="flex justify-start mt-24 mb-2 sm:mt-8 border-b-2 border-[#282e4d]  ">
        <p className="text-lg md:text-3xl sm:ml-2 ">Gestion des membres</p>
      </div>
      <div className="flex justify-center">
        <div className=" flex flex-col gap-3 text-white sm::w-4/6 rounded-lg shadow-xl shadow-[#a4aac1] bg-[#4e557a] sm:m-8 ">
          <p className=" font-semibold p-2 sm:pl-4 border-b-2 mx-2 sm:mx-4 border-[#3e466a] ">
            Liste des membres :
          </p>
          <div className="ml-4 sm:grid sm:grid-cols-4 font-medium italic ">
            <p className="md:ml-4">Prénom, Nom</p>
            <p>Pseudo</p>
            <p>Email</p>
          </div>
          <div className="border-y-2  border-[#3e466a] flex scrollbar-thumb mx-4 mb-6  overflow-y-auto overflow-hidden h-72 sm:h-48">
            <GetAllUser />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex justify-start mt-8 border-b-2 border-[#282e4d]">
          <p className="text-lg md:text-3xl ml-2 ">Gestion de la Galerie</p>
        </div>
        <div className="flex flex-col lg:flex-row md:justify-center mt-8">
          <AdminCreateDrawing />
        </div>
      </div>
    </div>
  );
}
