import Icon from "./common/Icon";

const ChatSideBar = ({trip}) => {
  return (
    <div>
      <section className="trip-details p-8 rounded-2xl bg-orange-white">
        <div className="trip-title pb-6 border-b border-gray-light6">
          <h1 className="text-lg text-black font-bold">{trip.title}</h1>
          <p className="pt-2 text-orange font-bold">Travel itinerary</p>
        </div>
        <div className="trip-info pt-6">
          <div className="date flex">
            <Icon icon="calendar"></Icon>
            <p className="pl-4 text-black">October 21st, 2021</p>
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
            {trip.buddies} travel
            {`${trip.buddies === 1 ? " buddy" : " buddies"}`}{" "}
          </h2>
        </div>
        
        <div className="buddies-list flex flex-col pt-6">
          {trip.buddieslist && trip.buddieslist.map((item, index) => {
            return (
              <div className="flex flex-row items-center" key={index}>
                <div className="chat-image-container">
                  {item.User && item.User.profile_image_url &&
                    <img src={item.User.profile_image_url} alt=""/>
                  }
                  {!item.User || !item.User.profile_image_url && 
                    <img className="chat-image-default" alt=""/>
                  }
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
