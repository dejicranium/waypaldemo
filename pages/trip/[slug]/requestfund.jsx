import Toast from "../../../components/Toast";
import JoinChat from "../../../components/JoinChat";
import PriceBreakdown from "../../../components/PriceBreakdown";
import RecommendedTrips from "../../../components/RecommendedTrips";
import Button from "../../../components/common/Button";
import Icon from "../../../components/common/Icon";
import { useState } from "react";
import InputField from './../../../components/InputField';
import Footer from "../../../components/common/Footer";

const RequestFund = () => {
  const [receivingBank, setReceivingBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [personalizedNote, setPersonalizedNoted] = useState(null);

  return (
    <>
      <div className="travel-success container lg:flex space-x-8 justify-between mt-14">
        <section className="lg:max-w-xl lg:w-5/12 sm:w-full xl:max-w-3xl">
          <div className="">
            <p className="requestfund-header">Request for fund</p>
            <p className="requestfund-amount">$41,792.00</p>
            <p className="requestfund-explanation text-black">Available balance for Rio trip</p>

            <InputField

            className="mb-3"
            onChange={(e) => setReceivingBank(e.target.value)}
            value={receivingBank}
            placeholder="Receiving Bank"
            //leadingicon="location-input"
          />
            <InputField

            className="mb-3"
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber}
            placeholder="Account Number"
            //leadingicon="location-input"
          />
            <InputField

            className="mb-3 h-100"
            onChange={(e) => setPersonalizedNoted(e.target.value)}
            value={personalizedNote}
            placeholder="Personalized Note"
            //leadingicon="location-input"
          />
          </div>
          <p className="requestfund-fee text-black">Transaction fee: </p>

          <div className="continue-to-itinerary mt-14 flex items-center container space-x-10 max-w-xs mx-auto">
            <p
              className="font-circular-bold text-orange cursor-pointer"
            >
              Cancel
            </p>
            <Button
              type="button"
              btnType="fill"
              btnText="Request for fund"
            />
          </div>
        </section>

        <section className="recommended-trips hidden lg:block flex-none min-w-400">
          <Icon icon="money-bag" cname="pr-2"></Icon>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RequestFund;
