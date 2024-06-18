import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { addWorkspace } from "@/features/workspaceSlice";

const bgColors = [
  "#f97316",
  "#ef4444",
  "#65a30d",
  "#0d9488",
  "#2563eb",
  "#db2777",
];

const WorkspaceForm = () => {
  const dispatch = useDispatch();

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    bgColor: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      bgColor: bgColors[0],
    },
  });

  const onSubmit = (values) => {
    dispatch(addWorkspace(values));
  };

  const renderBgOptions = bgColors.map((bgColor) => (
    <div key={useId()} className="flex items-center space-x-1">
      <RadioGroupItem value={bgColor} id={bgColor} />
      <div
        style={{ backgroundColor: bgColor }}
        className="w-6 h-6 rounded-full"
      ></div>
    </div>
  ));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Workspace Title Here..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Workspace Description Here..."
                  className="h-32"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="">
          <Label>Background Color</Label>
          <RadioGroup
            defaultValue={bgColors[0]}
            className="flex flex-row flex-wrap space-x-3"
          >
            {renderBgOptions}
          </RadioGroup>
        </div>

        <Input type="submit" className="font-semibold" />
      </form>
    </Form>
  );
};

export default WorkspaceForm;
