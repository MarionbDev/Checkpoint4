import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Gallery() {
  const [drawList, setDrawList] = useState([]);

  const [{ user }] = useUserContext();

  const getDrawings = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("data from server:", data);
        setDrawList(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDrawings();
  }, [user]);

  if (drawList.length === 0) {
    return (
      <p className="text-slate-500 flex justify-center mt-56">
        Chargement en cours...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex justify-start pt-28 border-b-2 border-[#282e4d] ml-2 sm:mx-10 mb-5">
        <p className=" text-2xl sm:text-5xl ml-2">GALERIE</p>
      </div>

      <div className="flex  sm:px-8 parent mb-14">
        {drawList.map((item) => (
          <div
            className=" h-[25rem] flex flex-col justify-between rounded-md shadow-lg shadow-[#a4aac1] bg-[#e0e5fb] p-2  "
            key={item.id}
          >
            <div className="">
              <Link to={`/gallery/${item.id}`}>
                <div className="flex justify-center items-center py-2 mx-2 portrait-item  ">
                  <img
                    src={`${import.meta.env.VITE_ASSETS_URL}/drawings/${
                      item.image
                    }`}
                    alt="Drawing"
                    className=" h-[19rem] object-cover border-4 border-black  "
                  />
                </div>
              </Link>
            </div>
            <div className="border-t-[#c6cad7] border-2 flex justify-between items-center ">
              <p className="truncate">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
