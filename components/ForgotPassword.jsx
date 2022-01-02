import Toast from "./Toast";
import Button from "./common/Button";
import InputField from "./InputField";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { postRequest } from "../actions/connection";
import { Mixpanel } from '../assets/js/mixpanel';

const ForgotPassword = ({ setActive }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    const user = await postRequest("/user/sendForgotten", values);
    if (user.status) {
      Mixpanel.track("password-forgotten-successful");
      setMessage(user.message);
      reset();
    } else {
      Mixpanel.track("password-forgotten-failed");
      setError(user.message);
    }
    setLoading(false);
  };

  return (
    <>
      {message && (
        <Toast
          message={message}
          type="success"
          close={() => setMessage(null)}
        />
      )}
      {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      <div className="">
        <div className="reset-header">
          <div className="title flex justify-between">
            <h2 className="font-circular-bold text-2xl text-black-light">
              Reset your password
            </h2>
          </div>
          <p className="text-black-content text-base pt-3">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>
        <form
          id="reset-password-form"
          className="pt-8 pb-6"
          onSubmit={handleSubmit(submit)}
        >
          <InputField
            id="reset-password"
            type="email"
            placeholder="Email"
            className="mb-6"
            innerref={register("email", {
              required: {
                value: true,
                message: "Please enter valid email address",
              },
            })}
            helptext={errors.email && errors.email.message}
            helptextstyle={errors.email && "text-red-500"}
          />
          <Button
            type="submit"
            btnType="fill"
            btnText="Send me an email"
            btnStyle="w-full mb-3"
            loading={loading}
          />
          <Button
            type="button"
            btnType="outline"
            btnText="Back to login"
            btnStyle="w-full"
            onClick={() => setActive("login")}
          />
        </form>
        <div className="">
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
      </div>
    </>
  );
};

export default ForgotPassword;
