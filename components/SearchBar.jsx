import Icon from "./common/Icon";
import Button from "./common/Button";

const SearchBar = () => {
  return (
    <div className="flex">
      <div className="flex flight-search bg-white rounded max-w-3xl border border-gray-light6 divide-x">
        <div className="destination flex items-center pl-3">
          <Icon icon="departure" cname="pt-1" />
          <input
            placeholder="Destination"
            className="outline-none box-border text-black-content w-full pl-3"
          />
        </div>
        <div className="travel-date flex items-center pl-4">
          <Icon icon="calendar-date" cname="pt-1" />
          <input
            placeholder="Travel date"
            className="outline-none box-border text-black-content w-full pl-3"
          />
        </div>
        <div className="destination flex items-center pl-3">
          <Icon icon="person" cname="pt-1" />
          <input
            placeholder="Buddies"
            className="outline-none box-border text-black-content w-full pl-3"
          />
        </div>
      </div>
      <div className="search-button">
        <Button btnText="Search" btnType="fill" />
      </div>
    </div>
  );
};

export default SearchBar;
