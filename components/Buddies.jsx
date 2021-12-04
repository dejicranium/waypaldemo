import Icon from "./common/Icon";
import RecommendedTrips from "./RecommendedTrips";
import BuddiesList from "./BuddiesList";
import Link from "next/link";
import Button from "./common/Button";
import { formatCurrency } from "../assets/js/utils";

import TripDetailHeader from "./TripDetailHeader";

const Buddies = ({ trip, user }) => {
  return (
    <div className="lg:flex space-x-8 justify-between">
      <section className="lg:max-w-xl xl:max-w-2xl">
        <div className="trip-details-info pt-10">
          <TripDetailHeader trip={trip} user={user} />

          <div className="buddies-info grid grid-cols-3 mt-8 pb-8 border-b">
            <p>{trip.joined_buddies} joined</p>
            <p>{trip.buddies - trip.joined_buddies} remaining</p>
            <p>
              {formatCurrency(trip.currency)}
              {trip.total_paid_amount} total payment
            </p>
          </div>
        </div>

        <div className="pt-9">
          <BuddiesList trip={trip} />
        </div>

        <div className="mt-14">
          <Button
            btnText="See all buddies"
            btnType="plain"
            btnStyle="text-orange font-circular-bold"
          />
          <div className="mt-4">
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

export default Buddies;
