import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import moment from "moment";
import Datetime from "react-datetime";
import IntlTelInput from "react-intl-tel-input";
import useData from "../../../components/hooks/useData";
import Modal from '../../../components/Modal';
import Register from '../../../components/Register';
import Login from '../../../components/Login';
import { formatAmount } from "../../../assets/js/utils";
import Button from "../../../components/common/Button";
import Footer from "../../../components/common/Footer";
import InputField from "../../../components/InputField";
import PaymentBreakdown from "../../../components/PaymentBreakdown";
import { postRequest, putRequest, getRequest } from "../../../actions/connection";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";

const JoinTrip = ({ trip, notFound }) => {
  const {
    push,
    query: { slug },
  } = useRouter();

  if (notFound) {
    push("/404");
  }

  const {
    dispatch,
    data: {
      user,
      isLoggedIn,
      currentTrip
    },
  } = useData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user.firstname,
      ...user.lastname,
      ...user.email,
      ...user.suffix,
      ...user.date_of_birth,
      ...user.phone_number,
      ...user.emergency_first_name,
      ...user.emergency_last_name,
      ...user.emergency_email,
      ...user.emergency_phone_number,
    },
  });


  const [authMode, setAuthMode]  = useState('login');
  const [showModal, setShowModal]  = useState(false);
  const [userIsVeriifed, setUserIsVerified]  = useState(user?  user.verified: null);
  const [verification_url, setVerificationUrl] = useState(null);


  useEffect(async() => {
    if (!isLoggedIn) {
      setShowModal(true)
    } 
    else {
      if (user.verified !== "APPROVED" && !notFound) {
        await createVeriffSession();
      }
    }
  }, []);

  const fullName = `${user.firstname} ${user.lastname}`;
  
  const createVeriffSession = async() => {
    await postRequest('/veriff/sessions', {})
      .then(resp => {
        setVerificationUrl(resp.data.verification.url);
        openVeriffModal(resp.data.verification.url);
      })
  }

  const setWaypalVerificationStatus = async(status) => {
    await putRequest('/user/verify', {
      email: user.email,
      status,
    })
    .then(resp => {
      dispatch({user: resp.data})
    })
    .catch(err => {
      alert("Could not set verification status")
    })
  }

  const openVeriffModal = async (url) => {
    createVeriffFrame({
        url: url || verification_url,
        onEvent: (msg) => {
            switch(msg) {
            case MESSAGES.CANCELED:
              setWaypalVerificationStatus("ABANDONED")
              break;
            case MESSAGES.FINISHED:
              setWaypalVerificationStatus("ATTEMPTED")
              break;
              }
          },  

    })
  }


  const makePayment = async () => {
    const totalAmount =
      trip.travel_amount +
      trip.miscellaneous_amount +
      trip.accommodation_amount;
    const tripRef = await postRequest("/payment/reference", {
      trip_id: trip.id,
      amount: totalAmount,
    });
    FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBKEY,
      amount: 100,
      tx_ref: tripRef.data.reference,
      currency: trip.currency,
      country: "NG",
      customer: {
        email: user.email,
        phone_number: user.phone_number,
        name: fullName,
      },
      callback: async function (data) {
        const payment = await getRequest(
          `/payment/verify/${data.transaction_id}`
        );
        if (payment.status) {
          dispatch({ currentTrip: {...trip}})
          push({
            pathname: "successful",
            query: { slug: trip.slug },
          });
        }
      },
      customizations: {
        title: "Waypal",
        description: "Pay for this trip",
        logo: "https://cdn.filestackcontent.com/UkEsCousS42K1prOl7pZ",
      },
    });
  };

  return (
    <>
      {!notFound && (
        <>
          <Modal  cancellable={false} showModal={showModal} close={() => setShowModal(false)}>
            {authMode === 'login' && (
              <Login setActive={authMode === 'login'} close={() => setShowModal(false)} />
            )}
            {authMode === 'register' && (
              <Register setActive={authMode === 'register'} close={() => setShowModal(false)} />
            )}
            {authMode === 'forgot' && (
              <ForgotPassword setActive={authMode === 'forgot'} close={() => setShowModal(false)} />
            )}
          </Modal>
          {
            isLoggedIn && user.verified !== "APPROVED" && user.verified !== "ATTEMPTED" && 
            <> 
              <div className="container lg:flex justify-between lg:space-x-10">
                <section className="traveler-info">
                  <div className="mt-8">
                    
                    <p className="pt-2 text-black-content md:max-w-2xl">
                      You can't join a trip until you're verified
                    </p>
                    <div className="mt-16 flex items-center">
                      <Button
                        btnText="Verify Me!"
                        btnType="fill"
                        onClick={() => {
                          createVeriffSession()
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </>
          }
          {
            isLoggedIn && user.verified === "ATTEMPTED" && 
            <> 
              <div className="container lg:flex justify-between lg:space-x-10">
                <section className="traveler-info">
                  <div className="mt-8">
                    
                    <p className="pt-2 text-black-content md:max-w-2xl">
                      We've received your verification details and we'll shoot you an email to join this trip when verified.
                    </p>
                  </div>
                </section>
              </div>
            </>
          }
          {
            isLoggedIn  && user.verified === "APPROVED" &&
            <>
              <div className="container lg:flex justify-between lg:space-x-10">
                <section className="traveler-info">
                  <div className="mt-8">
                    <h1 className="font-circular-bold text-2xl">
                      Traveler Information
                    </h1>
                    <p className="pt-2 text-black-content md:max-w-2xl">
                      Enter the required information for each traveler and be sure
                      that it exactly matches the government-issued ID presented at
                      the airport.
                    </p>
                  </div>

                  <div className="traveler-info-form mt-8 md:max-w-2xl">
                    <form>
                      <div className="name-column md:grid grid-cols-2 gap-x-2">
                        <InputField
                          type="text"
                          placeholder="First name*"
                          className="mb-3"
                          value={user.firstname}
                          disabled
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
                          disabled 
                          value={user.lastname}
                          innerref={register("lastname", {
                            required: {
                              value: true,
                              message: "Please enter your last name",
                            },
                          })}
                          helptext={errors.lastname && errors.lastname.message}
                          helptextstyle={errors.lastname && "text-red-500"}
                        />
                        <InputField
                          type="text"
                          placeholder="Suffix"
                          className="mb-3"
                          innerref={register("suffix", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          helptext={errors.suffix && errors.suffix.message}
                          helptextstyle={errors.suffix && "text-red-500"}
                        />
                        {/*
                        <div className="date-time">
                          <Controller
                            name="date_of_birth"
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "This fied is required",
                              },
                            }}
                            render={({ field: { onChange } }) => (
                              <Datetime
                                closeOnSelect
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
                                inputProps={{
                                  placeholder: "Date of birth",
                                  className: "input-element w-full",
                                }}
                                onChange={(v) => {
                                  onChange(v.format("YYYY-MM-DD"));
                                }}
                                initialValue={date_of_birth || moment("", "YYYY")}
                              />
                            )}
                          />
                          {errors.date_of_birth && (
                            <small className={`text-red-500 block`}>
                              {errors.date_of_birth.message}
                            </small>
                          )}
                          </div> */}
                      </div>
                      <div className="personal-info md:grid grid-cols-2 gap-x-2 mt-3">
                        <InputField
                          type="email"
                          placeholder="Email address"
                          className="mb-3"
                          value={user.email}
                          disabled
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
                        helptextstyle={
                          errors.emergency_first_name && "text-red-500"
                        }
                      />
                      <InputField
                        type="text"
                        placeholder="Last name*"
                        className="mb-3"
                        innerref={register("emergency_last_name", {
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
                          name="emergency_phone_number"
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
                    {/* <div className="proceed-to-payment mt-14 items-center hidden lg:flex">
                  <p className="font-circular-bold text-orange pr-11">Cancel</p>
                  <Button btnText="Continue to payment" btnType="fill"></Button>
                </div> */}
                  </div>
                </section>

                <section className="payment-breakdown md:max-w-2xl lg:w-1/3 lg:mt-24 mt-10">
                  <PaymentBreakdown
                    travel_amount={trip.travel_amount}
                    accommodation_amount={trip.accommodation_amount}
                    miscellaneous_amount={trip.miscellaneous_amount}
                    currency={trip.currency}
                  />
                  {/* <div className="proceed-to-payment mt-14 flex items-center justify-between lg:justify-end max-w-xs mx-auto container">
                <p className="font-circular-bold text-orange lg:hidden">Cancel</p>
                <Button btnText="Continue to payment" btnType="fill"></Button>
              </div> */}
                </section>
              </div>
              <div className="proceed-to-payment mt-14 items-center space-x-10 max-w-sm mx-auto container flex">
                <p
                  className="font-circular-bold text-orange cursor-pointer"
                  //   onClick={goBack}
                >
                  Cancel
                </p>
                <Button
                  btnText="Continue to Payment"
                  btnType="fill"
                  type="submit"
                  onClick={makePayment}
                />
              </div>
            </>
          }
          <Footer />
        </>
      )}
    </>
  );
};

export default JoinTrip;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const ngrok_base = "http://6c7c-197-210-8-123.ngrok.io/api/v1";

  const tripData = await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`);

  if (tripData.status) {
    return {
      props: {
        trip: tripData.data,
      },
    };
  }
  return {
    props: {
      notFound: true,
    },
  };
}
