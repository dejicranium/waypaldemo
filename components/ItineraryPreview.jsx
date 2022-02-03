import Icon from "./common/Icon";
import ItineraryCard from "./ItineraryCard";
import TripPhoto from "./TripPhoto";
import TravelCostBreakdown from "./TravelCostBreakdown";
import useData from "../components/hooks/useData";
import UserAvatar from "react-user-avatar";

import { format } from "date-fns";

const Itinerary = ({ trip }) => {

    const {
        dispatch,
        data: {
            topSearchResults,
            tax,
            user,
            createTrip
        },
    } = useData();
  const amount = [
    createTrip.travel_amount,
    createTrip.accommodation_amount,
    createTrip.miscellaneous_amount,
  ];



  const subTotal = amount.reduce((acc, obj) => acc + obj, 0);

  const total = subTotal + (subTotal / 100) * (tax || 1);

  return (
    <div className="trip-itinerary lg:flex justify-between lg:space-x-8">
      <section className="itinerary mt-8 w-full lg:max-w-2xl">
        <h1 className="text-2xl font-circular-black">Itinerary</h1>

        <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8">
          <div className="profile flex items-center">
          {!user.profile_image_url && (
              <Icon icon="profile" cname="pr-3 flex-none" />
            )}
            {user.profile_image_url && (
            <UserAvatar
                className="pr-3"
                  size="28"
                  name={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                  color="#5CD6C0"
                  src={user.profile_image_url || ''}
                />
            )}
            <p className="xl:whitespace-nowrap">{user.firstname + ' ' + user.lastname}</p>
          </div>
          <div  className="buddies flex items-center mr-5">
            <Icon icon="buddies" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap mr-10">
              {createTrip.buddies}{" "}
              {`${createTrip.buddies === 1 ? " Buddy" : " Buddies"}`}{" "}
              {`(0 paid)`}
            </p>
          </div>
          <div className="date flex items-center md:pl-8">
            <Icon icon="calendar" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {format(new Date(createTrip.start_date), "MMMM do, y")}
            </p>
          </div>
          {/*
          <div className="profile flex items-center justify-end">
            <Icon icon="like" cname="pr-3 cursor-pointer" />
            <Icon icon="share" cname="cursor-pointer" />
          </div>*/}
        </div>

        <div className="itinerary-card">
          {createTrip.itineraries.map((e, i) => (
            <ItineraryCard {...e} key={i} id={i} />
          ))}
        </div>
      </section>

      <section className="final-travel-info mt-10 xl:max-w-lg">
        <TripPhoto images={createTrip.images} />
        <div className="travel-cost-breakdown mt-10">
          <TravelCostBreakdown
            travel={createTrip.travel_amount}
            accommodation={createTrip.accommodation_amount}
            misc={createTrip.miscellaneous_amount}
            total={total}
          />
        </div>
      </section>
    </div>
  );
};
export default Itinerary;