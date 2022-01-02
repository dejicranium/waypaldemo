import { useRouter } from "next/router";
import { Mixpanel } from '../assets/js/mixpanel';

const MoreDestinationCard = ({ props }) => {
  const { push } = useRouter();

  function goToDestination(name){ 
    Mixpanel.track('destination-image-clicked', {destination: name});
    push('/search?destination=' + name);
  }


  return (
    <>
      <div className="card-wrapper grid grid-cols-8 gap-5 container">
        {/* Card 1 */}
        <div onClick={() => goToDestination(props[0] && props[0].name)} className="card rounded-10 overflow-hidden col-span-2 h-500 w-full max-w-sm bg-no-repeat bg-center bg-cover cursor-pointer" style={{backgroundImage: `url(${props[0] && props[0].image})`}}>
          <div className="card-text relative top-48 lg:top-80">
            <p className="font-circular-black lg:text-40 text-26 text-white">
              {props[0] && props[0].name}
            </p>
            <p className="md:text-14 text-xs text-white uppercase">
              {props[0] && props[0].location}
            </p>
          </div>
        </div>

        {/* Card 2,3,4 wrapper */}
        <div onClick={() => goToDestination(props[1] && props[1].name)} className="grid grid-cols-2 gap-5 col-span-6 cursor-pointer">
          {/* Card 2 */}
          <div className="card rounded-lg relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover"  style={{backgroundImage: `url(${props[1] && props[1].image})`}}>
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[1] && props[1].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[1] && props[1].location}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div onClick={() => goToDestination(props[2] && props[2].name)} className="card rounded-10 relative overflow-hidden h-60 w-full max-w-2xl bg-no-repeat bg-center bg-cover cursor-pointer "  style={{backgroundImage: `url(${props[2] && props[2].image})`}}>
            <div className="card-text absolute top-24 left-24">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[2] && props[2].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[2] && props[2].location}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div  onClick={() => goToDestination(props[3] && props[3].name)} className="col-span-2 card rounded-10 relative overflow-hidden h-72 w-full max-w-6xl bg-no-repeat bg-cover cursor-pointer"  style={{backgroundImage: `url(${props[3] && props[3].image})`}}>
            <div className="card-text absolute top-24 left-72">
              <p className="font-circular-black lg:text-40 text-26 text-white">
                {props[3] && props[3].name}
              </p>
              <p className="md:text-14 text-xs text-white uppercase">
                {props[3] && props[3].location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreDestinationCard;
