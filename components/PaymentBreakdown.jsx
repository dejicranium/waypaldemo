import Icon from "./common/Icon";
import useData from "./hooks/useData";
import { formatCurrency, formatAmount } from "../assets/js/utils";
import { useState, useEffect} from 'react';
import { getRequst } from '../actions/connection';

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
      helptext: "This covers logistics to-and-fro per individual",
      amount: travel_amount,
    },
    {
      title: "Accommodation",
      icon: "accommodation",
      helptext: "The total cost of accommodation per individual",
      amount: accommodation_amount,
    },
    {
      title: "Miscellaneous",
      icon: "misc",
      helptext: "This covers feeding and other miscellaneous acitivies as stated by the trip creator in the description",
      amount: miscellaneous_amount,
    },
  ];

  const {
    dispatch,
    data: {tax},
  } = useData();



  const fixDivision = (num) => {
    num = num.toString();
    if (num.indexOf('.') > -1) {
      const index_of_dot = num.indexOf('.');
      const after_dot = num.substring(index_of_dot + 1, 4);
      const significant = num.substring(0, index_of_dot);
      return Number.parseFloat(significant +'.' +after_dot);
    }

    return Number.parseFloat(num).toPrecision(2)
  }

  const subTotal = travelDetails.reduce((acc, obj) => acc + obj.amount, 0);
  const taxes = fixDivision((subTotal / 100) * tax);

  const total = parseFloat(subTotal) + parseFloat(taxes);

  useEffect(async() => {
  }, [])

  return (
    <div>
      <h1 className="text-black mb-3 font-circular-bold text-right">
        Payment Breakdown
      </h1>
      <div className="payment-breakdown-container border-2 rounded-2xl border-outline divide-y-2 divide-outline">
        {travelDetails.map(({ title, helptext, icon, amount }) => (
          <div className="flex justify-between py-5 px-2" key={title}>
            <div className="flex">
              {title && title === "Miscellaneous" && (
                <Icon icon={icon} cname="pr-3 travelicons" />

              )} 
              {title && title !== "Miscellaneous" && (
                <Icon icon={icon} cname="pr-3" />

              )} 
              <div className="travel-text">
                <p className="capitalize">{title}</p>
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
