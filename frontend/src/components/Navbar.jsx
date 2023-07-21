import { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
// import { useUserContext } from "../contexts/UserContext";
import PrivateLink from "./PrivateLink";
import Logout from "./Logout";
import Header from "./Header";
import "./Navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  // const { user } = useUserContext();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar text-white fixed w-full top-0  ">
        <button type="button" className="menu-bars">
          <AiIcons.AiOutlineMenu onClick={showSidebar} />
        </button>
        <div className="flex justify-center  w-[88%] text-4xl">
          <Link to="/">
            <p className="header-style-text ">DRAWING AND CO</p>
          </Link>
          <Header />
        </div>
      </div>
      <div className="text-white  ">
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <button
            type="button"
            className="nav-menu-items"
            onClick={showSidebar}
          >
            <div className="navbar-toggle">
              <buttont type="button" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </buttont>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col h-[20rem] mb-10">
                <li className=" nav-text ">
                  <Link to="gallery">
                    <AiIcons.AiFillPicture />
                    <span className="ml-4">Galerie</span>
                  </Link>
                </li>
                {/* {user && ( */}
                <PrivateLink
                  to="my-profile"
                  text={
                    <div className="relative left-[-16px] flex items-center ">
                      <AiIcons.AiFillProfile />
                      <span className="ml-4"> Mon compte</span>
                    </div>
                  }
                  authorizedRoles={["admin", "user"]}
                />

                <PrivateLink
                  to="admin"
                  text={
                    <div className="relative left-[-16px] flex items-center ">
                      <MdIcons.MdHomeRepairService />
                      <span className="ml-4"> Administrateur</span>
                    </div>
                  }
                  authorizedRoles={["admin"]}
                />

                <li className=" nav-text ">
                  <Link to="/login">
                    <BsIcons.BsFillPersonFill />
                    <span className="ml-4">Se connecter</span>
                  </Link>
                </li>
                <li className=" nav-text ">
                  <Link to="/signup">
                    <BsIcons.BsPersonPlusFill />
                    <span className="ml-4">S'enregistrer</span>
                  </Link>
                </li>
                <li className=" nav-text ">
                  <Link to="/contact">
                    <AiIcons.AiOutlineMessage />
                    <span className="ml-4">Contact</span>
                  </Link>
                </li>
              </div>
              <div className="mt-44 ">
                {/* {user && ( */}
                <PrivateLink
                  to="/login"
                  text={
                    <div className="relative left-[-16px] flex items-center ">
                      <span className=" rotate-180">
                        <AiIcons.AiOutlineLogout />
                      </span>
                      <span className="ml-4 ">
                        <Logout />
                      </span>
                    </div>
                  }
                  authorizedRoles={["admin", "user"]}
                />
              </div>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}
