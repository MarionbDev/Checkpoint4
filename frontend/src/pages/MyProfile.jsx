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
    <>
      <div className="flex justify-between border-b-2 border-[#282e4d] mx-10 pt-28">
        <p className="text-xl sm:text-3xl  sm:ml-2 ">Gestion de mon profil</p>
      </div>
      <div className="flex justify-center mb-8 mt-8 sm:mb-0 md:mt-20">
        <div className="flex flex-col justify-center text-white p-8 mx-10 mb-8 xl:p-0 md:mx-36 xl:mx-48 xl:h-80 rounded-lg shadow-lg shadow-[#a4aac1] bg-[#4e557a] ">
          <div className="flex flex-col lg:flex-row lg:justify-around md:gap-12 lg:gap-24 lg:mx-10 items-center">
            <div className="flex flex-col">
              <p className="mb-2">Mon pseudo : {user.pseudo} </p>
              <p className="mb-2">Prénom : {user.firstname}</p>
              <p className="mb-2">Nom : {user.lastname}</p>
              <p>Mail : {user.mail}</p>
            </div>
            <div className="flex flex-col  sm:mr-10 mt-10 sm:mt-0 ">
              <p className="sm:mb-2">A propos : </p>
              <p>{user.about}</p>
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:mt-14">
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
    </>
  );
}
