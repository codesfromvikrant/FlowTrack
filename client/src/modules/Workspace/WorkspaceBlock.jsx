import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

const WorkspaceBlock = ({ data }) => {
  const navigation = useNavigate();

  const renderWorkspaceItem = data?.map((el) => {
    return (
      <div
        key={el._id}
        onClick={() => navigation(`./${el._id}`)}
        className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 rounded-lg border-border border-2"
      >
        <div
          style={{ backgroundColor: el.bgColor }}
          className="p-2 rounded-t-md h-20 flex justify-end flex-col"
        >
          <p className="text-foreground font-semibold">{el.title}</p>
        </div>
        <div className="bg-accent p-2 rounded-b-md h-24 flex flex-col justify-between">
          <p className="text-secondary-foreground text-xs font-medium">
            {el.description}
          </p>
          <p className="text-slate-500 text-end text-xs font-semibold">
            {el.createdAt}
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-3 gap-3 my-4">{renderWorkspaceItem}</div>
  );
};

export default WorkspaceBlock;
