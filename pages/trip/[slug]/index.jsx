import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tabs from "../../../components/Tabs";
import About from "../../../components/About";
import Itinerary from "../../../components/Itinerary";
import Buddies from "../../../components/Buddies";
import Footer from "../../../components/common/Footer";
import { getRequest } from "../../../actions/connection";
import ShowLuggage from "../../../components/common/ShowLuggage";
import useData from '../../../components/hooks/useData';
import { Mixpanel } from '../../../assets/js/mixpanel';

const TripPage = ({ trip, isPrivate, notFound }) => {
  const { push } = useRouter();
  const [user_is_buddy, setUserAsBuddy] = useState(true);
  const {
    data: {
      user,
      isLoggedIn = false,
    },
  } = useData();
  
  
  useEffect(async() => {

      if (notFound) {
        push('/trip-private')
      }
      if (!notFound) {

          let buddies  = await getRequest(`/trip/${trip.id}/buddies`);
          buddies = buddies.data;
    
          if (buddies && buddies.length > 0) {
            const exists = buddies.find(b => b.user_id == user.id)
            if (exists) setUserAsBuddy(true)
            else setUserAsBuddy(false)
          }

          if (user && user.id) Mixpanel.identify(user.id);
          Mixpanel.track("trip-details-loaded", { 
            trip_id: trip.id,
            trip_title: trip.title,
            trip_destination: trip.destination,
            trip_total_amount: parseFloat(trip.travel_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.accommodation_amount)
          })
      }
       
  
  }, []);

  const tabs = [
    {
      name: "ABOUT",
      render: <About trip={trip}  />,
    },
    {
      name: "ITINERARY",
      render: <Itinerary trip={trip} user={user} />,
    },
   
  ];
  

  return (
    <>
      {notFound && (
        <p>This trip is either private or inexistent</p>
      )}
      {!notFound && (
        <>

          <section className="destination-header">
            <div
              className="w-full h-40 md:h-40v bg-cover bg-center bg-no-repeat relative"
              style={
                {
                  height: "500px !important",
                  backgroundImage: `url(${trip.images && trip.images[0]})`,
                }
              }
            >
              <div className="absolute grid top-0 left-0 text-center w-full h-full">
                <div className="m-auto">
                  <p className="font-circular-black text-white z-30 text-7xl md:text-130">
                    {trip.destination.split(',')[0]}
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

export default TripPage;

export async function getServerSideProps(context) {
  const { slug, pcd } = context.query;
  let url = `${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`;
  if (pcd) {
    url += `?passcode=${pcd}`
  }
  console.log(context.req.cookies)
  const tripData =  await getRequest(url, context.req.cookies.token);
  if (tripData.status) {
    return {
      props: {
        trip: tripData.data,
      },
    };
  }
  
  return {
    props: {
      notFound: true,
    },
  };
}

// const userData = await getRequest(`/user/id/${tripData.data.user_id}`);
