import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tabs from "../../../components/Tabs";
import About from "../../../components/About";
import Itinerary from "../../../components/Itinerary";
import Footer from "../../../components/common/Footer";
import { getRequest } from "../../../actions/connection";
import ShowLuggage from "../../../components/common/ShowLuggage";
import useData from '../../../components/hooks/useData';


const TripPage = ({ trip, notFound }) => {
  const { push } = useRouter();
  const [user_is_owner, setUserAsOwner] = useState(false);
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
  
  
  useEffect(() => {
    if (user.id === trip.user_id) {
      user_is_owner = true;
    }
  }, []);

  const tabs = [
    {
      name: "ABOUT",
      render: <About user_is_owner={user_is_owner} trip={trip} />,
    },
    {
      name: "ITINERARY",
      render: <Itinerary trip={trip} />,
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

          <section className="tab-section mt-8 container">
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
  const { slug } = context.query;
  const ngrok_base = "http://6c7c-197-210-8-123.ngrok.io/api/v1"

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
