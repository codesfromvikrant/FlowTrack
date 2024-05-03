const WorkspaceBlock = ({ data }) => {
  console.log(data);

  const renderWorkspaceItem = data?.map((el) => {
    return (
      <div className="text-gray-200 bg-secondary p-3 cursor-pointer rounded-md">
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
