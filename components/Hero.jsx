import InputWithLabel from "./common/InputWithLabel";
import Icon from "./common/Icon";

const Hero = () => (
  <div className="">
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
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
