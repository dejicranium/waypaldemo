import Link from "next/link";
import useData from "../../components/hooks/useData";

import ShareTrip from "../../components/ShareTrip";
import Button from "../../components/common/Button";
import Footer from "../../components/common/Footer";
import SuccessAnimation from "../../components/SuccessAnimation";
import Mixpanel from "../../assets/js/mixpanel";
import { useEffect } from 'react';
const CreateSuccess = () => {
  const {
    data: { currentTrip, user },
  } = useData();

  useEffect(() => {
    if (typeof user !== 'undefined') {
      Mixpanel.identify(user.id);
      Mixpanel.track('trip-created-successfully',{
        trip_id: currentTrip.id,
        trip_title: currentTrip.title,
        trip_destination: currentTrip.destination,
        trip_total_amount: parseFloat(currentTrip.travel_amount) + parseFloat(currentTrip.miscellaneous_amount) + parseFloat(currentTrip.accommodation_amount),                        
      })
    }
  })

  return (
    <>
      <div className="payment-successful container text-center">
        <div className="">
          <SuccessAnimation />
        </div>
        <div className="title mt-6">
          <h1 className="text-2xl font-circular-black">
            Trip created successfully!
          </h1>
          <p className="mt-6 md:max-w-md mx-auto text-xl text-black-content">
            Your trip has been created successfully. We’ve sent an email with
            your trip details and will notify you when your travel buddies are
            complete.
          </p>
        </div>
        <div className="mt-6">
          <ShareTrip trip={currentTrip} />
        </div>
        <div className="mt-6 flex items-center justify-between max-w-xxs mx-auto">
          <Link href={`/dashboard/trips`}>
          <a>
            <Button btnText="See trip details" btnType="fill"></Button>
          </a>
          </Link>

          <Link href="/">
            <a>
              <Button
                btnText="Go to homepage"
                btnType="plain"
                btnStyle="text-orange font-circular-bold"
              ></Button>
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateSuccess;
