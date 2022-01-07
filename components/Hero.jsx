import InputWithLabel from "./common/InputWithLabel";
import Icon from "./common/Icon";
import useData from "../components/hooks/useData";
import { useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import { useRouter } from "next/router";
import DateTimeWithLabel from "../components/common/DateTimeWIthLabel";
import {Mixpanel} from "../assets/js/mixpanel";

import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Hero = () => {
    const { push } = useRouter();

    const [destination, setDestination] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [buddies, setBuddies] = useState("");

    const searchTrips = async() => {
      Mixpanel.track("find-travel-buddies-clicked", {
        destination: destination,
        travel_date: travelDate,
        buddies: buddies,
      });
      let query = ''; 
      if (destination) query +=  `?destination=${destination}&`;
      if (travelDate) query +=  `?travel_date=${travelDate}&`;
      if (buddies) query +=  `?buddies=${buddies}&`;

      push("/search" + query)
      
    }
    return (

      <div className="relative">
        <Icon icon="airplane-track" style="top:-15px" cname="airplane-track"/>
        
        <div className="bg-hero bg-no-repeat bg-cover lg:h-100v md:h-60v h-60">
          <div className="relative container md:p-16 p-5 flex justify-between items-center">

            <div className="hero-text">
              <h1 className="xl:text-hero md:text-8xl text-40 text-black font-circular-black">
                Find your <br /> ideal travel
              </h1>
              <span
                className="xl:text-sub-hero md:text-sub-hero-md text-9xl font-smith text-orange absolute 
                              top-11 left-10 lg:top-48 lg:left-16 xl:top-52 xl:left-24 md:top-24 md:left-16"
              >
                buddy
              </span>
            </div>
            <div className="quick-explore hidden lg:block mt-8 w-80">
              <InputWithLabel
                placeholder="Where would you like to go?"
                type="text"
                id={'explore-destination'}
                isdestination_input={true}
                label="Destination"
                cname="destination-input"
                onChange={setDestination}
              />


              <DateTimeWithLabel
                  placeholder="When would you like to go?"
                  closeOnSelect
                  timeFormat={false}
                  dateFormat="YYYY-MM-DD"
                  label="Travel Date"
                  inputProps={{
                    placeholder: "When would you like to go?",
                    className: "input-element w-full mb-3 md:mb-0",
                  }}
                  onChange={(v) => {
                    setTravelDate(v.format("YYYY-MM-DD"));
                  }}
                  
              />

              <InputWithLabel
                placeholder="How many travel buddies?"
                type="text"
                label="Travel Buddies"
                onChange={(e) => {setBuddies(e.target.value)}}
              />
              <div className="search">
                <button className="bg-orange w-full rounded text-white text-lg flex items-center justify-center py-4 font-black" onClick={searchTrips}>
                  Find travel buddies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
};

export default Hero;
