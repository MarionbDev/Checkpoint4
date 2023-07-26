import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";

export default function DrawingDetails() {
  const [drawing, setDrawing] = useState();
  const [newComment, setNewComment] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [userList, setUsersList] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  const [{ user }] = useUserContext();
  const { id } = useParams();

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
    const data = {
      comment: newComment,
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
  };

  const deleteComment = () => {
    // console.log("delete comment ID:", selectedComment);
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
    // console.log("handle ID:", commentId);
    setSelectedComment(commentId);
    // console.log("setSelected id :", commentId);
    deleteComment();
  };

  useEffect(() => {
    getUsersList();
    getOneDrawing();
  }, []);

  useEffect(() => {
    if (drawing && drawing.id) {
      getComment();
    }
  }, [drawing]);

  if (!drawing) {
    return <p className="mt-36 flex justify-center text-md">Loading</p>;
  }

  return (
    <div className="mt-24 mx-20">
      <div className="md:grid md:grid-cols-2  ">
        <div
          key={`details-${drawing.id}`}
          className="flex flex-col items-center my-5 "
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/public/assets/drawings/${
              drawing.image
            }`}
            alt="Drawing"
            className=" border-8 border-black  "
          />
          <div className=" flex flex-col mt-4 text-xl">
            <p className="="> {drawing.title}</p>
            <p className="="> {drawing.description}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-6/12">
            <p className="mb-2">Commentaires : </p>
            <div className="flex flex-col justify-between border-2 border-black h-96 p-4 ">
              <div className="flex flex-col ">
                {commentList.map((item) => {
                  const commentUser = userList.find(
                    (userItem) => userItem.id === item.user_id
                  );
                  return (
                    <div className="flex">
                      <div className="flex  ">
                        <p className="mr-2">{commentUser.pseudo} : </p>
                        <p>{item.comment}</p>
                        {user.role === "admin" && (
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                          >
                            <p>
                              <BsIcons.BsTrash />
                            </p>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" flex justify-center items-center border-2 h-24">
              <textarea
                id="comment"
                name="comment"
                rows="3"
                cols="55"
                value={newComment}
                onChange={handleChangeComment}
                placeholder="Laisser un commentaire ! "
                className=" p-2 italic "
              />
              <button type="button" onClick={handleSubmit}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
