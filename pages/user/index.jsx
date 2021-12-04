import Icon from "../../components/common/Icon";
import DetailTripCard from "../../components/DetailTripCard";
import RecommendedTrips from "../../components/RecommendedTrips";
import Footer from "../../components/common/Footer";

const UserProfile = () => {
  return (
    <>
      <div className="user-profile container lg:flex space-x-8 justify-between mt-14">
        <section className="lg:max-w-xl xl:max-w-3xl">
          <div className="intro">
            <div className="intro-header flex items-center text-3xl">
              <Icon icon="avatar-placeholder" />
              <h2 className="text-orange pl-6">Hey! I{"'"}m Felix</h2>
            </div>
            <div className="intro-text text-lg text-gray-light4 pt-5 pb-8 border-b border-gray-light6">
              <p>
                Thank you for booking your travel with Waypal! Below is a
                summary of your trip with Felix to Paraty, Rio de Janeiro,
                Brazil. We’ve sent your trip details to your email address. You
                can also find this page again in{" "}
                <span className="text-orange">My trips</span>.
              </p>
            </div>
          </div>
          <div className="socials py-9 border-b border-gray-light6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="reviews flex items-center">
              <Icon icon="star"></Icon>
              <span className="text-gray-light pl-2">21 Reviews</span>
            </div>
            <div className="links flex items-center">
              <Icon icon="link"></Icon>
              <span className="text-gray-light pl-2">21 Reviews</span>
            </div>
            <div className="facebook flex items-center">
              <Icon icon="facebook-icon" cname="flex-none"></Icon>
              <span className="text-gray-light pl-2 overflow-ellipsis overflow-hidden">
                facebook.com/jagaban
              </span>
            </div>
            <div className="twitter flex items-center">
              <Icon icon="twitter-icon"></Icon>
              <span className="text-gray-light pl-2">@jagaban</span>
            </div>
          </div>
          <div className="user-trips py-6">
            <h3 className="text-2xl font-circular-bold">Felix{"'"}s Trips</h3>
            <div className="trip-card">
              <DetailTripCard
                destination="Rio De Janeiro"
                price="3150"
                location="Brazil"
                date="Tuesday, 21st of October"
              />
              <DetailTripCard
                destination="Rio De Janeiro"
                price="3150"
                location="Brazil"
                date="Tuesday, 21st of October"
              />
            </div>
          </div>
        </section>

        <section className="recommended-trips hidden lg:block flex-none min-w-400">
          <RecommendedTrips />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
