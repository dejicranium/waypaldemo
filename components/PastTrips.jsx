import Link from "next/link";

import Icon from "./common/Icon";
import Button from "./common/Button";
import DetailTripCard from "./DetailTripCard";

const PastTrips = ({ trips, error }) => {
  return (
    <>
      {error ? (
        <p>An error ocurred</p>
      ) : (
        <>
          {trips.length > 0 ? (
            <div className="pt-5">
              <h1 className="text-2xl font-circular-bold">Past trips</h1>
              <div className="trip-cards max-w-3xl">
                {trips.map((trip) => (
                  <DetailTripCard
                    key={trip.Trip.id}
                    title={trip.Trip.title}
                    price={[
                      trip.Trip.travel_amount,
                      trip.Trip.accommodation_amount,
                      trip.Trip.miscellaneous_amount,
                    ]}
                    destination={trip.Trip.destination}
                    date={trip.Trip.start_date}
                    image={trip.Trip.images[0]}
                    buddies={trip.Trip.joined_buddies}
                    slug={trip.Trip.slug}
                    options
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-24 md:flex justify-between max-w-3xl">
              <div>
                <h1 className="text-2xl md:text-5xl font-circular-bold text-black-light">
                  You have not joined any trips yet 🤨
                </h1>
                <p className="md:text-2xl max-w-sm pt-4">
                  Waypal helps you find the best trips with the best buddies!
                </p>
                <div className="pt-7">
                  <Link href="/search">
                    <a>
                      <Button btnText="Explore trips" btnType="fill" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <Icon icon="luggage-large" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PastTrips;
