import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTasksGroup } from "src/features/tasksSlice";
import { Button } from "@/components/ui/button";
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
import { useParams } from "react-router-dom";

const AddTaskGroup = () => {
  const dispatch = useDispatch();
  const [taskGroupForm, setTaskGroupForm] = useState(false);
  const { workspaceId } = useParams();

  const formSchema = z.object({
    name: z.string().max(20, {
      message: "Title must be at most 20 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values) => {
    if (!workspaceId) return;
    dispatch(createTasksGroup({ name: values.name, workspaceId }));
  };

  const toggleTaskGroupForm = () => {
    setTaskGroupForm(!taskGroupForm);
  };

  return (
    <div className="w-[350px] bg-white p-4 rounded-md shadow">
      {taskGroupForm ? (
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Group Name Here..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-start items-center gap-2 mt-2">
                <Button
                  type="submit"
                  className="w-full text-foreground dark:text-gray-200"
                >
                  Create
                </Button>
                <Button
                  onClick={toggleTaskGroupForm}
                  className="w-full text-foreground dark:text-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button
          onClick={toggleTaskGroupForm}
          className="w-full bg-white shadow-none border-[1px] border-gray-300 text-foreground dark:text-gray-200"
        >
          Create Task Group
        </Button>
      )}
    </div>
  );
};

export default AddTaskGroup;
