import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  disableRightClick,
  removeDisableRightClick,
} from "../services/favorite";
import "../pages/css/DrawingDetails.css";

export default function MyCreation({ image }) {
  useEffect(() => {
    disableRightClick();
    return () => removeDisableRightClick();
  }, []);

  return (
    <div>
      <div className="flex gap-10">
        <img src={image} alt="Drawing" />
      </div>
    </div>
  );
}

MyCreation.propTypes = {
  image: PropTypes.string.isRequired,
};
