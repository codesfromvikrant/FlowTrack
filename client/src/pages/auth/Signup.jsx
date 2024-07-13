import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uniqueUsername } from "@/features/globalSlice";
import { userSignup } from "@/features/globalSlice";
import { setUsername } from "@/features/globalSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.global.username);
  const [values, setValues] = useState("");

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 5 characters." }),
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(userSignup(values));
  };

  let debounceTimer;
  const handleUsername = (e) => {
    console.log(e.target.value);
    setValues(e.target.value);
    if (debounceTimer) clearTimeout(debounceTimer);

    if (e.target.value === "") {
      dispatch(setUsername({ message: "", available: false }));
      return;
    }
    debounceTimer = setTimeout(() => {
      dispatch(uniqueUsername(e.target.value));
    }, 300);
  };

  return (
    <Card className="w-full p-4 rounded-md bg-background shadow">
      <div className="">
        <p className="text-3xl font-extrabold text-center text-foreground">
          Welcome!
        </p>
        <p className="text-center font-medium text-sm text-muted-foreground">
          Signup To Get Started!
        </p>
      </div>

      <div className="w-full mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="w-full">
              <Input
                type="text"
                value={values}
                onChange={handleUsername}
                placeholder="Enter Username"
                className="w-full px-3 py-6 text-sm rounded-lg text-foreground outline-none"
                required
              />
              <p
                className={`${
                  username.available ? "text-green-500" : "text-red-400"
                } text-sm font-medium`}
              >
                {username.message}
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter Email Id"
                      className="w-full px-3 py-6 text-sm rounded-lg text-foreground outline-none"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter Password"
                      className="w-full px-3 py-6 text-sm rounded-lg text-foreground outline-none"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter Password Confirmation"
                      className="w-full px-3 py-6 text-sm rounded-lg text-foreground outline-none"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              className="w-full py-6 rounded-lg bg-primary text-primary-foreground"
            >
              Sign Up
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground text-sm mt-4 font-medium text-center">
          Already have an account?
        </p>
        <p
          onClick={() => navigate("/auth/login")}
          className="text-primary text-sm text-center font-medium cursor-pointer"
        >
          Sign In
        </p>
      </div>
    </Card>
  );
};

export default Signup;
