import SimpleTripCard from "./SimpleTripCard";

const RecommendedTrips = ({trips}) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl text-gray-light4 font-circular-bold mb-7">
        Other trips you might like
      </h3>
      {trips && trips.length > 0 && trips.map((item, index) => {
        return (
          <>
            <SimpleTripCard trip={trip} />
            <SimpleTripCard trip={trip} />
          </>
        )
      })}
    </div>
  );
};

export default RecommendedTrips;
