import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function AdminCreateDrawing() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeImage = (e) => {
    // console.log(e);
    const fileSelected = e.target.files[0];
    if (imageTypes.includes(fileSelected.type)) {
      setImage(e.target.files[0]);
    } else {
      alert("Only jpeg, jpg and png are allowed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Veuillez remplir tous les champs!!!");
    } else {
      const drawingData = new FormData();
      drawingData.append("drawingImage", image);
      drawingData.append("title", title);
      drawingData.append("description", description);

      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings`, {
        method: "POST",
        credentials: "include",
        body: drawingData,
      })
        .then((res) => res.json())
        .then(() => {
          navigate(`/admin`);
          alert("Le dessin a été créé avec succès !");
          setTitle("");
          setDescription("");
          setImage("");
          fileInputRef.current.value = null;
        })
        .catch((err) => {
          console.error(err);
          alert("Error to create the drawing, please try again!!!");
        });
    }
  };

  return (
    <div className="mb-12">
      <section className="flex flex-col items-center ">
        <form onSubmit={handleSubmit} className="flex justify-between gap-14">
          <label htmlFor="title">
            Titre :
            <input
              ref={fileInputRef}
              className=" bg-[#e2e4eb] hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4]0 rounded-md ml-2 w-auto  p-2"
              type="text"
              id="title"
              required
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          <label htmlFor="description">
            Description :
            <input
              className=" bg-[#e2e4eb] hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4] rounded-md ml-2 w-auto  p-2"
              type="text"
              id="description"
              value={description}
              onChange={handleChangeDescription}
            />
          </label>
          <label htmlFor="image">
            Image :
            <input
              className=" bg-slate-200 p-[5px] ml-2 hover:text-white hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4]"
              type="file"
              id="image"
              required
              onChange={handleChangeImage}
            />
          </label>
          <button
            type="submit"
            className="rounded-md px-6 hover:text-white hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4]  bg-[#ccd3f1]"
          >
            Enregistrer
          </button>
        </form>
      </section>
    </div>
  );
}
