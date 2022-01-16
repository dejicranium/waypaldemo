import Icon from "./common/Icon";
import moment from "moment";
import Link from "next/link";
import UserAvatar from "react-user-avatar";

const ChatSideBar = ({trip}) => {
  return (
    <div>
      <section className="trip-details p-8 rounded-2xl bg-orange-white">
        <div className="trip-title pb-6 border-b border-gray-light6">
          <h1 className="text-lg text-black font-bold">{trip.title}</h1>
          <a href={`/trip/${trip.slug}`} className="pt-2 text-orange font-bold cursor-pointer">Travel itinerary</a>
        </div>
        <div className="trip-info pt-6">
          <div className="date flex items-center">
            <Icon icon="calendar"></Icon>
            <p className="pl-4 text-black">{moment(trip.start_date).format("dddd MMMM DD, YYYY")}</p>
          </div>
          <div className="meeting-point pt-6">
            <h3 className="text-black font-bold">Meeting point</h3>
            <p>{trip.meeting_point}</p>
          </div>
        </div>
      </section>

      <section className="chat-buddies p-8 rounded-2xl bg-orange-white overflow-hidden mt-6">
        <div className="chat-buddies-title pb-4 border-b border-gray-light6">
          <h2>
            {trip.joined_buddies} travel
            {`${trip.joined_buddies === 1 ? " buddy" : " buddies"}`}{" "}
          </h2>
        </div>
        
        <div className="buddies-list flex flex-col pt-6">
              <div className="flex flex-row items-center mb-1">
                <div className="chat-image-container">
                <UserAvatar
                  className="pr-3"
                  size="28"
                  name={`${trip.user.firstname.toUpperCase()} ${trip.user.lastname.toUpperCase()}`}
                  color="#5CD6C0"
                  src={trip.user.profile_image_url || ''}
                />
                </div>
                <p className="chat-image-container-label">{trip.user.firstname + ' ' + trip.user.lastname}</p>
              </div>
          {trip.buddieslist && trip.buddieslist.map((item, index) => {
            return (
              <div className="flex flex-row items-center mb-1" key={index}>
                <div className="chat-image-container">
                  <UserAvatar
                  className="pr-3"
                    size="28"
                    name={`${item.User.firstname.toUpperCase()} ${item.User.lastname.toUpperCase()}`}
                    color="#5CD6C0"
                    src={item.User.profile_image_url || ''}
                  />
                </div>
                <p className="chat-image-container-label">{item.User.firstname + ' ' + item.User.lastname}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default ChatSideBar;
