import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import MyCreation from "./MyCreation";

export default function CarrouselDrawings() {
  const [drawings, setDrawings] = useState([]);

  const getAllCreation = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDrawings(data);
      })
      .catch((error) => {
        console.error(error);
        setDrawings();
      });
  };

  useEffect(() => {
    getAllCreation();
  }, []);

  if (drawings.length === 0) {
    return <p>Loading page</p>;
  }

  return (
    <div className="flex max-h-[500px] sm:max-h-screen max-w-screen overflow-hidden sm:w-3/4 md:w-3/5    ">
      <Carousel
        autoPlay
        infiniteLoop
        centerMode
        stopOnHover
        interval={5000}
        showThumbs={false}
        showStatus={false}
      >
        {drawings.map((item) => (
          <div key={`drawing-${item.id}`}>
            <MyCreation
              {...item}
              key={`drawing-${item.id}`}
              image={`${
                import.meta.env.VITE_BACKEND_URL
              }/public/assets/drawings/${item.image}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
