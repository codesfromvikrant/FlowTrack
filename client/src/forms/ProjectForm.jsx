import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createProject } from "src/features/projectsSlice";
import Tags from "src/components/Tags";
import Button from "src/components/Button";
import Modal from "src/components/Modal/Modal";
import ManageRoles from "src/components/ManageRoles";
import { BsFillPeopleFill } from "react-icons/bs";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const workspaceId = useSelector(
    (state) => state.workspace.workspace.currentId
  );
  const [activeManageRoles, setActiveManageRoles] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [formStates, setFormStates] = useState({
    name: "",
    description: "",
    workspace: workspaceId,
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormStates((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTagToggle = (id) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(id)
        ? prevTags.filter((tag) => tag !== id)
        : [...prevTags, id]
    );
  };

  const toggleActiveManageRoles = () => {
    setActiveManageRoles(!activeManageRoles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formStates));
  };

  const inputClass =
    "text-slate-700 placeholder:text-slate-600 font-medium outline-none w-full text-sm py-3 px-2 bg-secondary rounded-md";

  return (
    <div className="flex justify-center items-start gap-3">
      <Modal
        active={activeManageRoles}
        handleActive={toggleActiveManageRoles}
        widthClass="w-72"
      >
        <ManageRoles />
      </Modal>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formStates.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          className={inputClass}
        />
        <textarea
          name="description"
          value={formStates.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          className={`${inputClass} h-60`}
        />
        <Tags
          selectedTags={selectedTags}
          handleSelectedTags={handleTagToggle}
        />

        <div className="flex justify-start items-center gap-3">
          <Button
            onClick={toggleActiveManageRoles}
            label="Workspace Leads"
            active={false}
            icon={<BsFillPeopleFill />}
            className="py-2 hover:text-slate-100"
          />
          <Button
            onClick={toggleActiveManageRoles}
            label="Workspace Members"
            active={false}
            icon={<BsFillPeopleFill />}
            className="py-2 hover:text-slate-100"
          />
        </div>

        <div className="flex justify-start items-center gap-3">
          <div>
            <label
              htmlFor="startDate"
              className="text-slate-700 text-sm font-medium"
            >
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={formStates.startDate}
              onChange={handleInputChange}
              className="text-slate-600 font-medium outline-none w-full text-sm py-2 px-2 bg-secondary rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="text-slate-700 text-sm font-medium"
            >
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={formStates.endDate}
              onChange={handleInputChange}
              className="text-slate-600 font-medium outline-none w-full text-sm py-2 px-2 bg-secondary rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 w-full">
          <div className="w-full">
            <label
              htmlFor="status"
              className="text-slate-700 text-sm font-medium"
            >
              Status:
            </label>
            <select
              name="status"
              value={formStates.status}
              onChange={handleInputChange}
              className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-secondary rounded-md"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="priority"
              className="text-slate-700 text-sm font-medium"
            >
              Priority:
            </label>
            <select
              name="priority"
              value={formStates.priority}
              onChange={handleInputChange}
              className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-secondary rounded-md"
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3">
          <Button
            onClick={handleSubmit}
            label="Create Project"
            active
            className="py-2 text-blue-700 hover:text-slate-100"
          />
          <Button
            onClick={handleSubmit}
            label="Delete Project"
            active={false}
            className="py-2 bg-slate-100"
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
