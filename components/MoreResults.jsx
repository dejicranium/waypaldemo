import Icon from "./common/Icon";
import {useRouter} from 'next/router';

const MoreResults = (prop) => {
  const {push} = useRouter();
  function goToTrip() {
    push(`/trip/${prop.slug}`)
  }
  return (
    <div onClick={goToTrip} className="trip-card p-4 my-6 flex flex-col md:flex-row border rounded border-gray-light3">
      <div className="md:mr-5 md:w-1/4 flex-none">
        <div
          className="pt-2/3 bg-no-repeat bg-cover rounded"
          style={{ backgroundImage:  `url(${prop.trip.images && prop.trip.images[0] ? prop.trip.images[0]: "./landscape.png"})` }}
        ></div>
      </div>
      <div className="trip-card__details pt-4">
        <h2 className="text-black-content font-circular-black text-base md:text-2xl">
          <span className="">{prop.trip.destination}</span> - <span>${prop.trip.travel_amount + prop.trip.miscellaneous_amount + prop.trip.accommodation_amount }</span>
        </h2>
        {/*
        <>
        <p className="text-gray-light py-2">{prop.date}</p>
        {prop.trip &&  prop.trip.buddies && prop.trip.buddies.map((bud, i) => {
          <p>{bud}</p>;
        })}
      </> */}
      </div>
    </div>
  );
};

export default MoreResults;
