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

const TripPage = ({ trip, notFound }) => {
  const { push } = useRouter();
  const [user_is_buddy, setUserAsBuddy] = useState(false);
  /*
  if (notFound) {
    push("/404");
  }*/
  const {
    data: {
      user,
      isLoggedIn = false,
    },
  } = useData();
  
  
  useEffect(async() => {
    //if (user.id === trip.user_id) {
      //user_is_owner = true;
      let buddies  = await getRequest(`/trip/${trip.id}/buddies`);
      buddies = buddies.data;

      if (buddies && buddies.length > 0) {
        const exists = buddies.find(b => b.user_id == user.id)
        if (exists) setUserAsBuddy(true)
      }
       
  
  }, []);

  const general_tabs = [
    {
      name: "TRIP DETAILS",
      render: <About trip={trip} user_is_buddy={user_is_buddy} />,
    },
    {
      name: "ITINERARY",
      render: <Itinerary trip={trip} user={user} />,
    },
   
  ];
  const user_buddy_tabs = [
    {
      name: "ABOUT",
      render: <About trip={trip} user_is_buddy={user_is_buddy} />,
    },
    {
      name: "ITINERARY",
      render: <Itinerary trip={trip} user={user} />,
    },
    {
      name: "BUDDIES",
      render: <Buddies trip={trip} user={user} />,
    },
  ];

  return (
    <>
    
      {!notFound && (
        <>

          <section className="destination-header">
            <div
              className="w-full h-40 md:h-40v bg-cover bg-center bg-no-repeat relative"
              style={
                {
                  backgroundImage: `url(${trip.images && trip.images[0]})`,
                }
              }
            >
              <div className="absolute grid top-0 left-0 text-center w-full h-full">
                <div className="m-auto">
                  <p className="font-circular-black text-white z-30 text-7xl md:text-130">
                    {trip.destination}
                  </p>
                  <p className="font-circular-bold text-white uppercase">
                    {/* Rio De Janeiro */}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="tab-section mt-10 container">
            {user && (trip.user_id === user.id || user_is_buddy) && 
             
              <Tabs data={user_buddy_tabs} />
            }

            {user && trip.user_id !== user.id && 
                <Tabs data={general_tabs} />

            }
            {!user && 
                <Tabs data={general_tabs} />
            }
            
{/*
            { trip.user_id !== user.id && 
              <About trip={trip} user_is_buddy={user_is_buddy}/>
            } */}
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
  const { slug } = context.query;

  const tripData =  await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`);
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
