import Icon from "./common/Icon";
import { format } from "date-fns";
import { isoToDate, formatCurrency } from "../assets/js/utils";

const TripDetailHeader = ({ trip, user }) => {
  return (
    <>
      <h1 className="font-circular-black text-black text-3xl md:pr-14">
        {trip.destination} {formatCurrency(trip.currency)}{trip.travel_amount + trip.miscellaneous_amount + trip.accommodation_amount}
      </h1>
      <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8">
        <div className="profile flex items-center">
          <Icon icon="profile" cname="pr-3 flex-none" />
          <span className="no-wrap overflow-ellipsis overflow-hidden">
            {user.firstname} {user.lastname}
          </span>
        </div>
        <div className="buddies flex items-center">
          <Icon icon="buddies" cname="pr-3 flex-none" />
          <p className="no-wrap">
            {trip.buddies}{" "}
            {`${trip.buddies.length === 1 ? " buddy" : " buddies"}`}{" "}
            {`(${trip.joined_buddies} paid)`}
          </p>
        </div>
        <div className="date flex items-center md:pl-8">
          <Icon icon="calendar" cname="pr-3 flex-none" />
          <p className="no-wrap">
            {format(new Date(isoToDate(trip.start_date)), "MMMM do, y")}
          </p>
        </div>
      </div>
    </>
  );
};

export default TripDetailHeader;
