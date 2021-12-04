const DestinationCard = ({
  destinationName,
  location,
}) => (
  <div className="card-wrapper px-4">
    <div className="card rounded-10 h-96 w-52 lg:h-500 lg:w-300 bg-no-repeat bg-center bg-cover bg-hero overflow-hidden">
      <div className="card-text relative top-48 lg:top-80">
        <p className="font-circular-black lg:text-40 text-26 text-black">
          {destinationName}
        </p>
        <p className="md:text-14 text-xs text-black uppercase">{location}</p>
      </div>
    </div>
  </div>
);

export default DestinationCard;
