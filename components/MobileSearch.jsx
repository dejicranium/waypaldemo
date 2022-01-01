import Icon from "./common/Icon";
import Button from "./common/Button";
import SearchFilter from "./SearchFilter";
import useData from '../components/hooks/useData';
import { useState, useEffect } from "react";
import { getRequest } from '../actions/connection';
import Autocomplete from "react-google-autocomplete";

const MobileSearch = ({ show, close, setLoading }) => {
  const [destination, setDestination] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('destination') : "");
  const [travelDate, setTravelDate] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('travel_date') : "")
  const [buddies, setBuddies] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('buddies') : "");
  const { dispatch } = useData();
  return (
    <>
      {show ? (
        <div
          id="mobile-filter"
          className={`container h-screen overflow-y-scroll fixed z-20 top-4 left-0 bg-white`}
        >
          <div className="filter-header flex items-center">
            <Icon
              icon="back-arrow"
              cname="pr-8 cursor-pointer"
              handleClick={() => close(false)}
            />
            <h1 className="text-2xl text-black-light">Filter</h1>
          </div>

          <div className="search-input">
            <div className="destination input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="departure" />

              <Autocomplete
                apiKey="AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c"
                style={{ width: "100%" }}
                onPlaceSelected={(place) => {
                  let d = place.formatted_address;
                  setDestination(d)
                }}
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                placeholder="Destination"
                className="destination-input outline-none box-border text-black-content w-full pl-3"
              />
        
             
            </div>
            <div className="travel-date input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="calendar-date" />
              <input
                onChange={(e) => {
                  setTravelDate(e.target.value)
                }}
                placeholder="Travel date"
                className="outline-none box-border text-black-content w-full pl-3"
              />
            </div>
            <div className="destination input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="person" />
              <input
                onChange={(e) => {
                  setBuddies(e.target.value)
                }}
                placeholder="Buddies"
                className="outline-none box-border text-black-content w-full pl-3"
              />
            </div>

            <div className="search mt-4">
              <Button btnText="Search" btnType="fill" btnStyle="w-full" onClick={async()=> {
                
                setLoading(true);
                close()

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
                  setLoading(false)
                }).catch(e=> {
                  setLoading(false);
                })
              }} />
            </div>
          </div>

          <div className="filter-application mt-8">
            <SearchFilter  mobile={true} close={close}/>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileSearch;
