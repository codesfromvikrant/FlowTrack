import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSignup } from "src/features/authSlice";
import { userSignup } from "src/features/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(userSignup(values));
  };

  return (
    <form className="w-full p-4 rounded-md bg-secondary">
      <div className="">
        <p className="text-3xl font-extrabold text-center text-gray-200">
          Welcome!
        </p>
        <p className="text-center text-sm text-gray-200">
          Signup To Get Started!
        </p>
      </div>

      <div className="w-full mt-4 flex justify-start items-start flex-col">
        <input
          value={values.name}
          name="name"
          onChange={handleChange}
          type="text"
          className="w-full p-4 text-sm mb-3 bg-bgblack rounded outline-none text-gray-200"
          placeholder="Enter Your Full Name!"
        />
        <input
          value={values.email}
          name="email"
          onChange={handleChange}
          type="text"
          className="w-full p-4 text-sm mb-3 bg-bgblack rounded outline-none text-gray-200"
          placeholder="Enter Email ID!"
        />
        <input
          value={values.password}
          name="password"
          onChange={handleChange}
          type="password"
          className="w-full p-4 mb-3 text-sm bg-bgblack rounded outline-none text-gray-200"
          placeholder="Enter Password!"
        />
        <input
          value={values.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          className="w-full p-4 mb-1 text-sm bg-bgblack rounded outline-none text-gray-200"
          placeholder="Enter Password to Confirm!"
        />
        <button
          onClick={handleSignup}
          className="p-4 mt-6 mb-1 font-medium text-gray-200 bg-blue-700 rounded w-full"
        >
          Sign Up
        </button>

        <div className="flex justify-center items-center mt-2 mx-auto text-sm flex-col">
          <p className="text-gray-200 text-center">Already have an account?</p>
          <p
            onClick={() => dispatch(toggleSignup(false))}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Sign In
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
