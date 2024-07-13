import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "@/features/globalSlice";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(userSignin(values));
  };

  return (
    <Card className="w-full px-4 py-8 rounded-md bg-background shadow">
      <div className="mb-6">
        <p className="text-3xl font-extrabold text-center text-foreground">
          Good To See You!
        </p>
        <p className="text-center text-sm font-medium text-muted-foreground">
          Let's Continue Your Journey!
        </p>
      </div>

      <div className="w-full mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      className="w-full px-3 py-6 text-sm mb-3 rounded-lg text-foreground outline-none"
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
                      className="w-full px-3 py-6 text-sm rounded-lg text-foreground outline-0"
                      {...field}
                      placeholder="Enter Password"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-primary my-2 text-sm font-medium text-right cursor-pointer">
              Forgot Password?
            </p>
            <Button
              type="submit"
              variant="outline"
              className="w-full py-6 rounded-lg bg-primary text-primary-foreground"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="flex justify-center mx-auto flex-col items-center mt-2 text-sm">
          <p className="text-muted-foreground font-medium text-center">
            Don't have account?
          </p>
          <p
            onClick={() => navigate("/auth/signup")}
            className="text-primary font-medium cursor-pointer"
          >
            Signup
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Signin;
