import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";

const useRedirectLoggedOutUser = (path) => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispach(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Votre session est expiré, Veuillez vous connecter");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [dispach, navigate, path]);
};

export default useRedirectLoggedOutUser;
