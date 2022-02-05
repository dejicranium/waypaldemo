import Icon from "./common/Icon";
import Button from "./common/Button";
import { useState, useEffect } from "react";
import { getRequest } from "../actions/connection";
import Datetime from "react-datetime";
import moment from "moment";
import Autocomplete from "react-google-autocomplete";

import useData from "../components/hooks/useData";
import { useForm, Controller } from "react-hook-form";

const SearchBar = (props) => {
  const [meeting_point, setMeetingPoint] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('meeting_point') || "" : "");
  const [destination, setDestination] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('destination') || "" : "");
  const [travelDate, setTravelDate] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('travel_date') || "" : "")
  const [buddies, setBuddies] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('buddies') || "": "");
  const {
    dispatch,
  } = useData();
 

  const search = async () => {
    props.setLoading(true)
    let query = {destination, travel_date: travelDate, buddies, meeting_point}; 
    let query_string = "";

    Object.keys(query).forEach((key, i)=> {
      if (query[key]){
        if (!query_string) query_string += `?${key}=${query[key]}&`
        else query_string += `${key}=${query[key]}&`
      }
    })

    const new_url = window.location.origin + window.location.pathname + query_string;
    window.history.pushState({}, null, new_url)
    
    await getRequest('/search' + query_string).then(response => {
      dispatch({topSearchResults: response.data})
      props.setLoading(false)

    }).catch(e=> {
      props.setLoading(false)
    })
  }
  return (
    <div className="flex">
      <div className="flex flight-search bg-white rounded max-w-3xl border border-gray-light6 divide-x">
        <div className="destination flex items-center pl-3">
          <Icon icon="departure" cname="pt-1" />
          <input 
            type="text"
            id="search-bar-destination"
            style={{ width: "100%" }}
            placeholder="Destination"
            defaultValue={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            onClick={(e) => {
              //e.preventDefault();
              e.stopPropagation();
              let input = document.getElementById('search-bar-destination');
              if (input instanceof HTMLInputElement) {
                let complete = new google.maps.places.Autocomplete(input, {
                  fields: ['name'] 
                });
                google.maps.event.addListener(complete, 'place_changed', function () {
                  let place = complete.getPlace();

                  let address = place.name;
                  //input.value = address;
                  setDestination(address);
                })
              }
            }}
            className="destination-input outline-none box-border text-black-content w-full pl-3"
            
          />
        
        </div>
        <div className="destination flex items-center pl-3">
          <Icon icon="meeting-point" cname="pt-1" />
          <input 
            type="text"
            id="meetingpoint-searchbar"
            style={{ width: "100%" }}
            placeholder="Meeting Point"
            onChange={(e) => setMeetingPoint(e.target.value)}
            defaultValue={meeting_point}
            onClick={(e) => {
              //e.preventDefault();
              e.stopPropagation();
              let input = document.getElementById('meetingpoint-searchbar');
              if (input instanceof HTMLInputElement) {
                let complete = new google.maps.places.Autocomplete(input, {
                  fields: ['name'] 
                });
                google.maps.event.addListener(complete, 'place_changed', function () {
                  let place = complete.getPlace();

                  let address = place.name;
                  //input.value = address;
                  setMeetingPoint(address);
                })
              }
            }}
            className="destination-input outline-none box-border text-black-content w-full pl-3"
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
                try {

                  setTravelDate(v.format("YYYY-MM-DD"));
                }catch(e) {
                  
                }
              }}
              initialValue={travelDate ? moment(travelDate).format('YYYY-MM-DD'): ""}
              isValidDate={(current) => current.isAfter(moment())}
            />
        </div>
        
      </div>
      <div className="search-button">
        <Button btnText="Search" onClick={search} btnType="fill" />
      </div>
    </div>
  );
};

export default SearchBar;
