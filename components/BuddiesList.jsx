import UserAvatar from "react-user-avatar";
import { formatCurrency } from "../assets/js/utils";

const BuddiesList = ({ trip }) => {
  return (
    <>
      <div className="flex items-center">
        <UserAvatar
          size="48"
          name={`James Zagadat`}
          color="#5CD6C0"
          // src="/david.jpg"
        />
        <p className="pl-6">
          James Zagadat - {formatCurrency(trip.currency)}3,150
        </p>
      </div>
    </>
  );
};

export default BuddiesList;
