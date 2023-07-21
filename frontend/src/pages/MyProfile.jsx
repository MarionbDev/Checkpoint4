import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function MyProfile() {
  const [{ user }] = useUserContext();

  if (!user) {
    return (
      <p className=" text-slate-500 flex justify-center mt-56">
        Chargement en cours...
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-3xl  ml-2 ">Gestion de mon profil</p>
      </div>
      <div className=" text-white mt-20 mx-36 h-76 flex flex-col  p-5 rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] ">
        <div className="flex items-center gap-36 mb-2">
          <div className="flex flex-col justify-center ">
            <div className="flex flex-col items-center mx-6 p-4 mt-4">
              <p className="mb-3">Mon pseudo : </p>
              <img
                src={user.avatar}
                className=" h-20 w-20 rounded-full"
                alt="Avatar"
              />
            </div>
            <p className="text-center mt-5">{user.pseudo}</p>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <p className="mb-2">Prénom : {user.firstname}</p>
              <p className="mb-2">Nom : {user.lastname}</p>
              <p>Mail : {user.mail}</p>
            </div>
          </div>
          <p>A propos : {user.about}</p>
        </div>
        <div className="flex justify-center">
          <Link
            to={`/edit-profile/${user.id}`}
            className=" hover:bg-[#a6b2e4] shadow-xl shadow-[#282e4d] hover:border-2- hover:border-[#8899e4] bg-[#838caf] p-2 rounded-full"
          >
            <button className="px-4" type="button">
              Modifier mon profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
