import Icon from "./common/Icon";
import Button from "./common/Button";
import SearchFilter from "./SearchFilter";

const MobileSearch = ({ show, close }) => {
  return (
    <>
      {show ? (
        <div
          className={`container h-screen overflow-y-scroll fixed z-20 top-4 left-0 bg-white`}
        >
          <div className="filter-header flex items-center">
            <Icon
              icon="back-arrow"
              cname="pr-8 cursor-pointer"
              handleClick={() => close(false)}
            />
            <h1 className="text-2xl text-black-light">Filter</h1>
          </div>

          <div className="search-input">
            <div className="destination input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="departure" />
              <input
                placeholder="Destination"
                className="outline-none box-border text-black-content w-full pl-3"
              />
            </div>
            <div className="travel-date input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="calendar-date" />
              <input
                placeholder="Travel date"
                className="outline-none box-border text-black-content w-full pl-3"
              />
            </div>
            <div className="destination input-with-label bg-white rounded flex items-center p-2 mt-4">
              <Icon icon="person" />
              <input
                placeholder="Buddies"
                className="outline-none box-border text-black-content w-full pl-3"
              />
            </div>

            <div className="search mt-4">
              <Button btnText="Search" btnType="fill" btnStyle="w-full" />
            </div>
          </div>

          <div className="filter-application mt-8">
            <SearchFilter />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileSearch;
