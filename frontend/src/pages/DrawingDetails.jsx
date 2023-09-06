import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useUserContext } from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

export default function DrawingDetails() {
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState();
  const [newComment, setNewComment] = useState([]);
  const [userList, setUsersList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedDrawingId, setSelectedDrawingId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [{ user }] = useUserContext();
  const { id } = useParams();

  const deleteOnCloseModal = () => setDeleteOpen(false);

  const handleNonDeleteButtonClick = () => {
    deleteOnCloseModal();
  };

  const handleDeleteOpenModal = (userId) => {
    setSelectedDrawingId(userId);
    setDeleteOpen(true);
  };

  const getUsersList = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
      .then((resp) => resp.json())
      .then((data) => {
        setUsersList(data);
      })
      .catch((err) => console.error(err));
  };

  const getOneDrawing = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drawings/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setDrawing(data);
      })
      .catch((err) => console.error(err));
  };

  const getComment = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/`)
      .then((resp) => resp.json())
      .then((data) => {
        if (drawing.id) {
          const filteredComments = data.filter(
            (comment) => comment.drawing_id === drawing.id
          );
          setCommentList(filteredComments);
        }
      })

      .catch((err) => console.error(err));
  };

  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.pseudo) {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const data = {
        comment: newComment,
        dateTime: formattedDate,
        userId: user.id,
        drawingId: drawing.id,
      };

      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          setNewComment("");
          getComment();
        })
        .catch((err) => console.error(err));
    } else {
      toast.error("Vous devez avoir un pseudo pour poster un commentaire.");
    }
  };

  const deleteComment = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/comments/${selectedComment}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then(() => {
        getComment();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (commentId) => {
    setSelectedComment(commentId);
  };

  const deleteDrawing = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/drawings/${selectedDrawingId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then(() => {
        deleteOnCloseModal();
        navigate("/gallery");
      })

      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUsersList();
    getOneDrawing();
  }, []);

  useEffect(() => {
    if (selectedComment !== null) {
      deleteComment();
    }
  }, [selectedComment]);

  useEffect(() => {
    if (drawing && drawing.id) {
      getComment();
    }
  }, [drawing]);

  if (!drawing) {
    return <p className="mt-36 flex justify-center text-md">Loading</p>;
  }

  return (
    <div className="mt-20">
      <Link to="/gallery">
        <BsIcons.BsArrowLeftCircle className="absolute mt-3  ml-3 w-7 h-7" />
      </Link>
      <div className="md:grid md:grid-cols-2 mx-4 mt-7">
        <div
          key={`details-${drawing.id}`}
          className="flex flex-col items-center my-5 mx-4 "
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/public/assets/drawings/${
              drawing.image
            }`}
            alt="Drawing"
            className=" border-8 border-black max-h-[37rem]"
          />
          <div className="flex items-center gap-5  mt-2 ">
            <div className=" flex flex-col items-center">
              <p className="text-sm sm:text-lg"> {drawing.title}</p>
              <p className="text-sm sm:text-md"> {drawing.description}</p>
            </div>
            <div className="flex items-center">
              {user.role === "admin" && (
                <button
                  type="button"
                  onClick={() => handleDeleteOpenModal(drawing.id)}
                  className="mr-1 mt-1 hover:bg-[#a1aee0] hover:shadow-md hover:shadow-[#4e557a] hover:text-white bg-[#d3d9f3]  rounded-full p-3 duration-200"
                >
                  <p>
                    <BsIcons.BsTrash />
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center  ">
          <div className="w-full sm:w-9/12 rounded-lg shadow-xl shadow-[#a4aac1] bg-[#939cc4] p-4">
            <p className="mb-2 ml-2 text-[#FFFFFF] font-semibold italic">
              Commentaires :
            </p>
            <div className="flex flex-col justify-between rounded-md shadow-xl shadow-[#2b334f] bg-[#e1e4f6] h-96 p-4 mb-6 ">
              <div className="flex flex-col  overflow-y-auto overflow-hidden scrollbar-thumb ">
                {commentList.map((item, index) => {
                  const commentUser = userList.find(
                    (userItem) => userItem.id === item.user_id
                  );
                  return (
                    <div key={item.id}>
                      <div>
                        <div
                          className={`flex justify-between ${
                            index % 2 === 0
                              ? "bg-[#939cc4] text-[#191f3f] "
                              : "bg-white text-[#1b265d]"
                          }  rounded-md mb-1 p-1 `}
                        >
                          <div className="flex flex-col">
                            <p className=" text-base">
                              {commentUser.pseudo} :{" "}
                            </p>
                            <div className="flex flex-col">
                              <p className=" text-base mx-1 ">{item.comment}</p>
                              <p className="italic text-xs">
                                {format(
                                  new Date(item.dateTime),
                                  "dd-MM-yyyy HH:mm"
                                )}
                              </p>
                            </div>
                          </div>
                          <div>
                            {user.role === "admin" ||
                            user.id === item.user_id ? (
                              <div>
                                <div className="flex justify-center items-center p-3  w-8 h-8 rounded-full hover:bg-[#a1aee0] hover:shadow-md hover:shadow-[#4e557a] hover:text-white  duration-200">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <p>
                                      <BsIcons.BsTrash />
                                    </p>
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" flex justify-between items-center border-2 h-13 p-1 rounded-md shadow-xl shadow-[#2b334f] bg-[#cbd1f0]">
              <textarea
                id="comment"
                name="comment"
                rows="1"
                cols="50"
                value={newComment}
                onChange={handleChangeComment}
                placeholder="Laissez un commentaire ! "
                className=" p-2 italic rounded-md text-sm "
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="mx-2 p-1 rounded-full hover:bg-[#a1aee0] hover:shadow-md hover:shadow-[#4e557a] hover:text-white duration-200"
              >
                <AiIcons.AiOutlineMessage className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={deleteOpen}
        onClose={deleteOnCloseModal}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={
          <span
            style={{
              fontSize: "20px",
              width: "18px",
              height: "18px",
              color: "white",
            }}
          >
            X
          </span>
        }
      >
        <h1 className="text-[#FFFFFF] text-center">
          Souhaitez-vous supprimer ce dessin ?
        </h1>
        <div className="flex justify-center mt-2 gap-6 ">
          <button
            type="button"
            onClick={deleteDrawing}
            className="text-[#FFFFFF] bg-[#46526c] sm:rounded-full sm:mt-3 sm:w-20 sm:hover:bg-white/30  sm:hover:font-semibold"
          >
            Oui
          </button>

          <button
            type="button"
            onClick={handleNonDeleteButtonClick}
            className="text-[#FFFFFF] bg-[#46526c] sm:rounded-full sm:mt-3 sm:w-20 sm:hover:bg-white/30  sm:hover:font-semibold"
          >
            <p className=" text-center p-1">Non</p>
          </button>
        </div>
      </Modal>
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
  );
}
