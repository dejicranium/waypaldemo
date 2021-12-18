import Icon from "./common/Icon";
import Button from "./common/Button";
import { useState, useEffect } from "react";
import { getRequest } from "../actions/connection";
import Datetime from "react-datetime";
import moment from "moment";

import useData from "../components/hooks/useData";
import { useForm, Controller } from "react-hook-form";

const SearchBar = (props) => {
  const [destination, setDestination] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('destination') : "");
  const [travelDate, setTravelDate] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('travel_date') : "")
  const [buddies, setBuddies] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('buddies') : "");
  const {
    dispatch,
  } = useData();
 
  useEffect(() => {
    //alert(new URLSearchParams(window.location.search))
  }, [])
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
                className: "outline-none box-border text-black-content w-full pl-3",
              }}
              onChange={(v) => {
                setTravelDate(v.format("YYYY-MM-DD"));
              }}
              initialValue={travelDate ? moment(travelDate).format('YYYY-MM-DD'): ""}
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
         // dispatch({topSearchResults: []})
          let query = {destination, travel_date: travelDate, buddies}; 
          let query_string = ""
          

          Object.keys(query).forEach((key, i)=> {
            if (query[key]){
              if (!query_string) query_string += `?${key}=${query[key]}&`
              else query_string += `${key}=${query[key]}`
            }
          })
          
          await getRequest('/search' + query_string).then(response => {
            dispatch({topSearchResults: response.data.items})
          }).catch(e=> {
          })

        }} btnType="fill" />
      </div>
    </div>
  );
};

export default SearchBar;
