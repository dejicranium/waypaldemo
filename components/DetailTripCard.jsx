import Link from "next/link";
import { useState, useRef } from "react";
import {  formatCurrency } from '../assets/js/utils';
import Icon from "./common/Icon";
import { format } from "date-fns";
import useClickOutside from "./hooks/useClickOutside";
import { isoToDate, formatAmount, totalAmount } from "../assets/js/utils";
import moment from 'moment'
import useData from "../components/hooks/useData";


const DetailTripCard = ({
  title,
  price,
  destination,
  date,
  image,
  options,
  buddies,
  slug,
  currency,
  requestfunds,
  privatelink,
  no_groupchat_view,
  no_public_view,
  no_dashboard_view,
}) => {

  const {
    dispatch,
    data: {
      topSearchResults,
      tax
    },
  } = useData();
  
  let tripDate = date ? moment(new Date(date)).format('dddd, MMMM DD, YYYY') : "";
  const total = totalAmount(price, tax);
  const dropRef = useRef(null);
  const [showOptions, setShowOption] = useState(false);

  const toggleOptions = (e) => {
    e.stopPropagation();
    return setShowOption((prev) => !prev);
  };
  const goToTrip = (e) => {
    e.stopPropagation();
    if (typeof (privatelink) === 'boolean' && privatelink==true) {
      window.location.href = `/trip/${slug}/detail`;
    }
    else {
      window.location.href = `/trip/${slug}`;
    }
  }

  useClickOutside(() => setShowOption(false), dropRef);

  return (
    <div className="relative cursor-pointer" >
      <div className="trip-card p-4 my-6 border rounded border-gray-light3 flex items-start justify-between">
        {/* Image and trip details */}
        <div className="trip-info flex flex-col w-full md:flex-row">
          {/* image */}
          <div className="md:mr-5 md:w-1/4 flex-none">
            <div
              onClick={goToTrip}
              className="pt-2/3 bg-no-repeat bg-cover rounded"
              style={{
                backgroundImage: `url(${image || "/landscape.jpg"})`,
                height: '100%'
              }}
            ></div>
          </div>
          {/* trip details */}
          <div onClick={goToTrip} className="trip-card__details pt-4 md:pt-2 flex items-start justify-between">
            <div className="trip">
              <h2 className="text-black-content font-circular-black text-base md:text-2xl">
                <span className="">{title}</span> -{""}
                <span>{formatCurrency(currency)}{formatAmount(total)}</span>
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
                  {no_groupchat_view !== '1' && (
                    <li className="py-3 rounded px-10">
                      <Link href={`/messaging/${slug}`}>Group Chat</Link>
                    </li>
                  )}
                  {no_public_view !== '1' && (
                    <li className="py-3 rounded px-10">
                      <Link href={`/trip/${slug}`}>Public View</Link>
                    </li>
                  )}

                  {no_dashboard_view !== '1' && (
                    <li className="py-3 rounded px-10">
                      <Link href={`/trip/${slug}/detail`}>Dashboard View</Link>
                    </li>
                  )}
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
