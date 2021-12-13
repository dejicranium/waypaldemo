import Icon from "./common/Icon";
import Button from "./common/Button";
import DetailTripCard from "./DetailTripCard";

const HostedTrips = ({ trips, error }) => {
  return (
    <>
      {error ? (
        <p>An error ocurred</p>
      ) : (
        <>
          {trips?.items?.length > 0 ? (
            <div className="pt-5">
              <h1 className="text-2xl font-circular-bold">Hosted trips</h1>
              <div className="trip-cards max-w-3xl">
                {trips.items.map((trip) => (
                  <DetailTripCard
                    key={trip.id}
                    title={trip.title}
                    destination={trip.destination}
                    date={trip.start_date}
                    image={trip.images && trip.images[0] ? trip.images[0]: ""}
                    buddies={trip.joined_buddies}
                    price={[
                      trip.travel_amount,
                      trip.accommodation_amount,
                      trip.miscellaneous_amount,
                    ]}
                    slug={trip.slug}
                    options
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-24 md:flex justify-between max-w-3xl">
              <div>
                <h1 className="text-2xl md:text-5xl font-circular-bold text-black-light">
                  Plan your first trip
                </h1>
                <p className="md:text-2xl max-w-sm pt-4">
                  Plan, organize, and map your itineraries on waypal and invite
                  your friends and aquintances.
                </p>
                <div className="pt-7">
                  <Button btnText="Create a trip" btnType="fill" />
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

export default HostedTrips;
