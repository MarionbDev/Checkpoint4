import React, { useEffect, useState } from "react";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

import { useUserContext } from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const [drawList, setDrawList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [{ user }] = useUserContext();

  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!user);

  const getDrawings = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
      .then((resp) => resp.json())
      .then((data) => {
        setDrawList(data);
      })
      .catch((error) => console.error(error));
  };

  // const handleDrawingClick = () => {
  //   if (!isUserLoggedIn) {
  //     console.log("User is not logged in.");
  //     toast.warning("Veuillez vous connecter pour accéder au site");
  //   }
  // };

  useEffect(() => {
    getDrawings();
  }, [user]);

  // useEffect(() => {
  //   setIsUserLoggedIn(!!user);
  // }, [user]);

  if (drawList.length === 0) {
    return (
      <p className="text-slate-500 flex justify-center mt-56 min-h-screen">
        Chargement en cours...
      </p>
    );
  }

  return (
    <div className="flex flex-col  min-w-min min-h-screen ">
      <div className="flex justify-between  pt-28 border-b-2 border-[#282e4d] ml-2 mb-5 mx-6 ">
        <p className=" text-2xl sm:text-5xl ml-2">GALERIE</p>
        <div className="flex mb-2 ">
          <BiIcons.BiSearchAlt className="relative top-2 left-8 w-5 h-5 " />
          <input
            className=" bg-[#e2e4eb] hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4] rounded-md ml-2 w-full pl-7 p-2 h-8 italic text-sm duration-300 "
            type="text"
            placeholder="Mots clés "
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 parent mb-14">
        {drawList
          .filter((item) =>
            item.title.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((item) => (
            <div
              className=" h-[16rem] flex flex-col justify-between rounded-md shadow-lg shadow-[#a4aac1] bg-[#e0e5fb] hover:scale-110 duration-500 p-2  "
              key={item.id}
            >
              <div>
                <Link to={`/gallery/${item.id}`}>
                  <div className="flex justify-center items-center py-1 mx-4 portrait-item ">
                    <img
                      src={`${import.meta.env.VITE_ASSETS_URL}/drawings/${
                        item.image
                      }`}
                      alt="Drawing"
                      className=" h-[12rem] object-cover border-4 border-black  "
                    />
                  </div>
                </Link>
              </div>
              <div className="border-t-[#c6cad7] border-2 flex justify-center items-center ">
                <p className="truncate">{item.title}</p>
              </div>
            </div>
          ))}
        {/* <ToastContainer
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
        /> */}
      </div>
    </div>
  );
}
