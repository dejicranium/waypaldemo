import Icon from "./common/Icon";
import useData from "./hooks/useData";
import { formatCurrency, formatAmount } from "../assets/js/utils";

const PaymentBreakdown = ({
  travel_amount,
  accommodation_amount,
  miscellaneous_amount,
  currency
}) => {
  const travelDetails = [
    {
      title: "Travel",
      icon: "travel",
      helptext: "This covers flight to-and-fro",
      amount: travel_amount,
    },
    {
      title: "Accommodation",
      icon: "accommodation",
      helptext: "The total cost of accommodation",
      amount: accommodation_amount,
    },
    {
      title: "Miscellaneous",
      icon: "misc",
      helptext: "This covers feeding, transportation etc.",
      amount: miscellaneous_amount,
    },
  ];

  const subTotal = travelDetails.reduce((acc, obj) => acc + obj.amount, 0);

  const taxes = ((subTotal / 100) * 7.5).toFixed(2);

  const total = subTotal + (subTotal / 100) * 7.5;

  return (
    <div>
      <h1 className="text-black mb-3 font-circular-bold text-right">
        Payment Breakdown
      </h1>
      <div className="payment-breakdown-container border-2 rounded-2xl border-outline divide-y-2 divide-outline">
        {travelDetails.map(({ title, helptext, icon, amount }) => (
          <div className="flex justify-between py-5 px-2" key={title}>
            <div className="flex">
              <Icon icon={icon} cname="pr-3" />
              <div className="travel-text">
                <p className="">{title}</p>
                <small>{helptext}</small>
              </div>
            </div>
            <p className="">
              {formatCurrency(currency)}
              {formatAmount(amount)}
            </p>
          </div>
        ))}
      </div>
      <div className="total-fees mt-4">
        <div className="subtotal flex justify-end">
          <p className="pr-4">Subtotal</p>
          <p className="">
            {formatCurrency(currency)}
            {formatAmount(subTotal)}
          </p>
        </div>
        <div className="taxes flex justify-end">
          <p className="pr-4">Taxes and Fees</p>
          <p className="">
            {formatCurrency(currency)}
            {formatAmount(taxes)}
          </p>
        </div>
        <div className="total flex justify-end font-circular-bold">
          <p className="pr-4">Total</p>
          <p>
            {formatCurrency(currency)}
            {formatAmount(total)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
