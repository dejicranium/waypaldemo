import Icon from "./common/Icon";
import ItineraryCard from "./ItineraryCard";
import TripPhoto from "./TripPhoto";
import TravelCostBreakdown from "./TravelCostBreakdown";

import { format } from "date-fns";

const Itinerary = ({ trip }) => {
  const amount = [
    trip.travel_amount,
    trip.accommodation_amount,
    trip.miscellaneous_amount,
  ];

  const subTotal = amount.reduce((acc, obj) => acc + obj, 0);

  const total = subTotal + (subTotal / 100) * 7.5;

  return (
    <div className="trip-itinerary lg:flex justify-between lg:space-x-8">
      <section className="itinerary mt-8 w-full lg:max-w-2xl">
        <h1 className="text-2xl font-circular-black">Itinerary</h1>

        <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8">
          <div className="profile flex items-center">
            <Icon icon="profile" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">Felix Obinna</p>
          </div>
          <div className="buddies flex items-center">
            <Icon icon="buddies" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {trip.buddies}
              {`${trip.buddies.length === 1 ? " Buddy" : " Buddies"}`}{" "}
              {`(${trip.joined_buddies} paid)`}
            </p>
          </div>
          <div className="date flex items-center md:pl-8">
            <Icon icon="calendar" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {format(new Date(trip.start_date), "MMMM do, y")}
            </p>
          </div>
          <div className="profile flex items-center justify-end">
            <Icon icon="like" cname="pr-3 cursor-pointer" />
            <Icon icon="share" cname="cursor-pointer" />
          </div>
        </div>

        <div className="itinerary-card">
          {trip.itineraries.map((e, i) => (
            <ItineraryCard {...e} key={i} id={i} />
          ))}
        </div>
      </section>

      <section className="final-travel-info mt-10 xl:max-w-lg">
        <TripPhoto images={trip.images} />
        <div className="travel-cost-breakdown mt-10">
          <TravelCostBreakdown
            travel={trip.travel_amount}
            accommodation={trip.accommodation_amount}
            misc={trip.miscellaneous_amount}
            total={total}
          />
        </div>
        <div className="hidden lg:flex mt-16 justify-end">
          <Icon icon="suitcase" />
        </div>
      </section>
    </div>
  );
};
export default Itinerary;