import Icon from "./common/Icon";
import {useRouter} from 'next/router';
import moment from 'moment';

const MoreResults = (prop) => {
  const {push} = useRouter();
  function goToTrip() {
    push(`/trip/${prop.trip.slug}`)
  }
  return (
    <div onClick={goToTrip} className="trip-card cursor-pointer p-4 my-2 flex flex-col md:flex-row border rounded border-gray-light3">
      <div className="md:mr-5 md:w-1/4 flex-none">
        <div
          className="pt-2/3 bg-no-repeat bg-cover rounded"
          style={{ backgroundImage:  `url(${prop.trip.images && prop.trip.images[0] ? prop.trip.images[0]: "./landscape.png"})` }}
        ></div>
      </div>
      <div className="trip-card__details w-8/12">
        <h2 className="text-black-content font-circular-black text-base md:text-2xl flex justify-between">
          <span className="">{prop.trip.destination}</span> 
          <span className="">${prop.trip.travel_amount + prop.trip.miscellaneous_amount + prop.trip.accommodation_amount }</span>

        </h2>
        <div className="flex justify-between">
          <span className=" text-gray">{moment(prop.trip.start_date).format("dddd, MMMM DD, YYYY")}</span>
          <span className=" text-gray">{prop.trip.buddies} buddies</span>
        </div>
        <div>
        <div className="buddies-checklist mt-10">
          <div className="buddies-list grid md:grid-cols-3 md:gap-8 grid-cols-2">
            {prop.trip.checklists && prop.trip.checklists.map((item, index) => (
              <div className="flex items-center" key={index}>
                <Icon icon="checkmark" cname="flex-none" />
                <p className="pl-1 whitespace-nowrap text-gray">{item}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      {/*
      
      <div className="flex-col flex w-3/12">
        <h2 className="text-black-content font-circular-black text-base md:text-2xl flex justify-between">
          <span>${prop.trip.travel_amount + prop.trip.miscellaneous_amount + prop.trip.accommodation_amount }</span>
        </h2>
        <span className="text-sm">{prop.trip.buddies} buddies</span>

      </div>
      */}
     
    </div>
  );
};

export default MoreResults;
