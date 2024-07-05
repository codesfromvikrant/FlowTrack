import { useEffect } from "react";
import projectIcon from "src/assets/icons/project_lab.png";
import NotesIcon from "src/assets/icons/notes.png";
import galleryIcon from "src/assets/icons/gallery.png";
import { useNavigate } from "react-router";
import ProjectBanner from "src/modules/Explore/ProjectBanner";

const Explore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Explore | WorkFlow";
  }, []);
  return (
    <section className="w-full h-[100vh] bg-primary-foreground overflow-y-auto px-6">
      <div className="max-w-5xl mx-auto my-10">
        <h1 className="text-3xl font-semibold text-primary">
          Explore, Create, and Organize: Unleash Your Project's Potential
        </h1>
        <p className="my-4 text-foreground">
          Discover a new era of project management with our app, where every
          idea, every note, and every document comes to life. Seamlessly explore
          the art of organization as you streamline tasks, create stunning
          notes, and curate galleries that elevate your projects to new heights.
        </p>

        <ProjectBanner />

        <div className="">
          <span className="flex justify-start items-start gap-3">
            <img src={projectIcon} className="w-8" />
            <h3 className="text-lg text-foreground font-semibold tracking-wide">
              Forge Seamless Collaboration, Pave the Project Path, and Masterful
              Task Management
            </h3>
          </span>
          <p className="text-muted-foreground mt-2 mb-4">
            Embark on a journey of project management excellence with our
            cutting-edge app, where collaboration flourishes, paths are paved,
            and tasks are mastered. Experience the power of streamlined
            teamwork, organized project paths, and efficient task management
            that redefine project success.
          </p>
          <button
            onClick={() => navigate("/user/projects")}
            className="bg-background text-sm font-semibold tracking-wider py-3 px-4 hover:bg-blue-600 hover:text-gray-200 transition-all duration-300 shadow-md rounded-md"
          >
            Visit To Projects Lab
          </button>
        </div>

        <div className="mt-6">
          <span className="flex justify-start items-start gap-3">
            <img src={NotesIcon} className="w-8" />
            <h3 className="text-lg text-foreground font-semibold tracking-wide">
              Document Your Journey
            </h3>
          </span>
          <p className="text-muted-foreground mt-2 mb-4">
            From inception to completion, document every milestone with
            precision. Our intuitive interface lets you create and manage
            project documents effortlessly, ensuring that your journey is
            thoroughly recorded.
          </p>
          <button
            onClick={() => navigate("/user/notes")}
            className="bg-background text-sm font-semibold tracking-wider py-3 px-4 hover:bg-blue-600 hover:text-gray-200 transition-all duration-300 shadow-md rounded-md"
          >
            Visit To Notes & Docs
          </button>
        </div>

        <div className="mt-6">
          <span className="flex justify-start items-start gap-3">
            <img src={galleryIcon} className="w-8" />
            <h3 className="text-lg text-foreground font-semibold tracking-wide">
              Curate Beautiful Galleries
            </h3>
          </span>
          <p className="text-muted-foreground mt-2 mb-4">
            Immerse yourself in visual storytelling. Our gallery feature enables
            you to curate captivating visual collections, turning your projects
            into a work of art that speaks volumes.
          </p>
          <button
            onClick={() => navigate("/user/gallery")}
            className="bg-background text-sm font-semibold tracking-wider py-3 px-4 hover:bg-blue-600 hover:text-gray-200 transition-all duration-500 shadow-md rounded-md"
          >
            Visit To Galleries
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;
