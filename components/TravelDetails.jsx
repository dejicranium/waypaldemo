import Link from "next/link";
import { format } from "date-fns";

import Icon from "./common/Icon";
import Button from "./common/Button";
import PriceBreakdown from "./PriceBreakdown";
import RecommendedTrips from "./RecommendedTrips";

import { isoToDate } from "../assets/js/utils";
import TripDetailHeader from "./TripDetailHeader";

const TravelDetails = ({ trip, user }) => {
  return (
    <div className="lg:flex space-x-8 justify-between">
      <section className="lg:max-w-xl xl:max-w-3xl">
        <div className="trip-details-info pt-10">

          <TripDetailHeader trip={trip} user={user} />

          <div className="buddies-progress rounded border bg-orange-white mt-8 p-6 md:flex items-start space-x-8">
            <div className="hidden md:flex">
              <Icon icon="money-bag-small"></Icon>
            </div>
            <div className="">
              <p className="text-black font-circular-bold text-lg">
                {trip.joined_buddies} of {trip.buddies} travel{" "}
                {`${trip.buddies.length === 1 ? " buddy" : " buddies"}`} joined
              </p>
              <div className="progress-bar-container max-w-400 h-4 rounded-10 bg-gray-light6 mt-4 relative">
                <div className="progress-bar bg-green-dark absolute w-0 h-4 rounded-10" style={{ width: `${ trip.joined_buddies / trip.buddies * 100}%` }}></div>
              </div>
              <p className="pt-2">
                This trip needs {Math.floor(0.7 * trip.buddies)} more buddies to join before you can request
                for withdrawal
              </p>
              <div className="mt-4">
                <Link href="/request-fund">
                  <a>
                    <Button btnType="fill" btnText="Request for funds" />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="travel-itinerary mt-8">
            <h3 className="text-orange font-bold">Travel Itinerary</h3>
            <p className="pt-4">
              {trip.description}
            </p>
          </div>

          <div className="buddies-checklist mt-10">
            <h2 className="font-circular-bold">Buddies Checklist</h2>
            <div className="buddies-list grid md:grid-cols-4 md:gap-4 grid-cols-2 pt-4">
              {trip.checklists.map((item, index) => (
                <div className="flex items-center" key={index}>
                  <Icon icon="checkmark" />
                  <p className=" pl-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="meeting-point mt-10">
            <h2 className="font-circular-bold ">Meeting point</h2>
            <p className="pt-2">
              {trip.meeting_point}
            </p>
          </div>

          <div className="price-breakdown pt-10">
            <PriceBreakdown trip={trip} />
          </div>

          <div className="mt-8">
              <a>
                <Button btnType="fill" btnText="Request for funds" />
              </a>
          </div>
        </div>
      </section>

      <section className="recommended-trips hidden lg:block flex-none min-w-400">
        <RecommendedTrips />
      </section>
    </div>
  );
};

export default TravelDetails;
