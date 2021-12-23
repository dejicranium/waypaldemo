import InputWithLabel from "./common/InputWithLabel";
import Icon from "./common/Icon";
import useData from "../components/hooks/useData";
import { useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import { useRouter } from "next/router";
import DateTimeWithLabel from "../components/common/DateTimeWIthLabel";



const Hero = () => {
    const { push } = useRouter();

    const [destination, setDestination] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [buddies, setBuddies] = useState("");

    const searchTrips = async() => {
      let query = ''; 
      if (destination) query +=  `?destination=${destination}&`;
      if (travelDate) query +=  `?travel_date=${travelDate}&`;
      if (buddies) query +=  `?buddies=${buddies}&`;

      push("/search" + query)
      
    }
    return (

      <div className="relative">
        <svg className="absolute" width="1283" height="712" viewBox="0 0 1283 712" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1269.44" cy="14.1689" r="13.0144" fill="#F3D7D5"/>
          <circle cx="1269.44" cy="14.1689" r="4.82016" fill="#EA4524"/>
          <path d="M1270.44 14.1689C778.391 -29.3795 318.38 3.6572 1.52832 710.942" stroke="url(#paint0_linear_236_837)" strokeOpacity="0.2" strokeWidth="1.40156" strokeDasharray="4 4"/>
          <g clipPath="url(#clip0_236_837)">
          <path d="M691.496 40.0586C691.339 39.4926 690.706 39.1346 690.14 39.2915L686.249 40.3699L681.143 35.6902L679.728 36.0824L683.065 41.2523L679.174 42.3307L677.72 41.2098L676.659 41.5039L678.053 43.7841L678.032 46.4565L679.093 46.1624L679.762 44.4532L683.653 43.3748L683.453 49.5251L684.868 49.1329L686.837 42.4924L690.728 41.414C691.294 41.2571 691.652 40.6246 691.496 40.0586Z" fill="url(#paint1_linear_236_837)"/>
          </g>
          <defs>
          <linearGradient id="paint0_linear_236_837" x1="1246.91" y1="12.1667" x2="1.02785" y2="622.844" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA4524"/>
          <stop offset="1" stopColor="#EA4524" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_236_837" x1="705.583" y1="35.1578" x2="675.41" y2="43.1859" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2856F"/>
          <stop offset="1" stopColor="#FFEBE7"/>
          </linearGradient>
          <clipPath id="clip0_236_837">
          <rect width="14.6836" height="14.6836" fill="white" transform="translate(675.385 36.9055) rotate(-15.4903)"/>
          </clipPath>
          </defs>
        </svg>
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
                label="Destination"
                onChange={(e) => {setDestination(e.target.value)}}
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
