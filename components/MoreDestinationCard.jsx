const MoreDestinationCard = ({ props }) => {
  return (
    <>
      <div className="card-wrapper grid grid-cols-8 gap-5 container">
        {/* Card 1 */}
        <div className="card rounded-10 overflow-hidden col-span-2 h-500 w-full max-w-sm bg-no-repeat bg-center bg-cover bg-hero">
          <div className="card-text relative top-48 lg:top-80">
            <p className="font-circular-black lg:text-40 text-26 text-black">
              {props[4].destinationName}
            </p>
            <p className="md:text-14 text-xs text-black uppercase">
              {props[4].location}
            </p>
          </div>
        </div>

        {/* Card 2,3,4 wrapper */}
        <div className="grid grid-cols-2 gap-5 col-span-6">
          {/* Card 2 */}
          <div className="card rounded-lg relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover bg-hero">
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-black">
                {props[5].destinationName}
              </p>
              <p className="md:text-14 text-xs text-black uppercase">
                {props[5].location}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card rounded-10 relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover bg-hero">
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-black">
                {props[6].destinationName}
              </p>
              <p className="md:text-14 text-xs text-black uppercase">
                {props[6].location}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-span-2 card rounded-10 relative overflow-hidden h-72 w-full max-w-6xl bg-no-repeat bg-center bg-cover bg-hero">
            <div className="card-text absolute top-24 left-72">
              <p className="font-circular-black lg:text-40 text-26 text-black">
                {props[7].destinationName}
              </p>
              <p className="md:text-14 text-xs text-black uppercase">
                {props[7].location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreDestinationCard;
