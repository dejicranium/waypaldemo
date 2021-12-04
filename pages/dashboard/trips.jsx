import { isBefore, isAfter } from "date-fns";

import Tabs from "../../components/Tabs";
import PastTrips from "../../components/PastTrips";
import { getRequest } from "../../actions/connection";
import HostedTrips from "../../components/HostedTrips";
import WaypalFooter from "../../components/WaypalFooter";
import UpcomingTrips from "../../components/UpcomingTrips";
import DashboardSidebar from "../../components/DashboardSidebar";
import { isoToDate } from "../../assets/js/utils";

const Trips = ({
  hostedTrips,
  followedTrips,
  error,
  upcomingTrips,
  pastTrips,
}) => {
  const tabs = [
    {
      name: "UPCOMING TRIPS",
      render: <UpcomingTrips trips={upcomingTrips} error={error} />,
    },
    {
      name: "PAST TRIPS",
      render: <PastTrips trips={pastTrips} error={error} />,
    },
    {
      name: "HOSTED TRIPS",
      render: <HostedTrips trips={hostedTrips} error={error} />,
    },
  ];
  return (
    <>
      <div className="container md:grid grid-cols-7 mt-14 mb-20">
        <aside className="hidden md:block col-span-1">
          <DashboardSidebar />
        </aside>

        <section className="col-span-6 md:ml-40">
          <Tabs data={tabs} />
        </section>
      </div>
      <WaypalFooter />
    </>
  );
};

export default Trips;

export async function getServerSideProps({ req: { cookies } }) {

  const hostedTrips = await getRequest(`/user/trips/`, cookies.token);
  const followedTrips = await getRequest(
    `/user/trips/followed/`,
    cookies.token
  );

  if (hostedTrips.status || followedTrips.status) {
    const pastTrips = followedTrips.data.items.filter((trip) => {
      return isBefore(new Date(), new Date(trip.Trip.start_date));
    });

    const upcomingTrips = followedTrips.data.items.filter((trip) => {
      return isAfter(new Date(trip.Trip.start_date), new Date());
    });

    return {
      props: {
        hostedTrips: hostedTrips.data,
        followedTrips: followedTrips.data,
        pastTrips: pastTrips,
        upcomingTrips: upcomingTrips,
      },
    };
  }
  return {
    props: {
      error: true,
    },
  };
}
