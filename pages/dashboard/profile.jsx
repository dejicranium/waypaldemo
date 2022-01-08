import moment from "moment";
import Datetime from "react-datetime";
// import { blobToURL } from "../assets/js/utils";
import Icon from "../../components/common/Icon";
import { blobToURL, isoToDate } from "../../assets/js/utils";
import Button from "../../components/common/Button";
import InputField from "../../components/InputField";
import useData from "../../components/hooks/useData";
import UploadImage from "../../components/UploadImage";
import WaypalFooter from "../../components/WaypalFooter";
import DashboardSidebar from "../../components/DashboardSidebar";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";

import { useEffect, useState } from "react";
import UserAvatar from "react-user-avatar";
import IntlTelInput from "react-intl-tel-input";
import { Controller, useForm } from "react-hook-form";
import { putRequest, postRequest, getRequest } from "../../actions/connection";
import Toast from "../../components/Toast";
import dynamic from 'next/dynamic';
import {Mixpanel} from '../../assets/js/mixpanel';


const Profile = () => {

  const {
    dispatch,
    data: { user },
  } = useData();

  const [verification_url, setVerificationUrl] = useState(null);
  const [gender, setGender] = useState(user.gender)
  const [date_of_birth, setDateOfBirth] = useState(user.date_of_birth)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user,
    },
  });


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
      dispatch({user: resp.data || {}})
    })
    .catch(err => {
      alert("Could not set verification status")
    })
  }

  const openVeriffModal = async (url) => {

    if (typeof user !== 'undefined') {
      Mixpanel.identify(user.id);
      Mixpanel.track('verification-initiated',{
        user_firstname: user.firstname,
        user_lastname: user.lastname,
        user_email: user.email
      })
    }
    createVeriffFrame({
        url: url || verification_url,
        onEvent: async ( msg) => {
            switch(msg) {
            case MESSAGES.CANCELED:
              //setWaypalVerificationStatus("ABANDONED")
              if (typeof user !== 'undefined') {
                Mixpanel.identify(user.id);
                Mixpanel.track('verification-cancelled',{
                  user_firstname: user.firstname,
                  user_lastname: user.lastname,
                  user_email: user.email
                })
              }
              break;
            case MESSAGES.FINISHED:
              setWaypalVerificationStatus("ATTEMPTED")
              if (typeof user !== 'undefined') {
                Mixpanel.identify(user.id);
                Mixpanel.track('verification-completed',{
                  user_firstname: user.firstname,
                  user_lastname: user.lastname,
                  user_email: user.email
                })
              }
              await getRequest('/user/info').then(resp=> {
                dispatch({user: resp.data || {}})
              })
              break;
              }
          },  

    })
  }


  useEffect(async() => {
    await getRequest('/user/info').then(resp=> {
      dispatch({user: resp.data || {}});
      if (!['APPROVED', 'ATTEMPTED'].includes(resp.data.verified)) {
        createVeriffSession();
      }
    });
    Mixpanel.track('dashboard-profile-page-loaded');
    
  }, []);



  let profile_image = user.profile_image_url;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [profileImage, setProfileImage] = useState(profile_image);
  const [error, setError] = useState(null);
  const [verificationDone, setVerificationStatus] = useState(user.verified === "APPROVED") ;
  const [success, setSuccess] = useState(null);

  const selectImage = async (e) => {
    if (e.target.files[0].size < 2097152) {
      const url = await blobToURL(e.target.files[0]);
      setProfileImage(url);
    }
  };

  const changePassword = async () => {
    const data = {
      old_password: oldPassword,
      new_password: newPassword
    }

    if (newPassword !== newPasswordConfirmation) {
      setError("Passwords don't match")
    }
    const result = await postRequest('/user/password/change', data)
    if (result.status) {
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirmation('');
      setSuccess(result.message);
      
    }
    else {
      setError(result.message)
    }
  }

  const submit = async (values) => {
    let { phone_number, bio, website, twitter, facebook, instagram, emergency_email, 
          emergency_first_name, emergency_last_name, emergency_phone_number, gender } = values;
    const updateProfile = await putRequest("/user/saveProfileInfo", {
      bio,
      website,
      twitter,
      facebook,
      emergency_email,
      emergency_first_name,
      emergency_last_name,
      emergency_phone_number,
      instagram,
      phone_number,
      profile_image_url: profileImage,
      date_of_birth,
      gender
    });
    if (updateProfile.data) {
      // was successful
      Mixpanel.track("profile-updated-successful")
      setSuccess(updateProfile.message);
      dispatch({ user: { ...updateProfile.data } });
      
    } else {
      Mixpanel.track("profile-updated-failed");
      setError(updateProfile.message);
    }
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      {success && (
        <Toast
          message={success}
          type="success"
          close={() => setSuccess(null)}
        />
      )}
        
        <div className="container md:grid grid-cols-7 mt-14">
        <aside className="hidden md:block col-span-1">
          <DashboardSidebar />
        </aside>



        <section className="col-span-4 md:col-span-5 md:ml-40">
          
          <div className="profile-header">
            {['PENDING', 'RESUBMISSION_REQUESTED', 'DECLINED', 'ABANDONED'].includes(user.verified) && 
              <>
                <h1 className="text-2xl font-circular-bold">
                  Passenger Information
                </h1>
                <p className="text-black-content text-lg hidden md:block">
                  Enter the required information for each traveler and be sure that
                  it exactly matches the government-issued ID presented at the
                  airport
                </p>
              </>
            }

            {
              user.verified === "ATTEMPTED" && 
              <>
              <h1 className="text-2xl font-circular-bold">
                  Awaiting Verification 
                </h1>
                <p className="text-black-content text-lg hidden md:block">
                 Your verification process is still ongoing. This should take at most 2 business days from the submission time
                </p>
              </>
            }
          </div>
          <div className="profile-info-form pt-6">
            <form>
              <div className="basic-info md:flex justify-between items-start">
              {user.verified === "APPROVED" && 

                <div className="profile-photo flex-none mb-11 md:mb-0 mr-3">
                  {profileImage || user.profile_image_url ? (
                    <>
                      <div
                        className="border border-gray-light7 rounded p-8 h-36 md:h-24 mb-6 relative max-w-1/2"
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${
                            profileImage || user.profile_image_url
                          })`,
                          backgroundPosition: "top center",
                        }}
                      ></div>
                    </>
                  ) : (
                    <UserAvatar
                      size="100"
                      name={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                      color="#5CD6C0"
                      className="text-5xl"
                    />
                  )}
                    <div
                      className="upload-image flex items-center justify-center mt-3 cursor-pointer max-w-max md:max-w-full"
                      // onChange={selectImage}
                    >
                        <UploadImage className="p-1" onChange={selectImage} />
                      
                    
                    </div>
                  
                </div>
                }
                <div className="md:grid gap-x-3 grid-cols-2 flex-grow">
                  <InputField
                    type="text"
                    placeholder="First name*"
                    className="mb-3"
                    disabled
                    value={user.firstname}
                    innerref={register("firstname", {
                      required: {
                        value: true,
                        message: "Please enter a valid firstname",
                      },
                    })}
                    helptext={errors.firstname && errors.firstname.message}
                    helptextstyle={errors.firstname && "text-red-500"}
                    onChange={(e) => {
                      user.firstname = e.target.value;
                    }}
                  />
                  <InputField
                    disabled
                    type="text"
                    placeholder="Last name*"
                    className="mb-3"
                    innerref={register("lastname", {
                      required: {
                        value: true,
                        message: "Please enter a valid lastname",
                      },
                    })}
                    helptext={errors.lastname && errors.lastname.message}
                    helptextstyle={errors.lastname && "text-red-500"}
                  />

                  <select className="input-element"  name="" id="" placeholder="Select Country">
                    <option value="NG">Nigeria</option>
                  </select>

                 {/*
                  <div>
                    <Datetime
                      defaultValue={isoToDate(user.date_of_birth, true)}
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
                        className: "input-element w-full mb-3 md:mb-0",
                      }}
                      onChange={(e) => {
                        
                      }}
                      timeFormat=""
                      initialValue={moment("", "YYYY")}
                    />
                    {errors.date_of_birth && (
                      <small className={`text-red-500 block`}>
                        {errors.date_of_birth.message}
                      </small>
                    )}
                    </div> */}
                </div>
              </div>

              {/* Contact info */}
              { verificationDone  &&
              <>
                <div className="contact-info pt-8">
                  <h2 className="font-circular-bold text-gray-light4">
                    Contact information
                  </h2>
                  <div className="contact-col md:grid grid-cols-2 gap-x-3 pt-4">
                    <InputField
                      type="email"
                      placeholder="Email address*"
                      className="mb-3"
                      innerref={register("email", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      disabled
                      helptext={errors.email && errors.email.message}
                      helptextstyle={errors.email && "text-red-500"}
                    />
                    <div className="phone">
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
                            defaultValue={user?.phone_number || ''}
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
                </div>

              
                <div className="profile-info pt-8">
                  <h2 className="font-circular-bold text-gray-light4">
                    Profile information
                  </h2>
                  <div className="profile-info-col py-4">
                    <InputField
                      type="text"
                      placeholder="Bio"
                      innerref={register("bio")}
                    />
                    <div className="md:grid grid-cols-2 gap-x-3 mt-3">

                    <Datetime
                      onChange={(v) => {
                        setDateOfBirth(v.format("YYYY-MM-DD"));
                      }}
                      closeOnSelect
                      timeFormat={false}
                      dateFormat="YYYY-MM-DD"
                      inputProps={{
                        placeholder: "Date of Birth",
                        className: "outline-none box-border text-black-content w-full pl-1",
                      }}
                     
                      initialValue={user.date_of_birth ? moment(user.date_of_birth).format('YYYY-MM-DD'): ""}
                      isValidDate={(current) => current.isBefore(moment())}
                      

                      className="mb-3 input-element"
                    />
                     
                      <select
                        innerref={register("gender")}
                        value={user.gender}
                        className="mb-3 input-element"
                        onChange={(e) => {
                            setGender(e.target.value);                        
                        }}
                        >
                        <option disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                     
                      <InputField
                        type="text"
                        placeholder="Website"
                        className="mb-3"
                        innerref={register("website")}
                      />
                      <InputField
                        type="text"
                        placeholder="Twitter handle (e.g johndoe)"
                        className="mb-3"
                        innerref={register("twitter")}
                      />
                      <InputField
                        type="text"
                        placeholder="Facebook username (e.g johndoe)"
                        className="mb-3"
                        innerref={register("facebook")}
                      />
                      <InputField
                        type="text"
                        placeholder="Instagram handle (e.g johndoe)"
                        innerref={register("instagram")}
                      />
                    </div>
                  </div>
                </div>

                <div className="emergency-contact pt-8">
                  <h2 className="font-circular-bold text-gray-light4">
                    Emergency contact information
                  </h2>
                  <div className="emergency-contact-col md:grid grid-cols-2 gap-x-3 pt-4">
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
                            defaultValue={user?.emergency_phone_number || ""}
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
                </div>
                </>
              }
            </form>
            {user.verified !== 'APPROVED' &&
              <div className="mt-16 flex items-center">
                <Button
                  btnText="Verify Me!"
                  btnType="fill"
                  onClick={() => {
                    createVeriffSession()
                  }}
                />
              </div>
            }
            {user.verified == 'APPROVED' &&
              <div className="mt-16 flex items-center">
              <Button
                btnText="Save"
                btnType="fill"
                type="submit"
                onClick={handleSubmit(submit)}
              />
              </div>
            }
            <div className="update-password mt-12">
              <h2 className="font-circular-bold text-gray-light4">
                Update password
              </h2>
              <div className="pt-2 max-w-sm">
                <InputField
                  type="password"
                  placeholder="Old Password*"
                  className="mb-3"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <InputField
                  value={newPassword}
                  type="password"
                  placeholder="New Password*"
                  className="mb-3"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                  value={newPasswordConfirmation}
                  type="password"
                  placeholder="Confirm New Password*"
                  className="mb-3"
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                />
              </div>
              <Button
                btnText="Change password"
                btnType="fill"
                onClick={() => changePassword()}
                btnStyle="font-circular-bold mt-3"
              />
            </div>
          </div>
        </section>
      </div>
      <WaypalFooter />
    </>
  );
};

export default Profile;
