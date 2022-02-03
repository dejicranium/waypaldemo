import { formatCurrency, formatAmount } from "../assets/js/utils";

const TravelCostBreakdown = ({ currency, accommodation, misc, travel, total }) => {
  return (
    <div className="">
      <h2 className="font-circular-bold">Travel Cost Breakdown</h2>
      <div className="cost-breakdown border border-gray-light3 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-2 md:divide-x mt-1">
        <div className="travel border-r md:border-0">
          <p className="font-circular-black text-gray uppercase">Travel</p>
          <p className="text-2xl text black">
            <span className="text-2xl">{formatCurrency(currency)}</span>
            {formatAmount(travel)}
          </p>
          <p className="text-xxs pt-4">This covers logistics to-and-fro per individual</p>
        </div>

        <div className="accommodation px-4">
          <p className="font-circular-black text-gray uppercase overflow-hidden overflow-ellipsis">
            Accommodation
          </p>
          <p className="text-2xl text black">
            <span className="text-2xl">{formatCurrency(currency)}</span>
            {formatAmount(accommodation)}
          </p>
          <p className="text-xxs pt-4">The total cost of accommodation per individual</p>
        </div>

        <div className="travel mt-4 md:mt-0 border-r md:border-0">
          <p className="font-circular-black text-gray uppercase overflow-hidden overflow-ellipsis">
            Miscellaneous
          </p>
          <p className="text-2xl text black">
            <span className="text-2xl">{formatCurrency(currency)}</span>
            {formatAmount(misc)}
          </p>
          <p className="text-xxs pt-4">
          This covers feeding and other miscellaneous acitivies as stated by the trip creator in the description          </p>
        </div>

        <div className="total px-4 mt-4 md:mt-0">
          <p className="font-circular-black text-gray uppercase">Total</p>
          <p className="text-2xl text black">
            <span className="text-2xl ">{formatCurrency(currency)}</span>
            {formatAmount(total)}
          </p>
          <p className="text-xxs pt-4">
            This is the total cost to travel with James
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelCostBreakdown;