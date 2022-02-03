// components
import Image from "next/image";

import Hero from "../components/Hero";
import Icon from "../components/common/Icon";
import Footer from "../components/common/Footer";
import Testimonial from "../components/Testimonial";
import ShowLuggage from "../components/common/ShowLuggage";
import DestinationCard from "../components/DestinationCard";
import InputWithLabel from "../components/common/InputWithLabel";
import DateTimeWithLabel from "../components/common/DateTimeWIthLabel";
import MoreDestinationCard from "../components/MoreDestinationCard";
import {getRequest} from "../actions/connection";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// data
import moment from  "moment"
let testimonial = require("../assets/data/testimonial.json");
let destinations = require("../assets/data/destinations.json");
import useData from "../components/hooks/useData";

export default function Home() {
  const { push } = useRouter();
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [buddies, setBuddies] = useState("");
  const [topDestinations, setTopDestinations] = useState([]);

  const {
    dispatch,
    data: {
      topSearchResults,
      tax
    },
  } = useData();

  useEffect(async () => {
    await getRequest('/taxes')
      .then(resp=> {
        dispatch({tax: resp.data})
      })
      .catch(e => {
      })
  }, [])
  
  const searchTrips = async() => {
    dispatch({topSearchResults: []})

    let query = ''; 
    if (destination) query +=  `?destination=${destination}&`;
    if (travelDate) query +=  `travel_date=${travelDate}&`;
    if (buddies) query +=  `buddies=${buddies}&`;
    push("/search" + query)
    
  }
  return (
    <>
      <Hero />

      <section className="mobile-quick-explore container mt-6 lg:hidden">
        <InputWithLabel
          placeholder="Where would you like to go?"
          type="text"
          label="Destination"
          value={destination}
          cname="destination-input"
          isdestination_input={true}
          id={`mobile-explore-destination`}
          onChange={setDestination}
        />


        <DateTimeWithLabel
            placeholder="When would you like to go?"
            closeOnSelect
            timeFormat={false}
            dateFormat="YYYY-MM-DD"
            label="Travel Date"
            inputProps={{
              placeholder: "When would you like to go",
              className: "input-element w-full mb-3 md:mb-0",
            }}
            onChange={(v) => {
              setTravelDate(v.format("YYYY-MM-DD"));
            }}
            
        />

        <InputWithLabel
          placeholder="How many travel pals?"
          type="text"
          label="Travel pals"
          onChange={(e) => {setBuddies(e.target.value)}}
          value={buddies}
        />
        <div className="search">
          <button className="bg-orange w-full rounded text-white text-lg flex items-center justify-center py-4 font-black" onClick={searchTrips}>
            Find travel pals
          </button>
        </div>
      </section>


      {/* Travel Buddies */}
      <section className="travel-buddies max-w-6xl lg:max-w-6xl md:max-w-2xl mx-auto book-trip mt-14 md:mt-52">
        <div className="flex md:justify-between items-center justify-center">
          <div className="booktrip-steps home-special-container">
            <div className="md:text-5xl text-32 md:max-w-lg max-w-xxs font-circular-bold text-black-bold relative">
              Find an exciting travel group in{" "}
              <pre style={{ display: "inline-block" }}> </pre>{" "}
              <span className="font-smith four text-orange-light md:text-200 text-130 absolute md:-bottom-9 md:left-12 lg:-bottom-9 lg:left-60 -bottom-14 left-40">
                4
              </span>{" "}
              steps
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-12">
                <Icon icon="destination-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">Choose destination</p>
                  <p className="text-gray-light max-w-xxs">
                  Search for group trips going to interesting locations around the world.                  </p>
                </div>
              </div>
              <div className="step-2 flex mb-12">
                <Icon icon="travel-buddies-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">
                    Choose a trip
                  </p>
                  <p className="text-gray-light max-w-xxs">
                    Seen an interesting trip with the right location, budget and itinerary for you? Proceed to join.
                  </p>
                </div>
              </div>
              <div className="step-3 flex mb-12">
                <Icon icon="payment-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">Get verified and make payment</p>
                  <p className="text-gray-light max-w-xxs">
                    Get verified biometrically and easily make payment to join your travel pals.
                  </p>
                </div>
              </div>
              <div className="step-4 flex">
                <Icon icon="bus" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">Get ready to move</p>
                  <p className="text-gray-light max-w-xxs">
                    Chat with your buddies and the trip creator on preparations in-app and get ready to meet amazing people while exploring our beautiful world.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="trip-card -mt-56 -mr-28 hidden md:flex">
            <Image
              src="/trip-card.png"
              alt="trip card"
              layout="intrinsic"
              width={750}
              height={902}
            />
          </div>
        </div>
      </section>

      {/* More destinations */}
      <section className="more-destinations text-center mt-16">
        <div className="more-destination-header">
          <h2 className="font-smith text-orange-light md:text-200 text-64 relative">
            top
          </h2>
          <h2 className="text-black-light font-circular-black md:text-80 text-2xl relative bottom-9">
            destinations
          </h2>
        </div>
        <div className="divider w-5 h-2 md:w-10 md:h-4 mx-auto relative bottom-9"></div>
        <div className="more-destination-text">
          <p className="md:max-w-4xxl max-w-xxs mx-auto md:text-26 text-center">
            We have some amazing and popular tours in the following cities. Take your time and find the perfect trip for you!
          </p>
        </div>
        {/* More destination Card */}
        
        <div id="top-destinations" className="more-destination-card hidden lg:block my-24 max-w-7xl mx-auto">
          <MoreDestinationCard props={destinations} />
        </div>
        <div id="more-destinations" className="destination-card flex justify-start lg:hidden my-24 max-w-full w-full overflow-x-scroll">
          {destinations.slice(0, 4).map((e, i) => (
            <DestinationCard {...e} key={i} />
          ))}
          </div> 
      </section>


      <section className="travel-buddies home-special-container max-w-6xl lg:max-w-6xl md:max-w-2xl mx-auto book-trip mt-14 md:mt-52">
        <div className="flex md:justify-between items-center justify-center">
          <div className="booktrip-steps">
            
            <div className="md:text-5xl text-32 md:max-w-lg max-w-xxs font-circular-bold text-black-bold relative">
              <Icon icon="six" /> more reasons to plan with WayPal
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xs">
                  Up to 100% Refundable fees when
 trip buddy quota is not met.                  </p>
                </div>
              </div> 
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xs">
                  Everyone’s safety is guaranteed  as everyone is biometrically verified.
                  </p>
                </div>
              </div> 
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xs">
                  You have the opportunity to split accommodation and miscellaneous costs with your travel pals.
                  </p>
                </div>
              </div> 
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xxs">
                  Detailed Day-to-Day Itenary:  You know exactly what you are paying for and you get a chat system to talk to your pals and the trip creator to clarify anything at anytime
                  </p>
                </div>
              </div> 
            </div>
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xxs">
                  Meet new like-minded people or create trips for friends.                  </p>
                </div>
              </div> 
            </div>
            
            <div className="step-outline pt-9">
              <div className="step-1 flex mb-1">
                <Icon icon="reasons" />
                <div className="steps-text pl-5">
                  <p className="text-gray-light max-w-xxs">
                  You want to go on a trip with only known family, friends and colleagues? No problem. Just make your trip as private and we won't show anyone except people you share the trip link with (we promise 😉)                  </p>
                </div>
              </div> 
            </div>
          </div>
          <div className="trip-card -mt-56 -mr-28 hidden md:flex">
            <Image
              src="/reasons.png"
              alt="reasons"
              layout="intrinsic"
              width={680}
              height={699}
            />
          </div>
        </div>
      </section>


      <section className="testimonial pt-36">
        <div className="testimonial-header text-center">
          <h2 className="font-circular-bold md:text-4xl md:max-w-4xxl max-w-xxs mx-auto text-2xl text-black-content">
            What Waypal buddies are saying
          </h2>
        </div>
        <div className="md:flex pt-14 md:max-w-7xl max-w-sm mx-auto">
          {testimonial.map((e, i) => (
            <Testimonial {...e} key={i} />
          ))}
        </div>
      </section>

      <Footer>
        <ShowLuggage />
      </Footer>
    </>
  );
}
