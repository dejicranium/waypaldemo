import Link from "next/link";
import Button from "../../components/common/Button";
import Footer from "../../components/common/Footer";
import SuccessAnimation from "../../components/SuccessAnimation";

const RequestFundSuccess = () => {
  return (
    <>
      <div className="payment-successful container text-center">
        <div className="">
          <SuccessAnimation />
        </div>
        <div className="title mt-6">
          <h1 className="text-2xl font-circular-black">Fund successfully!</h1>
          <p className="mt-6 md:max-w-md mx-auto text-xl text-black-content">
            Your trip has been funded successfully. We’ve sent an email with
            your trip details and will notify you when your funds are complete.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between max-w-xxs mx-auto">
          <Link href="/trip">
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

export default RequestFundSuccess;
