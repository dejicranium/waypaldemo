import { useRouter } from "next/router";
import useData from "../../../components/hooks/useData";

import Tabs from "../../../components/Tabs";
import Buddies from "../../../components/Buddies";
import { getRequest } from "../../../actions/connection";
import WaypalFooter from "../../../components/WaypalFooter";
import TravelDetails from "../../../components/TravelDetails";

const TripDetail = ({ trip, notFound }) => {
  const { push } = useRouter();

  if (notFound) {
    push("/404");
  }

  const {
    data: { currentTrip, user },
  } = useData();

  const tabs = [
    {
      name: "TRAVEL DETAILS",
      render: <TravelDetails trip={trip} user={user} />,
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
      <section className="tab-section mt-10 container">
        <Tabs data={tabs} />
      </section>
      <WaypalFooter />
        </>
      )}
    </>
  );
};

export default TripDetail;

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const tripData = await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`);

  if (tripData.status) {
    // const tripFollowers = await getRequest(`/trip/${tripData.data.id}/followers`);
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
