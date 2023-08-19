import { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as GoIcons from "react-icons/go";
import { useUserContext } from "../contexts/UserContext";
import PrivateLink from "../components/PrivateLink";
import Logout from "../components/Logout";
import Contact from "./Contact";
import "./css/navbar.css";
import Header from "../components/Header";
// commit pout new pull request
export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [{ user }] = useUserContext();

  return (
    <>
      <div className="navbar text-white fixed w-full z-50 top-0  ">
        <button type="button" className="menu-bars">
          <AiIcons.AiOutlineMenu onClick={showSidebar} />
        </button>
        <div className="flex justify-center w-[70%] text-xl sm:w-[80%] md:w-[88%] sm:text-4xl">
          <Link to="/">
            <p className="header-style-text ">DRAWING AND CO</p>
          </Link>
          <div className="absolute right-2 top-2 sm:right-4 md:top-4  ">
            <Header />
          </div>
        </div>
      </div>
      <div className="text-white  ">
        {user ? (
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <button
              type="button"
              className="nav-menu-items"
              onClick={showSidebar}
            >
              <div className="navbar-toggle">
                <button type="button" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col h-[20rem] mb-10">
                  <li className=" nav-text ">
                    <Link to="gallery">
                      <AiIcons.AiFillPicture />
                      <span className="ml-4">Galerie</span>
                    </Link>
                  </li>
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
                    <Link to="/faq">
                      <GoIcons.GoQuestion />
                      <span className="ml-4 ">FAQ</span>
                    </Link>
                  </li>
                  <li className="nav-text  ">
                    <Contact />
                  </li>
                </div>
                <div className="mt-44 ">
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
        ) : (
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <button
              type="button"
              className="nav-menu-items"
              onClick={showSidebar}
            >
              <div className="navbar-toggle">
                <button type="button" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col h-[20rem] mb-10">
                  <li className=" nav-text ">
                    <Link to="gallery">
                      <AiIcons.AiFillPicture />
                      <span className="ml-4">Galerie</span>
                    </Link>
                  </li>

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
                      <span className="ml-4 ">S'enregistrer</span>
                    </Link>
                  </li>
                  <li className=" nav-text ">
                    <Link to="/faq">
                      <GoIcons.GoQuestion />
                      <span className="ml-4 ">FAQ</span>
                    </Link>
                  </li>
                  <li className="nav-text p-0 ">
                    <Contact />
                  </li>
                </div>
                <div className="mt-44 ">
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
        )}
      </div>
    </>
  );
}
