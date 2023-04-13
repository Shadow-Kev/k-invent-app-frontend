import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const logout = async () => {
    await logoutUser();
    dispach(SET_LOGIN(false));
    navigate("/login");
  };
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin"> Bienvenue, </span>
          <span className="--color-danger"> {name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Déconnexion
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
