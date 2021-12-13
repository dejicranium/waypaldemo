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
        <section className="lg:max-w-xl xl:max-w-3xl">
          <div className="">
            <p className="requestfund-header text-black">Request for fund</p>
            <p className="requestfund-amount text-black">$41,792.00</p>
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
          
        </section>

        <section className="recommended-trips hidden lg:block flex-none min-w-400">
          {/*<RecommendedTrips />*/}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RequestFund;
