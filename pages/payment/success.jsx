import Button from "../../components/common/Button";
import ShareTrip from "../../components/ShareTrip";
import WaypalFooter from "../../components/WaypalFooter";
import SuccessAnimation from "../../components/SuccessAnimation";

const PaymentSuccess = () => {
  return (
    <>
      <section className="">
        <div className="payment-successful container text-center">
          <div className="">
            <SuccessAnimation />
          </div>
          <div className="title mt-6">
            <h1 className="text-2xl font-circular-black">
              Payment successful!
            </h1>
            <p className="mt-6 md:max-w-md mx-auto text-xl text-black-content">
              Felix has received your payment and will be in touch with the next
              steps. We’ve sent you an email with all the details for the trip.
            </p>
          </div>
          <div className="mt-6">
            <ShareTrip />
          </div>
          <div className="mt-6 flex items-center justify-between max-w-xxs mx-auto">
            <Button btnText="See trip details" btnType="fill"></Button>
            <Button
              btnText="Go to homepage"
              btnType="plain"
              btnStyle="text-orange font-circular-bold"
            ></Button>
          </div>
        </div>
      </section>
      <WaypalFooter />
    </>
  );
};

export default PaymentSuccess;
