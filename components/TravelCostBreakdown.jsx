import { formatCurrency } from "../assets/js/utils";

const TravelCostBreakdown = ({ currency, accommodation, misc, travel, total }) => {
  return (
    <div className="">
      <h2 className="font-circular-bold">Travel Cost Breakdown</h2>
      <div className="cost-breakdown border border-gray-light3 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 md:divide-x mt-1">
        <div className="travel border-r md:border-0">
          <p className="font-circular-black text-gray uppercase">Travel</p>
          <p className="text-2xl text black">
            <span className="text-sm relative bottom-2">{formatCurrency(currency)}</span>
            {travel}
          </p>
          <p className="text-xxs pt-4">This covers flight</p>
        </div>

        <div className="accommodation px-4">
          <p className="font-circular-black text-gray uppercase overflow-hidden overflow-ellipsis">
            Accommodation
          </p>
          <p className="text-2xl text black">
            <span className="text-sm relative bottom-2">{formatCurrency(currency)}</span>
            {accommodation}
          </p>
          <p className="text-xxs pt-4">The total cost of accommodation</p>
        </div>

        <div className="miscellaneous md:px-4 px-0 border-r md:border-0 mt-4 md:mt-0">
          <p className="font-circular-black text-gray uppercase overflow-hidden overflow-ellipsis">
            Miscellaneous
          </p>
          <p className="text-2xl text black">
            <span className="text-sm relative bottom-2">{formatCurrency(currency)}</span>
            {misc}
          </p>
          <p className="text-xxs pt-4">
            This covers feeding, transportation, etc.
          </p>
        </div>

        <div className="total px-4 mt-4 md:mt-0">
          <p className="font-circular-black text-gray uppercase">Total</p>
          <p className="text-2xl text black">
            <span className="text-sm relative bottom-2">{formatCurrency(currency)}</span>
            {total}
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
