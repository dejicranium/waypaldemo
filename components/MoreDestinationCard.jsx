import { useRouter } from "next/router";

const MoreDestinationCard = ({ props }) => {
  const { push } = useRouter();

  function goToDestination(name){ 
    push('/search?destination=' + name)
  }


  return (
    <>
      <div className="card-wrapper grid grid-cols-8 gap-5 container">
        {/* Card 1 */}
        <div onClick={() => goToDestination(props[4] && props[4].name)} className="card rounded-10 overflow-hidden col-span-2 h-500 w-full max-w-sm bg-no-repeat bg-center bg-cover cursor-pointer" style={{backgroundImage: `url(${props[4] && props[4].image})`}}>
          <div className="card-text relative top-48 lg:top-80">
            <p className="font-circular-black lg:text-40 text-26 text-white">
              {props[4] && props[4].name}
            </p>
            <p className="md:text-14 text-xs text-white uppercase">
              {props[4] && props[4].location}
            </p>
          </div>
        </div>

        {/* Card 2,3,4 wrapper */}
        <div onClick={() => goToDestination(props[5] && props[5].name)} className="grid grid-cols-2 gap-5 col-span-6 cursor-pointer">
          {/* Card 2 */}
          <div className="card rounded-lg relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover"  style={{backgroundImage: `url(${props[5] && props[5].image})`}}>
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[5] && props[5].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[5] && props[5].location}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div onClick={() => goToDestination(props[6] && props[6].name)} className="card rounded-10 relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover cursor-pointer "  style={{backgroundImage: `url(${props[6] && props[6].image})`}}>
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[6] && props[6].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[6] && props[6].location}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div  onClick={() => goToDestination(props[7] && props[7].name)} className="col-span-2 card rounded-10 relative overflow-hidden h-72 w-full max-w-6xl bg-no-repeat bg-cover cursor-pointer"  style={{backgroundImage: `url(${props[7] && props[7].image})`}}>
            <div className="card-text absolute top-24 left-72">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[7] && props[7].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[7] && props[7].location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreDestinationCard;
