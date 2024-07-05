import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "@/modules/Auth";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const Invitation = () => {
  const navigation = useNavigate();
  const loggedIn = useSelector((state) => state.auth.logged_in);

  useEffect(() => {
    if (!loggedIn) return;
    navigation("/user/workspaces");
  }, [loggedIn]);

  return <>{!loggedIn ? <Auth /> : <Progress value={33} />}</>;
};

export default Invitation;
