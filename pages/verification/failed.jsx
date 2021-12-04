import Button from "../../components/common/Button";
import FailedAnimation from "../../components/FailedAnimation";

const VerificationFailed = () => {
  return (
    <div className="verification-failed container text-center">
      <div className="">
        <FailedAnimation />
      </div>
      <div className="title mt-6">
        <h1 className="text-26 font-circular-black md:text-40">
          Verification failed
        </h1>
        <p className="mt-6 md:max-w-md mx-auto text-xl text-black-content">
          We couldn’t complete your identity verification. You can retry it
          again.
          <span className="pt-10 block text-center">
            If you’re having issues with completing your identity verification,
            get in touch with us at hello@waypal.co
          </span>
        </p>
      </div>
      <div className="mt-6">
        <Button
          btnText="Retry identity verification"
          btnType="fill"
          btnStyle="px-5 py-3"
        />
      </div>
    </div>
  );
};

export default VerificationFailed;
