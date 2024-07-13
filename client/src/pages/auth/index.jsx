import Logo from "@/assets/icons/workflow.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export default function Auth() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.global.logged_in);

  useEffect(() => {
    if (!loggedIn) return;
    navigate("/user");
  }, [loggedIn]);

  return (
    <main className="bg-slate-100 h-screen">
      <header className="bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-start items-center mx-auto">
            <img src={Logo} className="w-12" alt="mediaharbor-logo" />
            <p className="text-md font-black text-center uppercase w-max text-foreground">
              FlowTrack
            </p>
          </div>
        </div>
      </header>

      <div className="h-full w-full flex justify-center items-center">
        <section className="flex justify-between items-center lg:flex-row flex-col gap-10 max-w-6xl mx-auto">
          <div className="sm:w-2/3 w-full">
            <h1 className="md:text-3xl text-3xl text-start tracking-wide text-foreground mb-3 font-black">
              Empower Your Teams with Flowtrack Excellence. Navigate Workspace,
              Projects, Tasks, and Documents Effortlessly.
            </h1>
            <p className="text-base font-medium text-start text-muted-foreground">
              In the world of project management, simplicity is key. Workflow
              provides a seamless and effortless experience for navigating
              through projects and taking notes. Whether you're a seasoned pro
              or new to project management, our user-friendly interface ensures
              that you can easily access, organize, and find what you need, when
              you need it. Effortless navigation, at your fingertips.
            </p>
          </div>

          <div className="lg:w-1/3 md:w-1/2 sm:w-2/3 w-full flex justify-center items-center gap-2  flex-col">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}
