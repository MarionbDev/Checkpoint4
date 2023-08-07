import AdminCreateDrawing from "../components/AdminCreateDrawing";

import GetAllUser from "../components/AllUser";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  return (
    <div className="flex flex-col sm:mt-20 px-2 sm:px-0 md:mx-10 mb-10">
      <div className="flex justify-start mt-24 mb-2 sm:mt-8 border-b-2 border-[#282e4d]  ">
        <p className="text-lg md:text-3xl sm:ml-2 ">Gestion des membres</p>
      </div>
      <div className="flex justify-center">
        <div className=" flex flex-col gap-3 text-white  md:w-5/6 rounded-lg shadow-xl shadow-[#a4aac1] bg-[#4e557a] sm:m-8 ">
          <p className=" font-semibold p-2 sm:pl-4 border-b-2 mx-2 sm:mx-4 border-[#3e466a] ">
            Liste des membres :
          </p>
          <div className="ml-2 grid  sm:grid-cols-4 font-medium italic ">
            <div className="grid  md:grid-cols-2">
              <p className="md:ml-4">Prénom</p>
              <p> Nom</p>
            </div>

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
        <div className="flex justify-center mt-8">
          <AdminCreateDrawing />
        </div>
      </div>
    </div>
  );
}
