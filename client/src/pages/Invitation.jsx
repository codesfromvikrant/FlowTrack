import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { acceptInvitation } from "@/features/globalSlice";

const Invitation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const loggedIn = useSelector((state) => state.global.logged_in);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn || !token) return;
    dispatch(acceptInvitation(token));
  }, [token, loggedIn]);

  return (
    <div className="text-center">
      <h3>Connecting you to workspace...</h3>
      <h4 className="font-bold">Please wait</h4>
    </div>
  );
};

export default Invitation;
