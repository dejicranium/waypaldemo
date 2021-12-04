import Checkbox from "./Checkbox";
import Button from "./common/Button";
import InputField from "./InputField";
import Toast from "./Toast";

import { useState } from "react";
import useData from "./hooks/useData";
import { useForm } from "react-hook-form";
import { postRequest } from "../actions/connection";

const Register = ({ setActive, close }) => {
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
    const user = await postRequest("/user/register", values);
    if (user.status) {
      dispatch({ user: user.data, token: user.token, isLoggedIn: true });
      close();
    }
    setError(user.message);
    setLoading(false);
  };

  const [checkTerms, setCheckTerms] = useState(false);
  const [checkPromo, setCheckPromo] = useState(false);

  const handleTermsandConditions = (e) => {
    return setCheckTerms(() => e.target.checked);
  };

  const handleLatestDeals = (e) => {
    return setCheckPromo(() => e.target.checked);
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      <div className="">
        <div className="register-header">
          <div className="title flex justify-between">
            <h2 className="font-circular-bold text-2xl text-black-light">
              Signup for Waypal
            </h2>
          </div>
          <p className="text-black-content text-base pt-3">
            Sign up on Waypal to explore, discover, and create and plan trips
            with your friends.
          </p>
        </div>
        <form
          id="signup-form"
          className="pt-8 pb-6"
          onSubmit={handleSubmit(submit)}
        >
          <div className="name-colum grid lg:grid-cols-2 lg:gap-x-2 mb-3">
            <InputField
              id="firstname"
              placeholder="First Name*"
              className="mb-3 lg:mb-0"
              innerref={register("firstname", {
                required: {
                  value: true,
                  message: "Please enter your first name",
                },
              })}
              helptext={errors.firstname && errors.firstname.message}
              helptextstyle={errors.firstname && "text-red-500"}
            />
            <InputField
              id="lastname"
              placeholder="Last Name*"
              innerref={register("lastname", {
                required: {
                  value: true,
                  message: "Please enter your last name",
                },
              })}
              helptext={errors.lastname && errors.lastname.message}
              helptextstyle={errors.lastname && "text-red-500"}
            />
          </div>
          <InputField
            id="email"
            type="email"
            className="mb-3"
            placeholder="Email*"
            innerref={register("email", {
              required: {
                value: true,
                message: "Please enter valid email address",
              },
            })}
            helptext={errors.email && errors.email.message}
            helptextstyle={errors.email && "text-red-500"}
          />
          <InputField
            id="password"
            type="password"
            placeholder="Password*"
            innerref={register("password", {
              required: { value: true, message: "Please choose a password" },
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters in length",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[0-9]).*$/,
                message:
                  "Password should contain at least 1 lowercase letter, 1 uppercase letter & 1 number",
              },
            })}
            helptext={errors.password && errors.password.message}
            helptextstyle={errors.password && "text-red-500"}
          />
          <div className="flex items-center mt-4">
            <Checkbox
              checked={checkTerms}
              onChange={handleTermsandConditions}
              checkfor="checkTerms"
            />
            <span className="no-wrap">
              I agree to the{" "}
              <span className="text-orange">terms and conditions</span>
            </span>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={checkPromo}
              onChange={handleLatestDeals}
              checkfor="checkPromo"
            />
            <span>Send me the latest deal alerts</span>
          </div>
          <Button
            type="submit"
            btnType="fill"
            btnText="Create account"
            btnStyle="w-full mt-7"
            loading={loading}
            disabled={!checkTerms}
          ></Button>
        </form>
        <p>
          Already have an account?{" "}
          <span
            className="text-orange cursor-pointer"
            onClick={() => setActive("login")}
          >
            Login to your account
          </span>
        </p>
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

export default Register;
