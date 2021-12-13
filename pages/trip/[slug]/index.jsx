import { useRouter } from "next/router";

import Tabs from "../../../components/Tabs";
import About from "../../../components/About";
import Itinerary from "../../../components/Itinerary";
import Footer from "../../../components/common/Footer";
import { getRequest } from "../../../actions/connection";
import ShowLuggage from "../../../components/common/ShowLuggage";

const TripPage = ({ trip, notFound }) => {
  const { push } = useRouter();
  /*
  if (notFound) {
    push("/404");
  }*/

  const tabs = [
    {
      name: "ABOUT",
      render: <About trip={trip} />,
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
  const ngrok_base = "http://3ed6-197-210-28-69.ngrok.io/api/v1"

  const tripData =  await getRequest(`${ngrok_base}/trip/by/slug/${slug}`);
  console.log(tripData)

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
