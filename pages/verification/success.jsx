import Button from "../../components/common/Button";
import SuccessAnimation from "../../components/SuccessAnimation";

const VerificationSuccess = () => {
  return (
    <div className="verification-success container text-center">
      <div className="">
        <SuccessAnimation />
      </div>
      <div className="title mt-6">
        <h1 className="text-26 font-circular-black md:text-40">
          Account verified
        </h1>
        <p className="pt-6 text-xl text-black-content">
          Your Waypal identity verification was successful!
        </p>
      </div>
      <div className="mt-6">
        <Button btnText="Go to dashboard" btnType="fill" btnStyle="px-5 py-3" />
      </div>
    </div>
  );
};

export default VerificationSuccess;
