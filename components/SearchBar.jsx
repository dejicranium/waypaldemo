import Icon from "./common/Icon";
import Button from "./common/Button";
import { useState } from "react";
import { getRequest } from "../actions/connection";
import Datetime from "react-datetime";
import moment from "moment";

import useData from "../components/hooks/useData";
import { useForm, Controller } from "react-hook-form";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [buddies, setBuddies] = useState("");
  const {
    dispatch,
  } = useData();
 
  return (
    <div className="flex">
      <div className="flex flight-search bg-white rounded max-w-3xl border border-gray-light6 divide-x">
        <div className="destination flex items-center pl-3">
          <Icon icon="departure" cname="pt-1" />
          <input
            value={destination}
            placeholder="Destination"
            onChange={(e) => {
              setDestination(e.target.value)
            }}
            className="outline-none box-border text-black-content w-full pl-3"
          />
        </div>
        <div className="travel-date flex items-center pl-4">
          <Icon icon="calendar-date" cname="pt-1" />
          <Datetime
              closeOnSelect
              timeFormat={false}
              dateFormat="YYYY-MM-DD"
              inputProps={{
                placeholder: "Travel date",
                className: "input-element w-full mb-3 md:mb-0",
              }}
              onChange={(v) => {
                setTravelDate(v.format("YYYY-MM-DD"));
              }}
              initialValue={moment().format("YYYY-MM-DD")}
              isValidDate={(current) => current.isAfter(moment())}
            />
        </div>
        <div className="destination flex items-center pl-3">
          <Icon icon="person" cname="pt-1" />
          <input
            placeholder="Buddies"
            value={buddies}
            onChange={(e) =>{
              setBuddies(e.target.value);
            }}
            className="outline-none box-border text-black-content w-full pl-3"
          />
        </div>
      </div>
      <div className="search-button">
        <Button btnText="Search" onClick={async() => {
          dispatch({topSearchResults: []})
          let query = ''; 
          if (destination) query +=  `?destination=${destination}&`
          if (travelDate) query +=  `?travel_date=${travelDate}&`
          if (buddies) query +=  `?no_of_travel_buddies=${buddies}&`
          await getRequest('/search' + query).then(response => {
            dispatch({topSearchResults: response.data.items})
          }).catch(e=> {
          })

        }} btnType="fill" />
      </div>
    </div>
  );
};

export default SearchBar;
