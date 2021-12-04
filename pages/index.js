// components
import Image from "next/image";

import Hero from "../components/Hero";
import Icon from "../components/common/Icon";
import Footer from "../components/common/Footer";
import Testimonial from "../components/Testimonial";
import ShowLuggage from "../components/common/ShowLuggage";
import DestinationCard from "../components/DestinationCard";
import InputWithLabel from "../components/common/InputWithLabel";
import MoreDestinationCard from "../components/MoreDestinationCard";

// data
let testimonial = require("../assets/data/testimonial.json");
let destinations = require("../assets/data/destinations.json");

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mobile-quick-explore container mt-6 lg:hidden">
        <InputWithLabel
          placeholder="Where would you like to go?"
          type="text"
          label="Destination"
        />

        <InputWithLabel
          placeholder="When would you like to go?"
          type="text"
          label="Travel Date"
        />

        <InputWithLabel
          placeholder="How many travel buddies?"
          type="text"
          label="Travel Buddies"
        />
        <div className="search">
          <button className="bg-orange w-full rounded text-white text-lg flex items-center justify-center py-4 font-black">
            Find travel buddies
            <Icon icon="search" cname="pl-2" />
          </button>
        </div>
      </section>

      <section className="top-destinations text-center pt-24">
        <div className="top-destination-header">
          <h2 className="font-smith text-orange-light md:text-200 text-64 relative z-10">
            top
          </h2>
          <h2 className="text-black-light font-circular-black md:text-80 text-2xl relative md:bottom-12 md:right-3 bottom-10 right-1">
            destinations
          </h2>
        </div>
        <div className="divider w-5 h-2 md:w-10 md:h-4 mx-auto relative bottom-9"></div>
        <div className="top-destination-text">
          <p className="md:max-w-4xxl max-w-xxs mx-auto md:text-26">
            It’s hard enough deciding to move, you don’t have to worry about
            where to move to. These are some of the most popular and best
            locations to move to based on a number of factors.
          </p>
        </div>
        {/* Destination Card */}
        <div className="destination-card flex justify-start lg:justify-center my-24 max-w-full w-full overflow-x-scroll">
          {destinations.slice(0, 4).map((e, i) => (
            <DestinationCard {...e} key={i} />
          ))}
        </div>
      </section>

      {/* Travel Buddies */}
      <section className="travel-buddies max-w-6xl lg:max-w-6xl md:max-w-2xl mx-auto book-trip mt-14 md:mt-52">
        <div className="flex md:justify-between items-center justify-center">
          <div className="booktrip-steps">
            <div className="md:text-5xl text-32 md:max-w-lg max-w-xxs font-circular-bold text-black-bold relative">
              Find your travel buddies in{" "}
              <pre style={{ display: "inline-block" }}> </pre>{" "}
              <span className="font-smith text-orange-light md:text-200 text-130 absolute md:-bottom-9 md:left-12 lg:-bottom-9 lg:left-60 -bottom-14 left-40">
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna, tortor tempus.
                  </p>
                </div>
              </div>
              <div className="step-2 flex mb-12">
                <Icon icon="travel-buddies-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">
                    Choose your preferred travel buddies
                  </p>
                  <p className="text-gray-light max-w-xxs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna, tortor tempus.
                  </p>
                </div>
              </div>
              <div className="step-3 flex mb-12">
                <Icon icon="payment-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">Make payment</p>
                  <p className="text-gray-light max-w-xxs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna, tortor tempus.
                  </p>
                </div>
              </div>
              <div className="step-4 flex">
                <Icon icon="move-icon" />
                <div className="steps-text pl-5">
                  <p className="font-circular-bold">Get ready to move</p>
                  <p className="text-gray-light max-w-xxs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna, tortor tempus.
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
            more
          </h2>
          <h2 className="text-black-light font-circular-black md:text-80 text-2xl relative bottom-9">
            destinations
          </h2>
        </div>
        <div className="divider w-5 h-2 md:w-10 md:h-4 mx-auto relative bottom-9"></div>
        <div className="more-destination-text">
          <p className="md:max-w-4xxl max-w-xxs mx-auto md:text-26 text-center">
            Your peace of mind doesn’t have to be tied to where everyone else
            is. We have a good number of travel and relocation destinations.
            Take your time and find the perfect one for you.
          </p>
        </div>
        {/* More destination Card */}
        <div className="more-destination-card hidden lg:block my-24 max-w-7xl mx-auto">
          <MoreDestinationCard props={destinations} />
        </div>
        <div className="destination-card flex justify-start lg:hidden my-24 max-w-full w-full overflow-x-scroll">
          {destinations.slice(0, 4).map((e, i) => (
            <DestinationCard {...e} key={i} />
          ))}
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
