import { formatCurrency } from "../assets/js/utils";

const PriceBreakdown = ({ trip }) => {
  const amount = [
    trip.travel_amount,
    trip.accommodation_amount,
    trip.miscellaneous_amount,
  ];

  const subTotal = amount.reduce((acc, obj) => acc + obj, 0);

  const taxes = ((subTotal / 100) * 7.5).toFixed(2);

  return (
    <div>
      <h3 className="text-black-content text-2xl font-bold">Price Breakdown</h3>
      <div className="price-table pb-3 mt-6 text-black-content text-lg max-w-xs">
        <div className="flex justify-between">
          <div className="pb-3">Travel</div>
          <div className="pl-28">
            {formatCurrency(trip.currency)}
            {trip.travel_amount}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="pb-3">Accommodation</div>
          <div className="pl-28">
            {formatCurrency(trip.currency)}
            {trip.accommodation_amount}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="pb-3">Miscellaneous</div>
          <div className="pl-28">
            {formatCurrency(trip.currency)}
            {trip.miscellaneous_amount}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="pb-3">Subtotal</div>
          <div className="pl-28">
            {formatCurrency(trip.currency)}
            {subTotal}
          </div>
        </div>
        <div className="flex justify-between border-b">
          <div className="pb-3">Taxes and Fees</div>
          <div className="pl-28">
            {formatCurrency(trip.currency)}
            {taxes}
          </div>
        </div>
        <div className="flex justify-between pt-3 border-b">
          <p className="pb-3">Total Amount</p>
          <p className="pl-28 font-bold">
            {formatCurrency(trip.currency)}
            {parseFloat(trip.accommodation_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.travel_amount) + parseFloat(taxes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
