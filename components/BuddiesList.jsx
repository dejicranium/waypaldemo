import UserAvatar from "react-user-avatar";
import { formatCurrency } from "../assets/js/utils";
import { useEffect, useState } from "react";
import { getRequest } from '../actions/connection';
import Spinner from '../components/Spinner';


const BuddiesList = ({ trip }) => {
  const [tripBuddies, setTripBuddies] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(async () => {
    await getRequest(`/trip/${trip.id}/buddies`)
      .then(resp=> {
        if (resp.data) {
          setLoading(false);
          setTripBuddies(resp.data);
        }
      })
      .catch(err=>{
        setLoading(false);
      })
  }, []);

  return (
    
    <>
    {loading &&
      <Spinner size={1.7} color={"#EA4524"} />
    }
    {!loading &&
    
      <div className="flex items-center">
        {tripBuddies && tripBuddies.length > 0 && tripBuddies.map((e, i) => {
          return (
            <>
              <UserAvatar
                size="48"
                name={e.User.firstname + ' ' + e.User.lastname}
                color="#5CD6C0"
                src={e.User.profile_image_url || ''}
              />
              <p className="pl-6">
              {e.User.firstname + ' ' + e.User.lastname} - {formatCurrency(trip.currency)} {e.User.Payments && e.User.Payments[0] && e.User.Payments[0].amount}
              </p>
            </>)
          })
        
          }

          {!tripBuddies || !tripBuddies.length && 
          <div className="flex flex-col">
            <h1 className="text block md:text-1xl font-circular-bold text-black-light">
              No payments...yet 👀
            </h1>
            <p className="text-gray block">You'll see payments made by buddies here</p>
          </div>
          }
      </div>
    }
    </>
  );
};

export default BuddiesList;
