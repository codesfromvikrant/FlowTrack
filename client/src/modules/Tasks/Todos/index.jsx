import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "src/features/tasksSlice";
import TodosListItem from "./TodosListItem";
import { addTodo } from "src/features/tasksSlice";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const Todos = () => {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.tasks.tasks.currentId);
  const allTodos = useSelector((state) => state.tasks.todos.data);

  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (!taskId) return;
    dispatch(getAllTodos(taskId));
  }, [taskId]);

  const renderTodoList = allTodos.map((todo) => (
    <TodosListItem
      key={todo._id}
      data={todo}
      checked={todo.completed ? true : false}
    />
  ));

  return (
    <div>
      <h3 className="text-lg text-slate-700 font-semibold">Create Checklist</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full"
        >
          <div className="flex justify-start items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter Todo Here..."
                      {...field}
                      className="min-w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-max bg-white shadow-none border-[1px] border-gray-300 text-foreground dark:text-gray-200"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
      <div className="">{renderTodoList}</div>
    </div>
  );
};

export default Todos;
