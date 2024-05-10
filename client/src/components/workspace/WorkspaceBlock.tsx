import { useNavigate } from "react-router";

const WorkspaceBlock = ({ data }) => {
  const navigation = useNavigate();
  const renderWorkspaceItem = data?.map((el) => {
    return (
      <div
        key={el._id}
        onClick={() => navigation(`./${el._id}`)}
        className="text-gray-200 bg-secondary p-3 cursor-pointer rounded-md"
      >
        <p>{el.name}</p>
        <p>{el.createdAt}</p>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-4 gap-3 my-4">{renderWorkspaceItem}</div>
  );
};

export default WorkspaceBlock;
