import moment from "moment";
import { useState } from "react";
import Datetime from "react-datetime";
import { useForm, Controller } from "react-hook-form";
import IntlTelInput from "react-intl-tel-input";
import useData from "../../components/hooks/useData";

import Checkbox from "../../components/Checkbox";
import Button from "../../components/common/Button";
import InputField from "../../components/InputField";
import Footer from "../../components/common/Footer";
import PaymentBreakdown from "../../components/PaymentBreakdown";

const Travel = () => {
  const {
    data: { user },
  } = useData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user,
    },
  });
  // const [contactInformation, setContactInformation] = useState(false);

  // const handleContactInformation = (e) => {
  //   return setContactInformation(() => e.target.checked);
  // };

  return (
    <>
      <div className="container lg:flex justify-between lg:space-x-10">
        <section className="traveler-info">
          <div className="mt-8">
            <h1 className="font-circular-bold text-2xl">
              Traveler Information
            </h1>
            <p className="pt-2 text-black-content md:max-w-2xl">
              Enter the required information for each traveler and be sure that
              it exactly matches the government-issued ID presented at the
              airport.
            </p>
          </div>

          <div className="traveler-info-form mt-8 md:max-w-2xl">
            <form>
              <div className="name-column md:grid grid-cols-2 gap-x-2">
                <InputField
                  type="text"
                  placeholder="First name*"
                  className="mb-3"
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
                  type="text"
                  placeholder="Last name*"
                  className="mb-3"
                  innerref={register("lastname", {
                    required: {
                      value: true,
                      message: "Please enter your last name",
                    },
                  })}
                  helptext={errors.lastname && errors.lastname.message}
                  helptextstyle={errors.lastname && "text-red-500"}
                />
                <InputField type="text" placeholder="Suffix" className="mb-3" />
                <div className="date-time">
                  <Datetime
                    closeOnSelect
                    dateFormat="YYYY-MM-DD"
                    inputProps={{
                      // readOnly: true,
                      placeholder: "Date of birth",
                      ...register("date_of_birth", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      }),
                      className: "input-element w-full",
                    }}
                    timeFormat=""
                    initialValue={moment("", "YYYY")}
                    isValidDate={(current) => current.isAfter(moment())}
                  />
                  {errors.date_of_birth && (
                    <small className={`text-red-500 block`}>
                      {errors.date_of_birth.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="personal-info md:grid grid-cols-2 gap-x-2 mt-3">
                <InputField
                  type="email"
                  placeholder="Email address"
                  className="mb-3"
                  innerref={register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                  })}
                  helptext={errors.email && errors.email.message}
                  helptextstyle={errors.email && "text-red-500"}
                />
                <div className="personal-info">
                  {/* <InputField type="text" placeholder="Email address*" /> */}
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter a phone number",
                      },
                    }}
                    render={({ field: { onChange } }) => (
                      <IntlTelInput
                        format
                        defaultCountry="ng"
                        placeholder="Phone number*"
                        preferredCountries={["ng"]}
                        inputClassName="input-element w-full"
                        // defaultValue={user.phone_number}
                        containerClassName="intl-tel-input w-full"
                        onPhoneNumberChange={(_e, v, c) => onChange(v)}
                      />
                    )}
                  />
                  {errors.phone_number && (
                    <small className={`text-red-500 block`}>
                      {errors.phone_number.message}
                    </small>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="emergency-contact max-w-2xl mt-12">
            <h2 className="font-circular-bold text-gray-light4">
              Emergency contact information
            </h2>
            {/* <div className="flex items-center py-4">
              <Checkbox
                checked={contactInformation}
                onChange={handleContactInformation}
                checkfor="contactInformation"
              />
              <span className="no-wrap">
                Same as passenger information above
              </span>
            </div> */}
            <div className="emergency-contact-col md:grid grid-cols-2 gap-x-3 py-4">
              <InputField
                type="text"
                placeholder="First name*"
                className="mb-3"
                innerref={register("emergency_first_name", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                helptext={
                  errors.emergency_first_name &&
                  errors.emergency_first_name.message
                }
                helptextstyle={errors.emergency_first_name && "text-red-500"}
              />
              <InputField
                type="text"
                placeholder="Last name*"
                className="mb-3"
                innerref={register("emergency_first_name", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                helptext={
                  errors.emergency_last_name &&
                  errors.emergency_last_name.message
                }
                helptextstyle={errors.emergency_last_name && "text-red-500"}
              />
              <InputField
                type="email"
                placeholder="Email address*"
                className="mb-3"
                innerref={register("emergency_email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                helptext={
                  errors.emergency_email && errors.emergency_email.message
                }
                helptextstyle={errors.emergency_email && "text-red-500"}
              />
              <div className="emergency-phone-number">
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter a phone number",
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <IntlTelInput
                      format
                      defaultCountry="ng"
                      placeholder="Phone number*"
                      preferredCountries={["ng"]}
                      inputClassName="input-element w-full"
                      // defaultValue={user?.emergency_phone_number || null}
                      containerClassName="intl-tel-input w-full"
                      onPhoneNumberChange={(_e, v, c) => onChange(v)}
                    />
                  )}
                />
                {errors.emergency_phone_number && (
                  <small className={`text-red-500 block`}>
                    {errors.emergency_phone_number.message}
                  </small>
                )}
              </div>
            </div>
            <div className="proceed-to-payment mt-14 items-center hidden lg:flex">
              <p className="font-circular-bold text-orange pr-11">Cancel</p>
              <Button btnText="Continue to payment" btnType="fill"></Button>
            </div>
          </div>
        </section>

        <section className="payment-breakdown md:max-w-2xl lg:w-1/3 lg:mt-24 mt-10">
          <PaymentBreakdown />
          <div className="proceed-to-payment mt-14 flex items-center justify-between lg:justify-end max-w-xs mx-auto container">
            <p className="font-circular-bold text-orange lg:hidden">Cancel</p>
            <Button btnText="Continue to payment" btnType="fill"></Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Travel;
