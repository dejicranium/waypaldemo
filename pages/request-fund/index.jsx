import Icon from "../../components/common/Icon";
import InputField from "../../components/InputField";
import Button from "../../components/common/Button";
import WaypalFooter from "../../components/WaypalFooter";
import Link from "next/link";

const RequestFund = () => {
  return (
    <>
      <div className="container md:flex justify-between items-center space-x-4 md:mt-16">
        <div className="request-fund-form text-black-light max-w-lg">
          <h1 className="font-circular-bold text-2xl">Request for fund</h1>
          <h2 className="font-circular-black text-5xl md:text-64 pt-3">
            $41,792.00
          </h2>
          <p className="text-gray-light4 pt-2">
            Balance for trip “Paraty, Rio de Janeiro
          </p>

          <div className="pt-6">
            <form>
              <InputField type="text" className="mb-3" placeholder="Receiving Bank" />
              <InputField type="text" placeholder="Account number"  
                helptext={errors.lastname && errors.lastname.message}
                    helptextstyle={errors.lastname && "text-red-500"}/>
              <InputField type="text" placeholder="Personalized note" />

              <div className="">
                <p className="text-lg text-gray-light4 font-circular-bold">
                  Transaction fee: $38
                </p>
              </div>

              <div className="mt-7 flex items-center">
                <Button
                  btnText="Cancel"
                  btnType="plain"
                  btnStyle="text-orange font-circular-bold pr-9"
                />
                <Link href="/request-fund/success">
                  <a>
                    <Button btnText="Request for fund" btnType="fill" />
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="money-bag hidden md:block">
          <Icon icon="money-bag" />
        </div>
      </div>
      <WaypalFooter />
    </>
  );
};

export default RequestFund;
