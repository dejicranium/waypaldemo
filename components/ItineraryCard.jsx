import Icon from "./common/Icon";
import { useState } from "react";
import { format } from "date-fns";
import InputField from "./InputField";

const ItineraryCard = ({ date, image, description, note, location, id }) => {
  const [active, setActive] = useState(0);

  const closeItinerary = () => {
    return setActive((prev) => !prev);
  };

  const showItinerary = (id) => {
    return setActive(id);
  };

  return (
    <div
      className={
        (active === id
          ? "itinerary-card-container"
          : "border border-gray-light3") + " my-8 rounded"
      }
    >

      <div className="itinerary-card__header flex justify-between p-4">
        <h1 className="font-circular-bold">
          {format(new Date(date), "EEEE, MMMM do, y")}
        </h1>
        {active === id ? (
          <Icon
            icon="caret-up"
            cname="cursor-pointer"
            handleClick={() => closeItinerary()}
          ></Icon>
        ) : (
          <Icon
            icon="caret-down"
            cname="cursor-pointer"
            handleClick={() => showItinerary(id)}
          ></Icon>
        )}
      </div>
      <div
        className={
          active === id
            ? "h-full block overflow-hidden itinerary-content"
            : "h-0 hidden"
        }
      >
        <div className="location border-b flex pb-4 px-4">
          <Icon icon="location"></Icon>
          <p className="pl-2 text-black-content">{location}</p>
        </div>
        <div
          className={`itinerary-card__details border-b ${
            image ? "flex" : ""
          } p-4`}
        >
          {image && (
            <div className="mr-5 w-1/4 flex-none">
              <div
                className="pt-2/3 bg-no-repeat bg-cover rounded"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          )}
          <p className="trip-info text-black-content">{description}</p>
        </div>
        {note && (
          <div className="notes p-4">
            <p className="text-orange-light text-sm font-circular-bold pb-1">
              Notes
            </p>
            <p className="text-black-content">{note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
