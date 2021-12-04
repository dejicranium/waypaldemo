import Button from "../../components/common/Button";

const VerifyIdentity = () => {
  return (
    <div className="verify-identity container text-center mt-16">
      <div className="title">
        <h1 className="text-26 font-circular-black md:text-40">
          Verify your account.
        </h1>
        <p className="mt-8 text-xl text-black-content md:max-w-md mx-auto">
          Identity verification it to make sure that every travel is who they
          say they are and to helps us keep waypal and every travel buddy safe.
        </p>
      </div>
      <div className="mt-11">
        <Button
          btnText="Verify your identity"
          btnType="fill"
          btnStyle="px-5 py-3"
        />
      </div>
    </div>
  );
};

export default VerifyIdentity;
