import Icon from "./common/Icon";
import {useRouter} from 'next/router';
import moment from 'moment';
import useData from './hooks/useData';
import {formatCurrency, formatAmount} from '../assets/js/utils'

const MoreResults = (prop) => {
  const {push} = useRouter();

  const {
    dispatch,
     data: { currentTrip, user, tax },
   } = useData();


  function goToTrip() {
    push(`/trip/${prop.trip.slug}`)
  }

  const total = prop.trip.travel_amount + prop.trip.miscellaneous_amount + prop.trip.accommodation_amount;
  const totalWithTaxes = total;

  return (
    <div onClick={goToTrip} className="trip-card cursor-pointer p-4 my-2 flex flex-col md:flex-row border rounded border-gray-light3">
      <div className="md:mr-5 md:w-1/4 flex-none">
        <div
          className="pt-2/3 bg-no-repeat bg-cover rounded"
          style={{ backgroundImage:  `url(${prop.trip.images && prop.trip.images.split(";")[0] ? prop.trip.images.split(";")[0]: "./landscape.png"})` }}
        ></div>
      </div>
      <div className="trip-card__details lg:w-8/12 sm:w-full md:w-full">
        <h2 className="text-black-content font-circular-black text-base md:text-2xl flex justify-between">
          <span className="">{prop.trip.title}</span> 
          <span className="">{formatCurrency(prop.trip.currency)}{formatAmount(parseFloat(totalWithTaxes).toFixed(2))}</span>

        </h2>
        <div className="flex  items-center">
          <Icon icon="location" cname="pr-2"></Icon>
          <span className=""> {prop.trip.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="">{moment(prop.trip.start_date).format("dddd, DD MMMM, YYYY")}</span>
          <span className="" style={{textAlign: 'right'}}>{prop.trip.buddies - prop.trip.joined_buddies} buddies left</span>
        </div>
        
        <div>
        <div className="buddies-checklist mt-5">
          <div className="buddies-list grid md:grid-cols-3 md:gap-2 grid-cols-2 ">
            {prop.trip.checklists && prop.trip.checklists.split(';').map((item, index) => (
              <div className="flex items-center" key={index}>
                <Icon icon="checkmark-grey" cname="flex-none" />
                <p className="pl-1 whitespace-nowrap text-gray">{item.trim()}</p>
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
