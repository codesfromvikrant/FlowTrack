import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextEditor from "@/components/TextEditor";
import Todos from "@/modules/Tasks/Todos";
import DatePicker from "@/components/DatePicker";
import SelectPicker from "@/components/SelectPicker";
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
import TagsDropdown from "@/components/Tags/TagsDropdown";
import { createTask } from "@/features/tasksSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const tasksgroupId = useSelector(
    (state) => state.tasks.tasksgroups.currentId
  );
  const currentTaskId = useSelector((state) => state.tasks.tasks.currentId);
  const allTasksData = useSelector((state) => state.tasks.tasks.data);
  const currentTaskData = allTasksData.find(
    (item) => item._id === currentTaskId
  );

  const [formStates, setFormStates] = useState({
    description: "",
    startDate: "",
    endDate: "",
    tags: [],
    tasksgroupId,
    workspaceId,
  });

  const handleFormStates = (name, value) => {
    setFormStates({ ...formStates, [name]: value });
  };

  const handleTaskTags = (id) => {
    if (formStates.tags.includes(id)) {
      setFormStates({
        ...formStates,
        tags: formStates.tags.filter((tag) => tag !== id),
      });
    } else {
      setFormStates({
        ...formStates,
        tags: [...formStates.tags, id],
      });
    }
  };

  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const onSubmit = (values) => {
    const formdata = { ...values, ...formStates };
    dispatch(createTask(formdata));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full bg-background p-4 rounded-lg shadow-lg"
      >
        <div className="flex justify-center items-start gap-6 w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Task Title Here..."
                      className="border-none shadow-none w-full px-0 placeholder:font-semibold text-lg font-semibold focus-visible:outline-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <TextEditor
              content={formStates.description}
              handleContentChange={(value) =>
                handleFormStates("description", value)
              }
            />
            {/* <PlateEditor /> */}
          </div>

          <div className="space-y-2 w-[200px]">
            <TagsDropdown
              selectedTags={formStates.taskTags}
              handleSelectedTags={handleTaskTags}
              triggerComponent={
                <Button
                  variant="outline"
                  className="w-full bg-secondary text-secondary-foreground"
                >
                  Tags
                </Button>
              }
            />

            <DatePicker
              date={formStates.startDate}
              setDate={(value) => handleFormStates("startDate", value)}
              label="Start Date"
            />

            <DatePicker
              date={formStates.endDate}
              setDate={(value) => handleFormStates("endDate", value)}
              label="End Date"
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <SelectPicker
                    name="status"
                    placeholder="Select Status"
                    onValueChange={field.onChange}
                    options={["todo", "in_progress", "on_hold", "completed"]}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <SelectPicker
                    name="priority"
                    placeholder="Select Priority"
                    onValueChange={field.onChange}
                    options={["minor", "major", "critical"]}
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="outline"
              className="w-full bg-secondary text-secondary-foreground"
            >
              Create Task
            </Button>

            <Button
              variant="outline"
              className="w-full bg-secondary text-secondary-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
