import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import heart from "../assets/coeur.png";

export default function Gallery() {
  const [drawList, setDrawList] = useState([]);

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
    <div className="min-h-screen ">
      <div className="flex justify-start pt-28 border-b-2 border-[#282e4d] mx-10">
        <p className="text-5xl  ml-2 ">GALERIE</p>
      </div>

      <div className="px-8  flex items-center parent mb-14 ">
        {drawList.map((item) => (
          <div className=" rounded-md shadow-lg shadow-[#a4aac1] bg-[#e0e5fb] p-2">
            <Link to={`/drawings/${item.id}`}>
              <div key={item.id} className="p-2 portrait-item bg-black">
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/public/assets/drawings/${item.image}`}
                  alt="Drawing"
                />
              </div>
              <div className="flex z-1 justify-between p-2 ">
                <p>{item.title}</p>
                {/* <button
                  type="button"
                  className="hover:bg-[#e5cdf0] p-1 rounded-full"
                >
                  <p>count</p>
                  <img
                    src={heart}
                    alt="heart logo"
                    className="w-6 h-6 opacity-60 z-0 "
                  />
                </button> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
