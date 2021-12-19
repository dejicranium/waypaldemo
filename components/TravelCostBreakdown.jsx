import { formatCurrency } from "../assets/js/utils";

const TravelCostBreakdown = ({ currency, accommodation, misc, travel, total }) => {

  const calculateTotal = () => {
    return accommodation + misc + travel;
  }
  return (
    <div className="">
      <h2 className="font-circular-bold text-2xl">Travel Cost Breakdown</h2>
      <div className="cost-breakdown  flex, flex-col mt-5">
        <div className="travel border-r md:border-0 flex flex-row justify-between">
          <p className="">Travel</p>
          <p className="text">
            <span className="text-sm relative ">{formatCurrency(currency)}</span>
            {travel}
          </p>
        </div>
      </div>

        <div className="cost-breakdown  flex, flex-col mt-1">
          <div className="travel border-r md:border-0 flex flex-row justify-between">
            <p className=" ">Accommodation</p>
            <p className="text">
              <span className="text-sm relative ">{formatCurrency(currency)}</span>
              {accommodation}
            </p>
          </div>
        </div>

        <div className="cost-breakdown flex, flex-col mt-1">
          <div className="travel border-r md:border-0 flex flex-row justify-between">
            <p className="">Miscellaneous</p>
            <p className="text">
              <span className="text-sm relative ">{formatCurrency(currency)}</span>
              {misc}
            </p>
          </div>
        </div>
        <div className="cost-breakdown flex, flex-col mt-1">
          <div className="travel border-r md:border-0 flex flex-row justify-between">
            <p className="  ">Subtotal</p>
            <p className="text">
              <span className="text-sm relative ">{formatCurrency(currency)}</span>
              {travel}
            </p>
          </div>
        </div>

        <div className="cost-breakdown flex, flex-col mt-1">
          <div className="travel border-r md:border-0 flex flex-row justify-between">
            <p className="">Taxes and fees</p>
            <p className="">
              <span className="text relative ">{formatCurrency(currency)}</span>
              {0}
            </p>
          </div>
        </div>
        <div className="cost-breakdown flex, flex-col mt-3">
          <div className="travel flex flex-row justify-between pt-5 pb-5 border border-t border-l-0 border-r-0 ">
            <p className="">Total and fees</p>
            <p className="">
              <span className="text relative ">{formatCurrency(currency)}</span>
               {misc + travel + accommodation}
            </p>
          </div>
        </div>

        <div>

        </div>
      </div>
     
  );
};

export default TravelCostBreakdown;
