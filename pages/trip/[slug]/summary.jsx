import Toast from "../../../components/Toast";
import JoinChat from "../../../components/JoinChat";
import ShareTrip from "../../../components/ShareTrip";
import PriceBreakdown from "../../../components/PriceBreakdown";
import RecommendedTrips from "../../../components/RecommendedTrips";
import Button from "../../../components/common/Button";
import Icon from "../../../components/common/Icon";
import { useState } from "react";
import { getRequest } from "../../../actions/connection";
import useData from "../../../components/hooks/useData";
import moment from "moment";

import Footer from "../../../components/common/Footer";

const TripSummary = ({trip, similar}) => {
  const [message, setMessage] = useState(null);
  const {
    dispatch,
     data: { currentTrip, user },
   } = useData();
  return (
    <>
      <div className="travel-success container lg:flex space-x-8 justify-between mt-14">
        <section className="lg:max-w-xl xl:max-w-3xl">
          <div className="">
            <Toast
              type="success"
              message={
                "Your flight has been booked successfully! Your confirmation number is #381029404387"
              }
              close={() => setMessage(null)}
            />
          </div>
          <div className="header mt-6">
            <h3 className="text-orange font-circular-bold text-2xl">
              Bon Voyage, {user && user.firstname}!
            </h3>
            <p className="text-gray-light4 text-lg">
              Thank you for booking your travel with Waypal! Below is a summary
              of your trip with {trip.user.firstname} to {trip.destination}. We’ve
              sent your trip details to your email address. You can also find
              this page again in <span className="text-orange">My trips</span>.
            </p>
          </div>

          <div className="trip-summary mt-8">
            <h3 className="text-gray-light4 font-circular-bold text-2xl">
              Trip Summary
            </h3>
            <h4 className="text-gray-light4 pt-4">
              {trip.title}
            </h4>
            <div className="trip-summary-card border border-gray-light-6 rounded-md p-6 mt-6">
              <div className="flex justify-between border-b border-gray-light6">
                <div className="airline">
                  <Icon icon="airline"></Icon>
                </div>
                <div className="summary-details md:grid grid-cols-3 gap-10 justify-items-center pb-5">
                  <div className="departure-date">
                    <p>{moment(trip.start_date).format("dddd, MMM DD, YYYY")}</p>
                    <p className="text-gray-light2">Departure date</p>
                  </div>
                  <div className="return-date pt-6 md:p-0">
                    <p>{moment(trip.end_date).format("dddd, MMM DD, YYYY")}</p>
                    <p className="text-gray-light2">Return date</p>
                  </div>
                  <div className="departure-date py-6 md:p-0">
                    <p>$ {trip.travel_amount + trip.miscellaneous_amount + trip.accommodation_amount}</p>
                    <p className="text-gray-light2">Trip cost</p>
                  </div>
                </div>
              </div>
              <div className="meeting-point pt-6">
                <h3 className="font-bold">Meeting Point</h3>
                <p className="text-black-content">
                  {trip.meeting_point}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <JoinChat trip={trip}/>
          </div>

          <div className="price-breakdown mt-20">
            <PriceBreakdown trip={trip} />
          </div>
          <div className="share-trip mt-10 mx-0 px-0">
            {/*<Button btnType="fill" btnText="Share trip" />*/}
            <ShareTrip cname="mx-0 px-0" trip={trip} />
          </div>
        </section>

        <section className="recommended-trips hidden lg:block flex-none min-w-400">

              <RecommendedTrips trips={similar} />

        </section>
      </div>
      <Footer />
    </>
  );
};

export default TripSummary;


export async function getServerSideProps(context) {
  const { slug } = context.query;

  const tripData =  await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`);
  //console.log(tripData)
  if (tripData.status) {
    const similar = await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/search?destination=` + tripData.data.destination)
    return {
      props: {
        trip: tripData.data,
        similar: similar.data,
      },
    };
  }
  return {
    props: {
      notFound: true,
    },
  };
}