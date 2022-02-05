import Icon from "./common/Icon";
import Button from "./common/Button";
import SearchFilter from "./SearchFilter";
import useData from '../components/hooks/useData';
import { useState, useEffect } from "react";
import { getRequest } from '../actions/connection';
import Autocomplete from "react-google-autocomplete";
import DateTime from "react-datetime";
import moment from "moment";

const MobileSearch = ({ show, close, setLoading }) => {
  const [destination, setDestination] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('destination') : "");
  const [meeting_point, setMeetingPoint] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('meeting_point') : "");
  const [travelDate, setTravelDate] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('travel_date') : "")
  const [buddies, setBuddies] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get('buddies') : "");
  const { dispatch } = useData();

  const addSearchHistory = (query) => {
    const {origin, pathname} = window.location;
    const url = origin + pathname + query;
    window.history.pushState({}, null, url);
  }
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

                <input 
                  type="text"
                  id="mobile-search-bar-destination"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onClick={() => {
                    let input = document.getElementById('mobile-search-bar-destination');
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
                  //onChange={(e) => setDestination(e.target.value)}
                  className="destination-input input-with-label-search outline-none box-border text-black-content w-full pl-3"
                  
              />
                
             
            </div>
            <div className="destination input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="meeting-point" />

              <input 
                    type="text"
                    id="meetingpoint-search-bar"
                    placeholder="Meeting Point"
                    value={meeting_point}
                    onChange={(e) => setMeetingPoint(e.target.value)}
                    onClick={() => {
                      let input = document.getElementById('meetingpoint-search-bar');
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
                    //onChange={(e) => setDestination(e.target.value)}
                    className="destination-input input-with-label-search outline-none box-border text-black-content w-full pl-3 "
                    
                />
            </div>
            <div className="travel-date input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="calendar-date" />
              <DateTime
                  border="none"
                  closeOnSelect
                  timeFormat={false}
                  dateFormat="YYYY-MM-DD"
                  className="outline-none box-border text-black-content w-full pl-3"
                  inputProps={{
                    placeholder: "Travel Date",
                    className: "outline-none box-border text-black-content w-full",
                  }}
                  onChange={(v) => {
                    try {
                      setTravelDate(v.format("YYYY-MM-DD"))
                    }
                    catch(e) {
                      
                    }
                  }} 
                  isValidDate={(current) => current.isAfter(moment())}
              />

            </div>
            
            <div className="search mt-4">
              <Button btnText="Search" btnType="fill" btnStyle="w-full" onClick={async()=> {
                
                setLoading(true);
                close()

                let query = {
                  destination, 
                  travel_date: travelDate, 
                  buddies, 
                  meeting_point
                }; 

                let query_string = "";
                
                Object.keys(query).forEach((key, i)=> {
                  if (query[key]){
                    if (!query_string) query_string += `?${key}=${query[key]}&`
                    else query_string += `${key}=${query[key]}&`
                  }
                })

                addSearchHistory(query_string);
                
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
