// import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useUserContext } from "../contexts/UserContext";

export default function DrawingDetails() {
  const [drawing, setDrawing] = useState();

  // const [{ user }] = useUserContext();
  const { id } = useParams();

  const getOneDrawing = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setDrawing(data);
      })
      .catch((err) => console.error(err));
    // .then((data) => setDrawing(data));
  };

  useEffect(() => {
    getOneDrawing();
  }, [id]);

  if (!drawing) {
    return <p className="mt-36 flex justify-center text-md">Loading</p>;
  }

  return (
    <div className="flex justify-center  ">
      <div className="flex justify-center mt-20 w-[50%] h-96  border-2 border-black">
        <div className="flex flex-col justify-between items-end">
          <div className=" flex justify-center  bg-slate-400">
            <div key={drawing.id} className="p-2 portrait-item bg-black">
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/public/assets/drawings/${drawing.image}`}
                alt="Drawing"
              />
              <p>{drawing.title}</p>
            </div>
          </div>
          {/* <div className="flex ">
            <p className="h-20 w-20 bg-orange-300"> {drawing.title} </p>
            <p className="h-20 w-20 bg-red-300"> {drawing.description} </p>
          </div> */}
        </div>
        <div>
          {/* <div>
            {drawing.title}
            {user &&
              (!isFavorite ? (
                <button
                  className=" bg-cyan-400"
                  onClick={addToFavorites}
                  type="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addToFavorites();
                    }
                  }}
                  aria-label="Add to favorites"
                >
                  <div
                    id="favorite"
                    onClick={handleClickFavorite}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleClickFavorite();
                      }
                    }}
                    className={isOnFavorite ? "isFavorite" : "notFavorite"}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isOnFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Ajouter l'oeuvre aux favoris"
                  />
                </button>
              ) : (
                <button
                  className=" bg-cyan-700"
                  type="button"
                  onClick={removeToFavorite}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      removeToFavorite();
                    }
                  }}
                  aria-label="Remove from favorites"
                >
                  <div
                    id="favorite"
                    onClick={handleClickFavorite}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleClickFavorite();
                      }
                    }}
                    className={isOnFavorite ? "notFavorite" : "isFavorite"}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isOnFavorite
                        ? "Add to favorites"
                        : "Remove from favorites"
                    }
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Retirer l'oeuvre des favoris"
                  />
                </button>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
