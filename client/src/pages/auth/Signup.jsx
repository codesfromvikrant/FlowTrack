import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignup } from "src/features/authSlice";
import { userSignup, uniqueUsername } from "src/features/authSlice";
import { setUsername } from "src/features/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(userSignup(values));
  };

  let debounceTimer;
  const handleUsername = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
    <form
      onSubmit={handleSignup}
      className="w-full p-4 rounded-md bg-white shadow"
    >
      <div className="">
        <p className="text-3xl font-extrabold text-center text-gray-700">
          Welcome!
        </p>
        <p className="text-center font-medium text-sm text-gray-600">
          Signup To Get Started!
        </p>
      </div>

      <div className="w-full mt-4 flex justify-start items-start flex-col">
        <div className="mb-3 w-full">
          <input
            value={values.username}
            name="username"
            onChange={handleUsername}
            type="text"
            className="w-full p-4 text-sm bg-slate-100 rounded-md outline-none text-gray-700"
            placeholder="Enter Username!"
            required
          />
          <p
            className={`${
              username.available ? "text-green-500" : "text-red-400"
            } text-sm`}
          >
            {username.message}
          </p>
        </div>

        <input
          value={values.email}
          name="email"
          onChange={handleChange}
          type="text"
          className="w-full p-4 text-sm mb-3 bg-slate-100 rounded-md outline-none text-gray-700"
          placeholder="Enter Email ID!"
          required
        />
        <input
          value={values.password}
          name="password"
          onChange={handleChange}
          type="password"
          className="w-full p-4 mb-3 text-sm bg-slate-100 rounded-md outline-none text-gray-700"
          placeholder="Enter Password!"
          required
        />
        <input
          value={values.passwordConfirm}
          name="passwordConfirm"
          onChange={handleChange}
          type="password"
          className="w-full p-4 mb-1 text-sm bg-slate-100 rounded-md outline-none text-gray-700"
          placeholder="Enter Password to Confirm!"
          required
        />
        <button
          type="submit"
          className="p-4 mt-6 mb-1 font-medium text-gray-200 bg-blue-600 rounded-md w-full"
        >
          Sign Up
        </button>

        <div className="flex justify-center items-center mt-2 mx-auto text-sm flex-col">
          <p className="text-gray-700 font-medium text-center">
            Already have an account?
          </p>
          <p
            onClick={() => navigate("../login")}
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
