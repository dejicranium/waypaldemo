import UserAvatar from "react-user-avatar";
import { formatCurrency } from "../assets/js/utils";
import { useEffect, useState } from "react";
import { getRequest } from '../actions/connection';

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
      <div className="flex items-center">
        {tripBuddies && tripBuddies.map((e, i) => {
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
      </div>
    </>
  );
};

export default BuddiesList;
