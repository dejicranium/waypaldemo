import moment from "moment";
import { useState, useEffect } from "react";
import Datetime from "react-datetime";
import { useRouter } from "next/router";
import IntlTelInput from "react-intl-tel-input";
import { useBeforeunload } from "react-beforeunload";
import { useForm, Controller } from "react-hook-form";

import { init } from "../../store";
import BuddyTag from "../../components/BuddyTag";
import Button from "../../components/common/Button";
import Footer from "../../components/common/Footer";
import TravelCost from "../../components/TravelCost";
import InputField from "../../components/InputField";
import useData from "../../components/hooks/useData";
import TextAreaField from "../../components/TextAreaField";
import { postRequest } from "../../actions/connection";
import Toast from '../../components/Toast';
import Autocomplete from "react-google-autocomplete";
import {Mixpanel} from '../../assets/js/mixpanel';

const CreateTrip = () => {
  const {
    dispatch,
    data: { createTrip, user, isLoggedIn },
  } = useData();
  const { push } = useRouter();
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...createTrip,
    },
  });

  useEffect(() => {
    getUserVerificationStatus();
  })


  const getUserVerificationStatus = () => {
    if (user.verified !== 'APPROVED') {
      if (isLoggedIn) {

        push("/dashboard/profile")
      }

      push('/')
    }
  }
  const sD = watch("start_date");

  const [tags, setTags] = useState(createTrip?.checklists || []);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState(createTrip.destination)
  const [meeting_point, setMeetingPlace] = useState(createTrip.meeting_point)
  const [error, setError] = useState("");
  const [is_public, setPublic] = useState(true);
  const [startDate, setStartDate] = useState("");

  const addBuddyTag = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.preventDefault();
      event.target.value = "";
    }
  };

  const removeBuddyTag = (index) => {
    setTags([...tags.filter((tag) => tag !== index)]);
  };

  useBeforeunload((event) => {
    if (createTrip) {
      event.preventDefault();
      dispatch({ createTrip: init.createTrip });
    }
  });

  const cancel = () => {
    dispatch({ createTrip: init.createTrip });
    push("/");
  };

  const submit = async  (data) => {
    await postRequest('/trip/verify-name', {
      title: title
    }).then(resp =>{
      if (resp.status) {

        dispatch({ createTrip: { ...createTrip, ...data, is_public, destination, meeting_point, checklists: tags } });
        push("/create/itinerary");
      }
      else {
        setError(resp.message)     
      }
    })
    .catch(err=> {
      alert(err.message)
      setError(err.message)
      return
    })
  };

  return (
    <>
     {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      <div className="container lg:flex justify-between lg:space-x-10">
        <section className="create-trip container md:max-w-lg mt-8">
          <div className="create-trip-header">
            <h1 className="text-black-light text-2xl font-circular-bold">
              Create a trip
            </h1>
            <p className="pt-4">
              Enter the required information for trip.
            </p>
          </div>

          <form>
            <div className="create-trip-form mb-10">
              <div className="trip-details mt-8 md:grid grid-cols-2 gap-x-4 mb-3">
               
                
                <InputField
                  type="text"
                  placeholder="Destination"
                  cname="mb-3"
                  isdestination_input={true}
                  onChange={setDestination}
                  /*
                  innerref={register("destination", {
                    required: {
                      value: true,
                      message: "Please enter a destination",
                    },
                  })}*/
                  helptext={errors.destination && errors.destination.message}
                  helptextstyle={errors.destination && "text-red-500"}
                />
                <InputField
                  type="text"
                  className="mb-3"
                  placeholder="Buddies"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                  }}
                  innerref={register("buddies", {
                    required: {
                      value: true,
                      message: "Please enter the number of buddies",
                    },
                    //valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Buddies cannot be less than one",
                    },
                  })}
                  min={1}
                  helptext={errors.buddies && errors.buddies.message}
                  helptextstyle={errors.buddies && "text-red-500"}
                />
                <div>
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    render={({ field: { onChange } }) => (
                      <Datetime
                        closeOnSelect
                        timeFormat={false}
                        dateFormat="YYYY-MM-DD"
                        inputProps={{
                          placeholder: "Start date",
                          className: "input-element w-full mb-3 md:mb-0",
                        }}
                        onChange={(v) => {
                          onChange(v.format("YYYY-MM-DD"));
                          setStartDate(v)
                        }}
                        initialValue={moment(
                          createTrip?.start_date,
                          "YYYY-MM-DD"
                        )}
                        isValidDate={(current) => current.isAfter(moment()) }
                      />
                    )}
                  />
                  {errors.start_date && (
                    <small className={`text-red-500 block`}>
                      {errors.start_date.message}
                    </small>
                  )}
                </div>
                <div>
                  <Controller
                    name="end_date"
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
                          placeholder: "End date",
                          className: "input-element w-full mb-3 md:mb-0",
                        }}
                        onChange={(v) => {
                          onChange(v.format("YYYY-MM-DD"));
                        }}
                        initialValue={moment(
                          createTrip?.end_date,
                          "YYYY-MM-DD"
                        )}
                        isValidDate={(current) => current.isAfter(moment(startDate).subtract(1, 'days'))}
                      /> 
                    )}
                  />
                  {errors.end_date && (
                    <small className={`text-red-500 block`}>
                      {errors.end_date.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="">
                <InputField
                  type="text"
                  placeholder="Title of trip"
                  className="mb-2"
                  innerref={register("title", {
                    required: {
                      value: true,
                      message: "Please enter a title for this trip",
                    },
                  })}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  helptext={errors.title && errors.title.message}
                  helptextstyle={errors.title && "text-red-500"}
                />
                <TextAreaField
                  placeholder="Enter a description of your trip"
                  className="mb-6"
                  innerref={register("description", {
                    required: {
                      value: true,
                      message: "Please enter a description for your trip",
                    },
                  })}
                  helptext={errors.description && errors.description.message}
                  helptextstyle={errors.description && "text-red-500"}
                />
              </div>
              <div className="meeting-point border-t border-b border-light py-4">
                <h2 className="text-black font-circular-bold pt-4 pb-2">
                  Who can see/join this trip?
                </h2>
                <select className="input-element" innerref={register('is_public')} onChange={(e) => {
                  dispatch({createTrip: {...createTrip, is_public: e.target.value === 'true' ? true : false}})
                  if (e.target.value === 'true') {
                    setPublic(true)
                  }
                  else {
                    setPublic(false)
                  }
                }}>
                  <option value='true'>Everyone</option>
                  <option value='false'>People with link</option>
                </select>
              </div> 
              <div className="meeting-point border-t border-b border-light py-4">
                <h2 className="text-black font-circular-bold pt-4 pb-2">
                  Meeting point
                </h2>
                <InputField
                  type="text"
                  placeholder="Meeting point address"
                  // helptext="Where you want your travel buddies to meet"
                  cname="max-w-sm destination-input"
                  onChange={setMeetingPlace}
                  isdestination_input={true}
                  helptext={
                    errors.meeting_point && errors.meeting_point.message
                  }
                  helptextstyle={errors.meeting_point && "text-red-500"}
                />
              </div>

              <div className="buddies-checklist pb-10 border-b border-light">
                <h2 className="text-black font-circular-bold pt-4 pb-2">
                  Buddies checklist
                </h2>
                <InputField
                  type="text"
                  placeholder="Enter a criterion and press enter"
                  onKeyUp={addBuddyTag}
                  cname="max-w-sm"
                  enterKeyHint="done"
                />
                <div className="buddies-checklist-list">
                  <BuddyTag tags={tags} removeBuddyTag={removeBuddyTag} />
                </div>
              </div>

              <div className="personal-info max-w-sm pt-10">
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
                      defaultValue={createTrip?.phone_number}
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

            {/* <div className="continue-to-itinerary mt-14 hidden lg:flex items-center space-x-10 max-w-xs mx-auto container">
              <p className="font-circular-bold text-orange">Cancel</p>
              <Button
                type="button"
                btnText="Continue to itinerary"
                btnType="fill"
                onClick={handleSubmit(submit)}
              />
            </div> */}
          </form>
        </section>

        <section className="travel-cost md:max-w-lg md:pl-4 lg:w-1/2 lg:mt-24">
          <TravelCost register={register} watch={watch} />
        </section>
      </div>

      <div className="continue-to-itinerary mt-14 flex items-center container space-x-10 max-w-xs mx-auto">
        <p
          className="font-circular-bold text-orange cursor-pointer"
          onClick={cancel}
        >
          Cancel
        </p>
        <Button
          type="button"
          btnType="fill"
          btnText="Continue to itinerary"
          onClick={handleSubmit(submit)}
        />
      </div>

      <Footer />
    </>
  );
};

export default CreateTrip;
