import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectRegisterError, selectRegisterLoading } from "./usersSlice.ts";
import { register } from "./usersThunks.ts";
import { useNavigate } from "react-router-dom";
import type { RegisterMutation } from "../../types";
import Loading from "../../components/UI/Loading.tsx";

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });

  const errorInputClass =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-red-500";
  const defaultInputClass =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";
  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {registerLoading ? (
        <Loading />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mx-auto h-10 w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmitFormHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={onInputChange}
                    required
                    autoComplete="username"
                    className={
                      getFieldError("username")
                        ? errorInputClass
                        : defaultInputClass
                    }
                  />
                  {getFieldError("username") && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFieldError("username")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onInputChange}
                    required
                    autoComplete="current-password"
                    className={
                      getFieldError("password")
                        ? errorInputClass
                        : defaultInputClass
                    }
                  />
                  {getFieldError("password") && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFieldError("password")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="displayName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Display Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    value={form.displayName}
                    onChange={onInputChange}
                    required
                    autoComplete="name"
                    className={
                      getFieldError("displayName")
                        ? errorInputClass
                        : defaultInputClass
                    }
                  />
                  {getFieldError("displayName") && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFieldError("displayName")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Phone number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={form.phoneNumber}
                    onChange={onInputChange}
                    required
                    autoComplete="name"
                    className={
                      getFieldError("phoneNumber")
                        ? errorInputClass
                        : defaultInputClass
                    }
                  />
                  {getFieldError("phoneNumber") && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFieldError("phoneNumber")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={registerLoading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
