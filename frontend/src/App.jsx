import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import SignUp from "./pages/SignUp";
import Gallery from "./pages/Gallery";
import "./App.css";

import "react-responsive-modal/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./modalStyles.css";
import MyProfile from "./pages/MyProfile";
import Connection from "./pages/Connection";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Logout from "./components/Logout";
import EditMyProfile from "./pages/EditMyProfile";
import ChangePassword from "./components/ChangePassword";
import DrawingDetails from "./pages/DrawingDetails";
import Admin from "./pages/Admin";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Connection />} />

        <Route
          path="/"
          element={<PrivateRoutes authorizedRoles={["admin", "user"]} />}
        >
          <Route path="edit-profile/:id" element={<EditMyProfile />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="drawings/:id" element={<DrawingDetails />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route
          path="/admin"
          element={<PrivateRoutes authorizedRoles={["admin"]} />}
        >
          <Route index element={<Admin />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
