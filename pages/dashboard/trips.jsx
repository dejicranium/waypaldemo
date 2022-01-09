import { isBefore, isAfter } from "date-fns";
import { useState, useEffect, useRef } from 'react';
import Tabs from "../../components/Tabs";
import Toast from "../../components/Toast";
import PastTrips from "../../components/PastTrips";
import { getRequest } from "../../actions/connection";
import HostedTrips from "../../components/HostedTrips";
import WaypalFooter from "../../components/WaypalFooter";
import UpcomingTrips from "../../components/UpcomingTrips";
import DashboardSidebar from "../../components/DashboardSidebar";
import { isoToDate } from "../../assets/js/utils";
import moment from 'moment';
import { Mixpanel } from '../../assets/js/mixpanel';


const Trips = () => {

  const [hostedTrips, setHostedTrips] = useState([])
  const [pastTrips, setPastTrips] = useState([])
  const [upcomingTrips, setUpcomingTrps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setErrir] = useState("")
  const [intent, setIntent] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get("intent"): "")
  const [intent_obj, setIntentObj] = useState(new URLSearchParams(window.location.search) ? new URLSearchParams(window.location.search).get("intent-obj"): "")

  useEffect(async() => {
    Mixpanel.track('dashboard-trips-page-loaded');
    
    let hosted= await getRequest(`/user/trips/`);

    hosted = hosted.data;
    const followedTrips = await getRequest("/user/trips/followed") ;
    const past= followedTrips?.data?.items.filter((trip) => {
      return isBefore(new Date(trip.Trip.start_date), new Date() );
    })|| []

    const upcoming = followedTrips.data?.items.filter((trip) => {
      return isAfter(new Date(trip.Trip.start_date), new Date());
    }) || []

    setHostedTrips(hosted);
    setPastTrips(past)
    setUpcomingTrps(upcoming)
    setLoading(false)


  }, []);
  const tabs = [
  {
      name: "UPCOMING TRIPS",
      render: <UpcomingTrips loading={loading} trips={upcomingTrips} error={error} />,
    },
    {
      name: "PAST TRIPS",
      render: <PastTrips trips={pastTrips} loading={loading} error={error} />,
    },
    {
      name: "HOSTED TRIPS",
      render: <HostedTrips trips={hostedTrips} loading={loading} error={error} />,
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
  let pastTrips, upcomingTrips = [];
  const url_base  = process.env.NEXT_PUBLIC_API_LOCATION || "//localhost:5000/api/v1"
  const hostedTrips =  await getRequest(`${url_base}/user/trips/`, cookies.token)
    .then(resp => {
      console.log("resp is "  + resp)
    })
    .catch(err => {
      console.log(err)
    })
  const followedTrips = await getRequest(
    `${url_base}/user/trips/followed/`,
    cookies.token
  );
  

  if (followedTrips && followedTrips.data) {
    pastTrips = followedTrips?.data?.items.filter((trip) => {
      return moment().isAfter(trip.Trip.start_date)
      
    })|| []
  }

  if (followedTrips && followedTrips.data) {
    upcomingTrips = followedTrips?.data?.items.filter((trip) => {
      return isAfter(new Date(trip.Trip.start_date), new Date());
    }) || [];

    hostedTrips.forEach(trip => {
      if (isAfter(new Date(trip.start_date), new Date()) && !upcomingTrips.find(a=> a.Trip.id === trip.id))  {
        upcomingTrips.push({Trip: trip});
      }
    })
  }


  return {
    props: {
      hostedTrips: hostedTrips ?  hostedTrips.data : [],
      followedTrips: followedTrips ? followedTrips.data : [],
      pastTrips: pastTrips ? pastTrips : [],
      upcomingTrips: upcomingTrips ? upcomingTrips : [],
    },
  };
  

}
