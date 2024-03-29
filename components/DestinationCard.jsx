
import { useRouter } from "next/router";
import { Mixpanel } from '../assets/js/mixpanel';

const DestinationCard = ({ name, location, image, key
}) => {
  const { push } = useRouter();

  function goToDestination(name, e){ 
    Mixpanel.track('destination-image-clicked', {destination: name});
    push('/search?destination=' + name)
  }
  return (
  <div className="card-wrapper px-4 cursor-pointer" key={key} onClick={() => goToDestination(name)}>
    <div className="card rounded-10 h-96 w-52 lg:h-500 lg:w-300 bg-no-repeat bg-center bg-cover bg-hero overflow" style={{backgroundImage: `url(${image})`}}>
      <div className="card-text relative top-48 lg:top-80">
        <p className="font-circular-black lg:text-40 text-26 text-white">
          {name}
        </p>
        <p className="md:text-14 text-xs text-white uppercase">{location}</p>
      </div>
    </div>
  </div>
)};

export default DestinationCard;
