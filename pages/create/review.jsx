import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import { format } from "date-fns";
import { init } from "../../store";
import Toast from "../../components/Toast";
import Spinner from "../../components/Spinner";
import Icon from "../../components/common/Icon";
import TripPhoto from "../../components/TripPhoto";
import Button from "../../components/common/Button";
import Footer from "../../components/common/Footer";
import useData from "../../components/hooks/useData";
import { postRequest } from "../../actions/connection";
import ItineraryCard from "../../components/ItineraryCard";
import PaymentBreakdown from "../../components/PaymentBreakdown";
import { Mixpanel } from '../../assets/js/mixpanel';

const CreateTripReview = () => {
  const {
    dispatch,
    data: {
      user,
      createTrip,
      tax,
      createTrip: { images, itineraries },
      currentTrip
    },
  } = useData();

  const { push } = useRouter();

  const [step, setStep] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Go back to previous step
  const goBack = () => {
    push("/create/itinerary");
  };

  // create yout trip
  const submitTrip = async () => {
    setStep("Creating your awesome trip");
    setLoading(true);
    
    const uploadTripImages = await Promise.all(
      images.map((url) => fetch(url).then((r) => r.blob()).catch(e => {
        
      }))
    );


    let uploadedImages = await Promise.all(
      uploadTripImages.map((e) => {
        const data = new FormData();
        data.append("file", e);
        data.append("upload_preset", "waypal_app");
        data.append("cloud_name", process.env.CLOUD_NAME);

        return axios
          .post("https://api.cloudinary.com/v1_1/waypal/image/upload", data)
          .then((d) => d.data.url)
          .catch(err=> {
            setLoading(false)
            setStep("")
          })
      })
    );
    images.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    setStep("Uploading trip images");

    const itenararyUpload = itineraries.map((e) => e.image);
    let getItineraryBlobs = []
    try {
      getItineraryBlobs = await Promise.all(
        itenararyUpload.map((url) => fetch(url).then((r) => r.blob()))
      );
    }
    catch(e) {          
      if (typeof user !== 'undefined') {
        Mixpanel.identify(user.id);
        Mixpanel.track('trip-created-failed',{
          message: "Couldn't upload itinerary"
         
        })
      }
      console.log("Couldn't upload itinerary")
    }

    const itineraryImages = await Promise.all(
      getItineraryBlobs.map((e) => {
        if (e.type !== "text/html") {

            const data = new FormData();
            data.append("file", e);
            data.append("upload_preset", "waypal_app");
            data.append("cloud_name", process.env.CLOUD_NAME);
  
            return axios
              .post("https://api.cloudinary.com/v1_1/waypal/image/upload", data)
              .then((d) =>d.data.url)
              .catch(err=> {
                setLoading(false)
                setStep("")
              })
          
        }
        return;
      })
    );

    itenararyUpload.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    const itineraryList = [];

    itineraries.forEach((e, i) => {
      itineraryList.push({ ...e, image: itineraryImages[i] });
    });

    setStep("Almost done...");

    // Create trip
    const saveData = await postRequest("/trip/create", {
      ...createTrip,
      tax,
      itineraries: [...itineraryList],
      images: [...uploadedImages],
    });

    if (saveData.status && saveData.data) {
      dispatch({ currentTrip: { ...saveData.data } });
      dispatch({ createTrip: init.createTrip });
      push("/create/success");
      setLoading(false);
    } else {
      if (typeof user !== 'undefined') {
        Mixpanel.identify(user.id);
        Mixpanel.track('trip-created-failed',{
          message: saveData.message       
        })
      }
      setError(saveData.message);
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" close={() => setError(null)} />
      )}
      {loading && (
        <div className="loading-trip fixed z-20 top-0 left-0 w-full h-full modal-mask flex justify-center items-center">
          <Spinner size={1.7} color={"#EA4524"} />
          <span className="ml-3 text-lg text-white">{step}</span>
        </div>
      )}
      <div className="mt-14 container lg:flex justify-between lg:space-x-8">
        <section className="trip-review w-full lg:max-w-2xl">
          <div className="trip-details-header">
            <h1 className="text-black-light text-2xl font-circular-bold">
              Trip details
            </h1>
          </div>

          <div className="trip-details-info pt-10">
            <h1 className="font-circular-black text-black text-3xl md:pr-14">
              {createTrip.title} - {createTrip.destination}
            </h1>
          {/*
            <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8">
              <div className="profile flex items-center">
                <Icon icon="profile" cname="pr-3 flex-none" />
                <p className="no-wrap">
                  {user.firstname} {user.lastname}
                </p>
              </div>
              <div className="buddies flex items-center">
                <Icon icon="buddies" cname="pr-3 flex-none" />
                <p className="no-wrap">
                  {" "}
                  {createTrip.buddies}{" "}
                  {`${createTrip.buddies === 1 ? " buddy" : " Buddies"}`}{" "}
                </p>
              </div>
              <div className="date flex items-center md:pl-8">
                <Icon icon="calendar" cname="pr-3 flex-none" />
                <p className="no-wrap">
                  {createTrip.start_date &&
                    format(new Date(createTrip.start_date || ""), "MMMM do, y")}
                </p>
              </div>
                  </div>*/}

            <div className="trip-description mt-8">
              <p className="">{createTrip.description}</p>
            </div>

            <div className="buddies-checklist mt-10">
              <h2 className="font-circular-bold">Buddies Checklist</h2>
              <div className="buddies-list grid md:grid-cols-4 md:gap-4 grid-cols-2 pt-4">
                {createTrip.checklists?.map((item, index) => (
                  <div className="flex items-center" key={index}>
                    <Icon icon="checkmark" />
                    <p className=" pl-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="meeting-point mt-10">
              <h2 className="font-circular-bold ">Meeting point</h2>
              <p className="">{createTrip.meeting_point}</p>
            </div>
          </div>

          <div className="itinerary mt-14">
            <h1 className="text-black-light text-3xl font-circular-bold">
              Itinerary
            </h1>
            <div className="itinerary-card">
              {createTrip.itineraries.map((e, i) => (
                <ItineraryCard {...e} key={i} id={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="payment-breakdown flex-grow">
          <div className="trip-photo-display my-12 w-full">
            <TripPhoto images={createTrip.images} />
          </div>
          <div className="travel-cost xl:flex justify-end">
            <PaymentBreakdown
              currency={createTrip.currency}
              travel_amount={createTrip.travel_amount}
              accommodation_amount={createTrip.accommodation_amount}
              miscellaneous_amount={createTrip.miscellaneous_amount}
            />
          </div>
          {/* <div className="proceed-to-payment mt-14 flex items-center justify-between lg:justify-end max-w-xs mx-auto container">
            <p className="font-circular-bold text-orange lg:hidden">
              {"<"} Back
            </p>
            <Link href="/create/success">
              <a>
                <Button btnText="Continue" btnType="fill" />
              </a>
            </Link>
          </div> */}
        </section>
      </div>
      <div className="proceed-to-payment mt-14 items-center space-x-10 max-w-xs mx-auto container flex">
        <p
          className="font-circular-bold text-orange cursor-pointer"
          onClick={goBack}
        >
          {"<"} Back to edit
        </p>
        <Button
          btnText="Create Trip"
          btnType="fill"
          onClick={submitTrip}
          loading={loading}
        />
      </div>
      <Footer />
    </>
  );
};

export default CreateTripReview;
