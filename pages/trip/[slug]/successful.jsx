import Link from "next/link";
import { useRouter } from "next/router";
import useData from "../../../components/hooks/useData";

import ShareTrip from "../../../components/ShareTrip";
import Button from "../../../components/common/Button";
import SuccessAnimation from "../../../components/SuccessAnimation";

const PaymentSuccessful = () => {
  const {
    data: { currentTrip },
  } = useData();

  return (
    <>
      <div className="payment-successful container text-center">
        <div className="">
          <SuccessAnimation />
        </div>
        <div className="title mt-6">
          <h1 className="text-2xl font-circular-black">Payment Successful!</h1>
        </div>
        <div className="mt-6">
          <ShareTrip trip={currentTrip} />
        </div>
        <div className="mt-6 flex items-center justify-between max-w-xxs mx-auto">
          <Link href={`/dashboard/trips?intent=createdtrip`}>
            <a>
          <Button btnText="See trip details" btnType="fill" />
          </a>
          </Link>
          <Link href="/">
            <a>
              <Button
                btnText="Go to homepage"
                btnType="plain"
                btnStyle="text-orange font-circular-bold"
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessful;
