import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import moment from "moment";
import Datetime from "react-datetime";
import IntlTelInput from "react-intl-tel-input";
import useData from "../../../components/hooks/useData";
import Modal from "../../../components/Modal";
import Register from "../../../components/Register";
import Login from "../../../components/LogIn";
import { formatAmount } from "../../../assets/js/utils";
import Button from "../../../components/common/Button";
import Footer from "../../../components/common/Footer";
import InputField from "../../../components/InputField";
import PaymentBreakdown from "../../../components/PaymentBreakdown";
import { postRequest, putRequest, getRequest } from "../../../actions/connection";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import Toast from '../../../components/Toast'
import Spinner from '../../../components/Spinner';
import { Mixpanel } from '../../../assets/js/mixpanel';

const JoinTrip = ({ trip, notFound }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);




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


  const [gender, setGender] = useState(user.gender)
  const [date_of_birth, setDateOfBirth] = useState(user.date_of_birth)
  const [loading, setLoading] = useState(false)

  const  updateProfile = async (values) => {
    let { phone_number, emergency_email, emergency_first_name, emergency_last_name, emergency_phone_number } = values;
    
/*
    if (!date_of_birth) {
      errors.date_of_birth = true;
      errors.date_of_birth.message = "This field is required"
      alert('no')
      return;
    }*/
    const updateProfile = await putRequest("/user/saveProfileInfo", {
      emergency_email,
      emergency_first_name,
      emergency_last_name,
      emergency_phone_number,
      phone_number,
      date_of_birth,
      gender,
    });
    if (updateProfile.data) {
      // was successful
      dispatch({ user: { ...updateProfile.data } });
      
    } else {
      setError(updateProfile.message);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user
    },
  });


  const [authMode, setAuthMode]  = useState("login");
  const [showModal, setShowModal]  = useState(false);
  const [userIsVeriifed, setUserIsVerified]  = useState(user?  user.verified: null);
  const [verification_url, setVerificationUrl] = useState(null);

  const [emergency_first_name, setEmergencyFirstName] = useState(user.emergency_first_name);
  const [emergency_last_name, setEmergencyLastName] = useState(user.emergency_last_name);
  const [emergency_email, setEmergencyEmail] = useState(user.emergency_email);
  const [emergency_phone_number, setEmergencyPhoneNumber] = useState(user.emergency_phone_number);
  const [phone_number, setPhoneNumber] = useState(user.phone_number);


  useEffect(async() => {
    if (!isLoggedIn) {
      setShowModal(true)
    } 
    else {
      if (user && user.verified !== "APPROVED" && user.verified !== "ATTEMPTED" && isLoggedIn && !notFound) {
        await createVeriffSession();
      }
      if (user && user.verified !== "APPROVED") {
        // add interest
        await postRequest("/trip/interests", {
          reason: "compliance required",
          trip_id: trip.id,
          user_id: user.id,
        })
      }
    }
  }, []);

  const fullName = `${user.firstname} ${user.lastname}`;
  
  const createVeriffSession = async() => {
    await postRequest("/veriff/sessions", {})
      .then(resp => {
        setVerificationUrl(resp.data.verification.url);
        openVeriffModal(resp.data.verification.url);
      })
  }

  const setWaypalVerificationStatus = async(status) => {
    await putRequest("/user/verify", {
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
              //setWaypalVerificationStatus("ABANDONED")
              break;
            case MESSAGES.FINISHED:
              setWaypalVerificationStatus("ATTEMPTED")
              break;
              }
          },  

    })
  }

  const validateProfilenput = () => {
    if (!date_of_birth || !emergency_email || !emergency_first_name || !emergency_last_name || !emergency_phone_number || !phone_number || !gender) { 
      setError("Please fill all fields");
      return false;
    }
    return true;
     
  }

  const makePayment = async () => {
    if (!validateProfilenput()) return;
    setLoading(true)
    const updateProfile = await putRequest("/user/saveProfileInfo", {
      emergency_email,
      emergency_first_name,
      emergency_last_name,
      emergency_phone_number,
      phone_number,
      date_of_birth,
      gender,
    });
    if (updateProfile.data) {
      // was successful
      setLoading(false)
      dispatch({ user: { ...updateProfile.data } });
      
    } else {
      setLoading(false)
      setError(updateProfile.message);
    }
    
    let totalAmount = parseFloat(trip.travel_amount + trip.miscellaneous_amount + trip.accommodation_amount) ;

    const taxes = parseFloat((totalAmount / 100) * 7.5);

    totalAmount = parseFloat(parseFloat(totalAmount) + parseFloat(taxes)).toFixed(2);


    const tripRef = await postRequest("/payment/reference", {
      trip_id: trip.id,
      amount: totalAmount,
    });

    if (!tripRef || !tripRef.data) {
      setError(tripRef.message)
      return;
    }

    FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBKEY || "FLWPUBK_TEST-e679c6bbfd1c677f398ecd55f013afd1-X",
      amount: totalAmount,
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
          `/payment/verify/${data.transaction_id}?trip_id=${trip.id}`
        );
        if (payment.status) {
          if (typeof user !== 'undefined') {
            Mixpanel.identify(user.id);
            Mixpanel.track('trip-joined-successfully',{
              trip_id: trip.id,
              trip_title: trip.title,
              trip_destination: trip.destination,
              trip_total_amount: parseFloat(trip.travel_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.accommodation_amount),                        })
          }
          dispatch({ currentTrip: {...trip}})
          push(`/dashboard/trips`);
        }
        else {
          if (typeof user !== 'undefined') {
            Mixpanel.identify(user.id);
            Mixpanel.track('trip-joined-failed',{
              trip_id: trip.id,
              trip_title: trip.title,
              trip_destination: trip.destination,
              trip_total_amount: parseFloat(trip.travel_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.accommodation_amount),                        })
          }
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
          {error && 
            <Toast message={error} type="error" close={() => setError(null)} />
          }
          <Modal  cancellable={false} showModal={showModal} close={() => setShowModal(false)}>
            {authMode === "login" && (
              <Login setActive={authMode === "login"} close={() => setShowModal(false)} />
            )}
            {authMode === "register" && (
              <Register setActive={authMode === "register"} close={() => setShowModal(false)} />
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
                      We've received your verification details and we"ll shoot you an email to join this trip when verified.
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
                    {/*
                    <p className="pt-2 text-black-content md:max-w-2xl">
                      Enter the required information and be sure
                      that it exactly matches the government-issued ID presented at
                      the airport.
                    </p> */}
                  </div>

                  <div className="traveler-info-form mt-8 md:max-w-2xl">
                    <form>
                      <div className="name-column md:grid grid-cols-2 gap-x-2">
                        <InputField
                          type="text"
                          placeholder="First name"
                          className="mb-3"
                          value={user.firstname}
                          disabled
                          innerref={register("firstname", {
                            required: {
                              value: false,
                              message: "Please enter your first name",
                            },
                          })}
                          helptext={errors.firstname && errors.firstname.message}
                          helptextstyle={errors.firstname && "text-red-500"}
                        />
                        <InputField
                          type="text"
                          placeholder="Last name"
                          className="mb-3"
                          value={user.lastname}
                          disabled
                          innerref={register("lastname", {
                            required: {
                              value: false,
                              message: "Please enter your last name",
                            },
                          })}
                          helptext={errors.lastname && errors.lastname.message}
                          helptextstyle={errors.lastname && "text-red-500"}
                        />

                        <InputField
                          type="text"
                          placeholder="Suffix"
                          className="mb-3 hidden"
                          innerref={register("suffix", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          helptext={errors.suffix && errors.suffix.message}
                          helptextstyle={errors.suffix && "text-red-500"}
                        />
                        
          
                      </div>
                      <div className="personal-info md:grid grid-cols-2 gap-x-2 mt-3">
                        <InputField
                          type="email"
                          placeholder="Email address"
                          className="mb-3"
                          disabled
                          value={user.email}
                          innerref={register("email", {
                            required: {
                              value: false,
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
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone number"
                                preferredCountries={["ng"]}
                                inputClassName="input-element w-full"
                                defaultValue={user.phone_number || ""}
                                containerClassName="intl-tel-input w-full"
                                onPhoneNumberChange={(_e, v, c) => {onChange(v); setPhoneNumber(v)}}
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

                      <div className="personal-info md:grid grid-cols-2 gap-x-2 mt-3">
                        <select
                          className="mb-3 input-element"
                          defaultValue={user.gender || ""}
                          onChange={(e) => {
                              if (e.target.value) {
                                setGender(e.target.value);                        
                              }
                              else {
                                setGender(user.gender)
                              }
                          }}
                          >
                          <option disabled value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        

                        <div className="personal-info">
                          {/* <InputField type="text" placeholder="Email address*" /> */}
                        
                          <Datetime
                            onChange={(v) => {
                              
                                setDateOfBirth(v.format("YYYY-MM-DD"));
                              
                            }}
                            required
                            closeOnSelect
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            inputProps={{
                              placeholder: "Date of Birth",
                              className: "outline-none box-border text-black-content w-full pl-1",
                            }}
                          
                            initialValue={user.date_of_birth ? moment(user.date_of_birth).format('YYYY-MM-DD'): ""}
                            isValidDate={(current) => current.isBefore(moment())}
                            innerref={register('date_of_birth', {
                              required: {
                                value: false,
                                message: "Please enter your date of birth"
                              }
                            })}
                            className="mb-3 input-element"
                          />{errors.date_of_birth && (
                            <small className={`text-red-500 block`}>
                              {errors.date_of_birth.message}
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
                  <form>
                    <div className="emergency-contact-col md:grid grid-cols-2 gap-x-3 py-4">
                        <InputField
                          type="text"
                          placeholder="First name"
                          className="mb-3"
                          defaultValue={user.emergency_first_name}
                          innerref={register("emergency_first_name", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          onChange={(e) => setEmergencyFirstName(e.target.value)}
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
                          placeholder="Last name"
                          className="mb-3"
                          defaultValue={user.emergency_last_name}
                          innerref={register("emergency_last_name", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          onChange={(e) => setEmergencyLastName(e.target.value)}

                          helptext={
                            errors.emergency_last_name &&
                            errors.emergency_last_name.message
                          }
                          helptextstyle={errors.emergency_last_name && "text-red-500"}
                        />
                        <InputField
                          type="email"
                          placeholder="Email address"
                          defaultValue={user.emergency_email}
                          className="mb-3"
                          innerref={register("emergency_email", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          onChange={(e) => setEmergencyEmail(e.target.value)}

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
                                defaultValue={user.emergency_phone_number || ""}
                                placeholder="Phone number"
                                preferredCountries={["ng"]}
                                inputClassName="input-element w-full"
                                onChange={(e) => setEmergencyPhoneNumber(e.target.value)}

                                // defaultValue={user?.emergency_phone_number || null}
                                containerClassName="intl-tel-input w-full"
                                onPhoneNumberChange={(_e, v, c) => {onChange(v); setEmergencyPhoneNumber(v)}}
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
                  </form>
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
                {!loading && 
                  <Button
                    btnText="Continue to Payment"
                    btnType="fill"
                    type="submit"
                    onClick={() => {
                      if (typeof user !== 'undefined') {
                        Mixpanel.identify(user.id);
                        Mixpanel.track('continue-to-payment',{
                          trip_id: trip.id,
                          trip_title: trip.title,
                          trip_destination: trip.destination,
                          trip_total_amount: parseFloat(trip.travel_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.accommodation_amount),                        })
                      }
                      makePayment();
                    }}
                  />
                }
                {loading && 
                    <Spinner size={1.7} color={"#EA4524"} />

                }
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
