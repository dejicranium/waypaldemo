import {useRouter} from 'next/router';


const TripCard = (props) => {
  const {push} = useRouter();
  function goToTrip() {
    push(`/trip/${props.trip.slug}`)
  }
  const trip = props.trip
  return (
    <div onClick={goToTrip} className="trip-card-container flex-none rounded-xl overflow-hidden mb-6 w-100 md:w-400">
      <div className={""}>
        <div
          className={"pt-5/8 bg-cover"}
          style={{  backgroundImage: `url(${props.trip && props.trip.images && props.trip.images[0] ||'/landscape.jpg' })` }}
        ></div>
        <div className="trip-card-content p-4 flex justify-between items-start">
          <div className="location text-gray-light4">
            <p className="text-lg font-bold">{trip.destination}</p>
            <small>{trip.description}</small>
          </div>
          <p className="price text-lg font-bold text-gray-light4">{trip.currency + " " +trip.travel_amount}</p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
