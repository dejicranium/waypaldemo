import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { add, differenceInDays, format } from "date-fns";

import { init } from "../../store";
import Toast from "../../components/Toast";
import Button from "../../components/common/Button";
import Footer from "../../components/common/Footer";
import TravelCost from "../../components/TravelCost";
import useData from "../../components/hooks/useData";
import UploadImage from "../../components/UploadImage";
import { blobToURL } from "../../assets/js/utils";
import ItineraryInput from "../../components/ItineraryInput";

const CreateItinerary = () => {
  const {
    dispatch,
    data: {
      createTrip,
      createTrip: { start_date, end_date },
    },
  } = useData();
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...createTrip,
    },
  });
  const { push } = useRouter();
  const uploadRef = useRef(null);
  const [items, setItems] = useState([]);
  const [required, setRequired] = useState("");
  const [imgs, setImgs] = useState(createTrip.images || []);
  const itineraryData = useRef([]);

  // Image Functions
  const onChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = await Promise.all(files.map((e) => blobToURL(e)));
    setImgs([...imgs, ...urls]);
  };

  // Itinerary Functions
  const getItinerary = (index, data) => {
    itineraryData.current[index] = data;
  };

  const submitItinerary = async (value) => {
    let isValid = true;

    itineraryData.current.forEach((data) => {
      if (data.location && data.description) return;
      isValid = false;
      setRequired(
        "Please fill in location and description fields for all itineraries"
      );
    });

    if (!isValid) return;

    const itineraries = [];

    itineraryData.current.forEach((e, i) => {
      itineraries.push({ ...e, image: [i] });
    });

    // Send trip over to review
    dispatch({
      createTrip: {
        ...createTrip,
        ...value,
        itineraries: itineraryData.current,
        images: [...imgs],
      },
    });
    push("/create/review");
  };

  // Remove image from the list
  const removeImage = (i) => {
    const cache = imgs.filter((e) => e !== i);
    setImgs(cache);
  };

  // Go back to previous step
  const goBack = (value) => {
    dispatch({
      createTrip: {
        ...createTrip,
        ...value,
        images: [...imgs],
        itineraries: itineraryData.current,
      },
    });
    push("/create");
  };

  useBeforeunload((event) => {
    if (createTrip) {
      event.preventDefault();
      dispatch({ createTrip: init.createTrip });
    }
  });

  // Creates Itinerary input
  useEffect(() => {
    const tripDays = differenceInDays(new Date(end_date), new Date(start_date));

    let date = start_date;
    const itenararyInputs = [];
    const init = {
      note: "",
      image: "",
      location: "",
      description: "",
    };
    for (let i = 0; i <= tripDays; i += 1) {
      const initData = createTrip?.itineraries[i] || init;
      itineraryData.current.push(initData);

      itenararyInputs.push(
        <ItineraryInput
          index={i}
          key={date}
          date={date}
          id={`it-${i}`}
          errors={errors}
          register={register}
          initImg={initData.image}
          getItinerary={getItinerary}
          initNote={initData.note || ""}
          initPlace={initData.location || ""}
          initDesc={initData.description || ""}
        />
      );

      date = add(new Date(date), { days: 1 }).toISOString();
    }
    setItems(itenararyInputs);
  }, []);

  return (
    <>
      {required && (
        <Toast
          message={required}
          type="error"
          close={() => setRequired(null)}
        />
      )}
      <div className="container lg:flex justify-between lg:space-x-10">
        <section className="create-itinerary container md:max-w-lg mt-8">
          <div className="create-itinerary-header">
            <h1 className="text-black-light text-2xl font-circular-bold">
              Itinerary
            </h1>
            <p className="pt-4">
              Enter the required information for each traveler and be sure that
              it exactly matches the government-issued ID presented at the
              airport.
            </p>
          </div>

          <form>
            <div className="create-itinerary-form mb-10">
              <div className="upload-image mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-4">
                {imgs.length ? (
                  imgs.map((e, i) => (
                    <div key={i}>
                      <div
                        className="itinerary-upload border border-gray-light7 rounded p-2 h-36 md:p-6 mb-6 relative"
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${e})`,
                          backgroundPosition: "center center",
                        }}
                      >
                        <span
                          className="text-black absolute top-2 right-4 cursor-pointer rounded-full flex items-center justify-center bg-white h-8 w-8 opacity-50"
                          onClick={() => {
                            removeImage(e);
                          }}
                        >
                          x
                        </span>
                        <div className="upload-img flex justify-between items-center flex-col" />
                      </div>
                    </div>
                  ))
                ) : (
                  <UploadImage
                    onChange={onChange}
                    className="p-2 md:p-6 mb-6"
                  />
                )}
              </div>
              <div className="add-another-photo pt-11 pb-14">
                <input
                  hidden
                  multiple
                  type="file"
                  id="upload"
                  ref={uploadRef}
                  onChange={onChange}
                />
                <Button
                  type="button"
                  btnType="plain"
                  btnText="Add another photo +"
                  btnStyle="text-orange font-circular-bold"
                  onClick={() => {
                    uploadRef.current?.click();
                  }}
                />
              </div>

              <div className="itinerary-input py-4 w-full">{items}</div>
            </div>
          </form>
        </section>

        <section className="payment-breakdown md:max-w-lg md:pl-4 lg:w-1/2 lg:mt-24">
          <TravelCost register={register} watch={watch} />
          {/* <div className='proceed-to-payment mt-14 flex items-center justify-between lg:justify-end max-w-xs mx-auto container'>
            <p
              className='font-circular-bold text-orange lg:hidden'
              onClick={goBack}
            >
              {'<'} Back
            </p>
            <Button
              type='button'
              btnType='fill'
              btnText='Continue'
              onClick={submitItinerary}
            />
          </div> */}
        </section>
      </div>
      <div className="proceed-to-payment mt-14 flex items-center container space-x-10 max-w-xs mx-auto">
        <p
          className="font-circular-bold text-orange cursor-pointer"
          onClick={handleSubmit(goBack)}
        >
          {"<"} Back
        </p>
        <Button
          type="button"
          btnType="fill"
          btnText="Continue"
          onClick={handleSubmit(submitItinerary)}
        />
      </div>
      <Footer />
    </>
  );
};

export default CreateItinerary;
