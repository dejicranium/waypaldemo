import Link from "next/link";
import { useState, useRef } from "react";

import Icon from "./common/Icon";
import { format } from "date-fns";
import useClickOutside from "./hooks/useClickOutside";
import { isoToDate, formatAmount, totalAmount } from "../assets/js/utils";

const DetailTripCard = ({
  title,
  price,
  destination,
  date,
  image,
  options,
  buddies,
  slug,
  requestfunds,
}) => {
  let tripDate = format(new Date(isoToDate(date)), "EEEE, MMMM do, y");
  const total = totalAmount(price);
  const dropRef = useRef(null);
  const [showOptions, setShowOption] = useState(false);

  const toggleOptions = () => {
    return setShowOption((prev) => !prev);
  };

  useClickOutside(() => setShowOption(false), dropRef);

  return (
    <div className="relative">
      <div className="trip-card p-4 my-6 border rounded border-gray-light3 flex items-start justify-between">
        {/* Image and trip details */}
        <div className="trip-info flex flex-col w-full md:flex-row">
          {/* image */}
          <div className="md:mr-5 md:w-1/4 flex-none">
            <div
              className="pt-2/3 bg-no-repeat bg-cover rounded"
              style={{
                backgroundImage: `url(${image || "/landscape.jpg"})`,
              }}
            ></div>
          </div>
          {/* trip details */}
          <div className="trip-card__details pt-4 md:pt-2 flex items-start justify-between">
            <div className="trip">
              <h2 className="text-black-content font-circular-black text-base md:text-2xl">
                <span className="">{title}</span> -{" "}
                <span>${formatAmount(total)}</span>
              </h2>
              <p className="text-gray-light">
                {buddies} {`${buddies === 1 ? " buddy" : " buddies"}`} joined
              </p>
              <p className="text-gray-light">{tripDate}</p>
              <div className="flex items-center">
                <Icon icon="location" cname="pr-2"></Icon>
                <span className="">{destination}</span>
              </div>
            </div>
            {options && (
              <div className="md:hidden cursor-pointer" onClick={toggleOptions}>
                <Icon icon="options" cname="" />
              </div>
            )}
          </div>
          {/* end of trip details */}
        </div>
        {options && (
          // <div className="relative">
          <>
            <div
              className="hidden md:block cursor-pointer"
              onClick={toggleOptions}
            >
              <Icon icon="options" cname="" />
            </div>
            <div className="options-menu">
              <div
                ref={dropRef}
                className={
                  showOptions
                    ? "absolute rounded shadow-md bg-white z-10 right-4 bottom-0"
                    : "hidden"
                }
              >
                <ul className="py-4 px-2 options-list">
                  <li className="py-3 rounded px-10">
                    <Link href={`/messaging/${slug}`}>Group Chat</Link>
                  </li>
                  <li className="py-3 rounded px-10 text-center">
                    <Link href={`/trip/${slug}`}>Trip Details</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
          // </div>
        )}
      </div>
    </div>
  );
};

export default DetailTripCard;
