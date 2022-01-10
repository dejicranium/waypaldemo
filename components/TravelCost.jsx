import { useState, useEffect } from "react";
import Icon from "./common/Icon";
import { formatAmount } from "../assets/js/utils";
import { formatCurrency } from "../assets/js/utils";
import { getRequest } from "../actions/connection";
import useData from '../components/hooks/useData';

const TravelCost = ({ register, watch, refresh }) => {
  const t =
    watch("travel_amount") +
    watch("accommodation_amount") +
    watch("miscellaneous_amount");

    const {
      dispatch,
      data: { tax, user, isLoggedIn },
    } = useData();
    
  const currency = watch("currency", "USD");
  const [error, setError] = useState("")
  const [m_refresh, setRefresh] = useState(refresh);
  // const [currency, setCurrency] = useState("NGN");
  useEffect(async() => {
   

    if (m_refresh !== refresh) {
      if (!t) {
        setError("Total cost cannot be 0");
      }
      else {
        setError("")
      }
    }
  },[refresh])
  const travelDetails = [
    {
      title: "travel",
      name: "travel_amount",
      helptext: "This covers flight to-and-fro",
      icon: "travel",
    },
    {
      title: "accommodation",
      name: "accommodation_amount",
      helptext: "The total cost of accommodation",
      icon: "accommodation",
    },
    {
      title: "miscellaneous",
      name: "miscellaneous_amount",
      helptext: "This covers feeding, transportation etc.",
      icon: "misc",
    },
  ];

  return (
    <div>
      <div className="travel-cost-header flex items-center justify-between mb-3">
        <h1 className="text-black font-circular-bold">Travel cost</h1>
        <select
          id="currency"
          // onChange={(e) => setCurrency(e.target.value)}
          onChange={(e) => {
            currency.onChange(e);
          }}
          name="currency"
          className="currency-selector p-2 rounded cursor-pointer bg-orange text-white"
          {...register("currency")}
        >
          <option value="NGN">&#x20A6; NGN</option>
          <option value="USD">&#x24; USD</option>
          <option value="GBP">&#163; GBP</option>
        </select>
      </div>
      {error && (
        <small className={`text-red-500 block`}>{error}</small>
      )}

      <div className="travel-cost-container border-2 rounded-2xl border-outline divide-y-2 divide-outline">
        {travelDetails.map(({ title, name, helptext, icon }) => (
          <div
            className="flex justify-between items-center py-5 px-2"
            key={title}
          >
            <div className="flex">
              <Icon icon={icon} cname="pr-3 flex-none" />
              <div className="travel-text">
                <p className="capitalize">{title}</p>
                <small>{helptext}</small>
              </div>
            </div>
            <input
              placeholder={formatCurrency(currency)}
              defaultValue={0}
              className="border px-3 py-1 w-20 outline-none"
              {...register(name, {
                //required: true,
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
        ))}
      </div>
      
      <div className="total-fees mt-4">
        <div className="total flex justify-end font-circular-bold">
          <p className="pr-4">Total</p>
          <p>
            {formatCurrency(currency)}
            {formatAmount(t ? t + ((t / 100) * tax) : 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelCost;