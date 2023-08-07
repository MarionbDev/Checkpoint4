import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import drawingCreationSchema from "../schemas/drawingSchemas";

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
    const fileSelected = e.target.files[0];
    if (imageTypes.includes(fileSelected.type)) {
      setImage(e.target.files[0]);
    } else {
      toast.warning("Seulement les formats jpeg, jpg et png sont autorisés");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error("Un titre et une image sont obligatoires !");
      return;
    }

    drawingCreationSchema
      .validate(
        {
          title,
          description,
          image,
        },
        { abortEarly: false }
      )
      .then(() => {
        // La validation a réussi, vous pouvez effectuer une action ici
        // ou envoyer le dessin au backend pour enregistrement
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
            toast.success("Le dessin a été créé avec succès !");
            setTimeout(() => {
              navigate("/gallery");
            }, 3000);

            setTitle("");
            setDescription("");
            setImage("");
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Erreur à la création, essayez encore !!");
          });
      })
      .catch((err) => {
        // La validation a échoué, traitez les erreurs ici
        const drawingErrors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: { hasError: true, message: error.message },
          };
        }, {});
        console.error("Error Yup :", drawingErrors);
      });
  };

  return (
    <div className="mb-12 flex justify-center ">
      <section className="flex flex-col items-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  md:px-8 md:flex-row gap-4"
        >
          <div className="flex flex-col">
            <div className="lg:flex gap-14">
              <div className="flex flex-col gap-3 sm:gap-10 sm:flex-row">
                <label htmlFor="title" className="flex flex-col mx-auto">
                  Titre :
                  <input
                    ref={fileInputRef}
                    className=" bg-[#e2e4eb] hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4]0 rounded-md ml-2 w-full p-2 duration-300"
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </label>
                <label htmlFor="description" className="flex flex-col mx-auto">
                  Description :
                  <input
                    className=" bg-[#e2e4eb] hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4] rounded-md ml-2 w-full p-2 duration-300"
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleChangeDescription}
                  />
                </label>
              </div>
              <label htmlFor="image" className="flex flex-col mt-4 lg:mt-0">
                Image :
                <input
                  className=" bg-slate-200 p-[5px] ml-2 hover:text-white hover:bg-[#a6b2e4] shadow-md shadow-[#a1aee0] hover:border-2- hover:border-[#8899e4] w-48 sm:w-auto duration-300"
                  type="file"
                  id="image"
                  onChange={handleChangeImage}
                  ref={fileInputRef}
                />
              </label>
            </div>
            <div className="flex justify-center items-center mt-6 sm:mt-8">
              <button
                type="submit"
                className="hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] py-3 px-8 rounded-full duration-300 text-[#FFFFFF]"
              >
                Enregistrer
              </button>
              <ToastContainer
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
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
