import PropTypes from "prop-types";

export default function Drawing({ info }) {
  return (
    <div className="flex justify-center  ">
      <div className="flex justify-center  items-center h-[17rem] ">
        <div className="flex flex-col justify-between items-end">
          <div className=" flex justify-center ">
            <div
              key={info.id}
              className="p-2 portrait-item bg-black w-2/3 mt-48 "
            >
              <img
                src={`${import.meta.env.VITE_ASSETS_URL}/drawings/${
                  info.image
                }`}
                alt="Drawing"
                className=" "
              />
            </div>
          </div>
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

Drawing.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
