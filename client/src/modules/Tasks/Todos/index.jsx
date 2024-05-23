import React, { useEffect, useState } from "react";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "src/features/tasksSlice";
import TodosListItem from "./TodosListItem";
import { addTodo } from "src/features/tasksSlice";

const Todos = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.tasks.tasks.currentId);
  const allTodos = useSelector((state) => state.tasks.todos.data);

  useEffect(() => {
    if (!taskId) return;
    dispatch(getAllTodos(taskId));
  }, [taskId]);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const renderTodoList = allTodos.map((todo) => (
    <TodosListItem
      key={todo._id}
      data={todo}
      checked={todo.completed ? true : false}
    />
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = { name: content, completed: false, taskId };
    dispatch(addTodo(formdata));
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start items-center gap-3">
          <input
            type="text"
            value={content}
            onChange={handleContent}
            placeholder="Enter To Do Item..."
            className="text-slate-600 placeholder:text-slate-600 font-medium bg-primaru shadow w-full text-sm py-3 px-2  rounded-md"
          />
          <Button
            onClick={handleSubmit}
            label="Add"
            className="w-max py-3 flex justify-center items-center shadow"
          />
        </div>
      </form>

      <div className="">{renderTodoList}</div>
    </div>
  );
};

export default Todos;
