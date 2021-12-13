import { useState } from "react";
import { useForm } from "react-hook-form";

import Toast from "./Toast";
import Button from "./common/Button";
import useData from "./hooks/useData";
import InputField from "./InputField";
import PasswordInputField from "./PasswordInputField";
import { getRequest, postRequest } from "../actions/connection";

const Login = ({ setActive, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (values) => {
    setLoading(true);
    const user = await postRequest("/user/login", values);
    if (user.status) {
      dispatch({ user: user.data, token: user.token, isLoggedIn: true });
      close();
      // const userInfo = await getRequest("/user/info");
      // if (userInfo.status) {
      //   dispatch({ profile: { ...userInfo.data } });
      // }
    }
    setError(user.message);
    setLoading(false);
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      <div className="">
        <div className="login-header">
          <div className="title flex justify-between">
            <h2 className="font-circular-bold text-2xl text-black-light">
              Login to your account
            </h2>
          </div>
          <p className="text-black-content text-base pt-3">
            Login to your Waypal account. Explore, discover, and create and plan
            trips with your friends.
          </p>
        </div>
        <form
          id="login-form"
          className="pt-8 pb-6"
          onSubmit={handleSubmit(submit)}
        >
          <InputField
            id="email"
            type="email"
            className="mb-3"
            placeholder="Email"
            innerref={register("email", {
              required: {
                value: true,
                message: "Please enter valid email address",
              },
            })}
            helptext={errors.email && errors.email.message}
            helptextstyle={errors.email && "text-red-500"}
          />
          <div className="password mb-3">
            <PasswordInputField
              id="password"
              type="password"
              placeholder="Password"
              innerref={register("password", {
                required: { value: true, message: "Please enter a password" },
              })}
              trailingtext="yes"
              helptext={errors.password && errors.password.message}
              helptextstyle={errors.password && "text-red-500"}
            />

          </div>
          <Button
            type="submit"
            btnType="fill"
            btnText="Log in"
            btnStyle="w-full"
            loading={loading}
          ></Button>
        </form>
        <div className="">
          <span
            className="text-orange-light cursor-pointer"
            onClick={() => setActive("forgot")}
          >
            Forgot Password?
          </span>
          <p>
            Don&apos;t have an account?{" "}
            <span
              className="text-orange cursor-pointer"
              onClick={() => setActive("register")}
            >
              Create an account
            </span>
          </p>
        </div>

        {/* <div className="mt-3 flex items-center">
        <hr className="hr-design" />
        <span className="px-4 text-gray-light8">or</span>
        <hr className="hr-design" />
      </div>
      <div className="social-login mt-3 text-center">
        <div className="google-login border border-blue rounded p-2 text-blue w-full flex items-start justify-center">
          <Icon icon="google" cname="mr-4" />
          <Button
            btnText="Continue with Google"
            btnStyle=""
            btnType="plain"
          ></Button>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default Login;
