const TripCard = () => {
  return (
    <div className="trip-card-container flex-none rounded-xl overflow-hidden mb-6 w-300 md:w-400">
      <div className={""}>
        <div
          className={"pt-5/8 bg-cover"}
          style={{ backgroundImage: "url('/landscape.jpg')" }}
        ></div>
        <div className="trip-card-content p-4 flex justify-between items-start">
          <div className="location text-gray-light4">
            <p className="text-lg font-bold">Nairobi, Kenya</p>
            <small>Modern heart of Osaka</small>
          </div>
          <p className="price text-lg font-bold text-gray-light4">$139</p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
