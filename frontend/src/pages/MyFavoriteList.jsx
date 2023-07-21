// import { useEffect, useState } from "react";
// import {
//   disableRightClick,
//   removeDisableRightClick,
// } from "../services/favorite";
// import FavoriteDrawing from "../components/FavoriteDrawing";

// export default function Gallery() {
//   const [drawList, setDrawList] = useState([]);

//   const getDrawings = () => {
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
//       .then((resp) => resp.json())
//       .then((data) => setDrawList(data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     getDrawings();
//   }, []);

//   useEffect(() => {
//     disableRightClick();
//     return () => removeDisableRightClick();
//   }, [drawList]);

//   return (
//     <div>
//       {drawList.map((drawing) => (
//         <FavoriteDrawing {...drawing} key={`drawing-${drawing.id}`} />
//       ))}
//     </div>
//   );
// }
