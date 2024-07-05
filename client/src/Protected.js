import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { isAuthenticated } from "./features/globalSlice";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.global.logged_in);

  const token = Cookies.get("token");
  const visitedUrl = window.location.href;
  sessionStorage.setItem("visitedUrl", visitedUrl)

  useEffect(() => {
    if (!loggedIn) {
      dispatch(isAuthenticated(token, navigate));
    }
  }, [loggedIn])


  return children;
};
export default Protected;