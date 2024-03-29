import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tabs from "../components/Tabs"
import About from "../components/AboutPreview";
import Itinerary from "../components/ItineraryPreview";
import Buddies from "../components/Buddies";
import Footer from "../components/common/Footer";
import ShowLuggage from "../components/common/ShowLuggage";
import useData from '../components/hooks/useData';

const PreviewTripPage = ({ trip }) => {
  const { push } = useRouter();
  const [user_is_buddy, setUserAsBuddy] = useState(true);
  const {
    data: {
      user,
      isLoggedIn = false,
      createTrip,
    },
  } = useData();
  
  
  useEffect(async() => {
  
  }, []);

  const tabs = [
    {
      name: "ABOUT",
      render: <About trip={createTrip}  />,
    },
    {
      name: "ITINERARY",
      render: <Itinerary trip={createTrip} user={user} />,
    }
   
  ];
  

  return (
    <>
      
      {true && (
        <>

          <section className="destination-header">
            <div
              className="w-full h-40 md:h-40v bg-cover bg-center bg-no-repeat relative"
              style={
                {
                  height: "500px !important",
                  backgroundImage: `url(${createTrip.images && createTrip.images[0]})`,
                }
              }
            >
              <div className="absolute grid top-0 left-0 text-center w-full h-full">
                <div className="m-auto">
                  <p className="font-circular-black text-white z-30 text-7xl md:text-130">
                    {createTrip.destination.split(',')[0]}
                  </p>
                  <p className="font-circular-bold text-white uppercase">
                    {/* Rio De Janeiro */}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="tab-section mt-10 container">
             
              <Tabs data={tabs} />
            
           </section> 

          <Footer>
            <ShowLuggage />
          </Footer>
        </>
      )}
    </>
  );
};

export default PreviewTripPage;



// const userData = await getRequest(`/user/id/${tripData.data.user_id}`);
