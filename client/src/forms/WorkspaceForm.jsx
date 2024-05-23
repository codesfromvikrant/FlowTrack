import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkspace } from "src/features/workspaceSlice";
import Button from "src/components/Button";

const WorkspaceForm = () => {
  const dispatch = useDispatch();
  const [formStates, setFormStates] = useState({
    name: "",
    description: "",
  });
  const handleFormStates = (e) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWorkspace(formStates));
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-200 flex flex-col gap-3">
      <h2>Create Workspace to get started with Projects and Tasks!</h2>
      <input
        type="text"
        name="name"
        value={formStates.name}
        onChange={handleFormStates}
        placeholder="Workspace Name"
        className="w-full px-2 py-3 rounded-md bg-secondary border-[1px] border-gray-800 text-slate-400 text-sm placeholder:text-slate-400"
      />
      <textarea
        name="description"
        value={formStates.description}
        onChange={handleFormStates}
        placeholder="Workspace Description"
        className="w-full p-2 rounded-md bg-secondary border-[1px] border-gray-800 text-slate-400 text-sm placeholder:text-slate-400"
      ></textarea>

      <Button
        onClick={() => {}}
        label="Create Workspace"
        icon={<i className="fa-solid fa-plus"></i>}
        active={true}
      />
    </form>
  );
};

export default WorkspaceForm;
