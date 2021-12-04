import Icon from "./common/Icon";
import { format } from "date-fns";
import Button from "./common/Button";
import InputField from "./InputField";
import UploadImage from "./UploadImage";
import { useRef, useState } from "react";
import TextAreaField from "./TextAreaField";
import { blobToURL } from "../assets/js/utils";

const ItineraryInput = ({
  id,
  date,
  index,
  errors,
  initImg = "",
  initDesc = "",
  initNote = "",
  initPlace = "",
  getItinerary,
}) => {
  const noteRef = useRef();
  const descRef = useRef();
  const placeRef = useRef();
  const [img, setImg] = useState(initImg);
  const [note, showNote] = useState(false);
  const [active, setActive] = useState(false);

  const onChange = () => {
    getItinerary(index, {
      date,
      image: img,
      note: noteRef.current.value,
      location: placeRef.current.value,
      description: descRef.current.value,
    });
  };

  const selectImage = async (e) => {
    if (e.target.files[0].size < 2097152) {
      const url = await blobToURL(e.target.files[0]);
      setImg(url);
      getItinerary(index, {
        date,
        image: url,
        note: noteRef.current.value || "",
        location: placeRef.current.value || "",
        description: descRef.current.value || "",
      });
    }
  };

  const removeImage = () => {
    setImg("");
    getItinerary(index, {
      date,
      image: "",
      note: noteRef.current.value || "",
      location: placeRef.current.value || "",
      description: descRef.current.value || "",
    });
  };

  return (
    <div
      className={
        (active === id
          ? "itinerary-card-container"
          : "border border-gray-light3") + " my-8 rounded"
      }
    >
      <div
        className="itinerary-card__header flex border-b justify-between p-4"
        onClick={() => setActive(!active)}
      >
        <h1 className="font-circular-bold">
          {format(new Date(date), "EEEE, MMMM do, y")}
        </h1>
        {active ? (
          <Icon icon="caret-up" cname="cursor-pointer" />
        ) : (
          <Icon icon="caret-down" cname="cursor-pointer" />
        )}
      </div>
      <div
        className={
          active
            ? "h-full block overflow-hidden itinerary-content"
            : "h-0 hidden"
        }
      >
        <div className="location pb-4 pt-6 px-4">
          <InputField
            innerref={{
              ref: placeRef,
            }}
            onChange={onChange}
            defaultValue={initPlace}
            placeholder="Add a place"
            leadingicon="location-input"
          />
        </div>

        <div className="itinerary-input__details flex flex-col md:flex-row md:justify-between p-4">
          <div className="flex-grow md:mr-4">
            {img ? (
              <>
                <div
                  className="border w-full border-gray-light7 rounded p-2 h-24 md:p-6 mb-6 relative"
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${img})`,
                    backgroundPosition: "center center",
                  }}
                >
                  <span
                    className="text-black absolute top-2 right-4 cursor-pointer rounded-full flex items-center justify-center bg-white h-8 w-8 opacity-50"
                    onClick={removeImage}
                  >
                    x
                  </span>
                  <div className="upload-img flex justify-between items-center flex-col" />
                </div>
              </>
            ) : (
              <div className="">
                <UploadImage
                  onChange={selectImage}
                  className="p-2 md:p-6 mb-6 md:h-24"
                />
              </div>
            )}
          </div>
          <div className="md:w-3/5">
            <TextAreaField
              innerref={{
                ref: descRef,
              }}
              cname="h-full"
              defaultValue={initDesc}
              onChange={onChange}
              placeholder="Description"
              helptext={errors.description && errors.description.message}
              helptextstyle={errors.description && "text-red-500"}
            />
          </div>
        </div>

        <div className="notes p-4">
          <InputField
            innerref={{
              ref: noteRef,
            }}
            onChange={onChange}
            placeholder="Note: "
            defaultValue={initNote}
            cname={note ? "block" : "hidden"}
          />
          <Button
            btnStyle={note ? "hidden" : "text-orange font-circular-bold"}
            btnText="Add note +"
            btnType="plain"
            onClick={() => showNote(!note)}
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryInput;
