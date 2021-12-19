import SimpleTripCard from "./SimpleTripCard";

const RecommendedTrips = (trip) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl text-gray-light4 font-circular-bold mb-7">
        Other trips you might like
      </h3>
      <SimpleTripCard trip={trip} />
      <SimpleTripCard trip={trip} />
    </div>
  );
};

export default RecommendedTrips;
