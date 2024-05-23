import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteTodo } from "src/features/tasksSlice";
import { updateTodo } from "src/features/tasksSlice";

const TodosListItem = ({ data, checked, handleTodos }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(checked);

  const handleActive = () => {
    setActive(!active);
    handleTodos(data._id);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(data._id));
  };

  const handleComplete = () => {
    if (!active) return;
    dispatch(updateTodo({ completed: true }, data._id));
  };

  useEffect(() => {
    handleComplete();
  }, [active]);

  return (
    <div className="flex justify-between items-start gap-3 my-2">
      <div className="flex justify-start items-start gap-3">
        <input
          type="checkbox"
          checked={active}
          onChange={handleActive}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span
          className={`${
            data.completed ? "line-through text-gray-500" : "text-slate-700"
          } "text-gray-200 text-sm line-through"`}
        >
          {data.name}
        </span>
      </div>

      <RiCloseCircleFill
        onClick={handleDelete}
        className="text-red-500 text-xl cursor-pointer"
      />
    </div>
  );
};

export default TodosListItem;
