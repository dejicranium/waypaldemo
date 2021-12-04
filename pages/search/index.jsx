import { useState } from "react";
import Icon from "../../components/common/Icon";
import SearchBar from "../../components/SearchBar";
import MoreResults from "../../components/MoreResults";
import MobileSearch from "../../components/MobileSearch";
import SearchFilter from "../../components/SearchFilter";
import SimpleTripCard from "../../components/SimpleTripCard";

const Search = () => {
  const buddies = [
    "Doesn't smoke",
    "Likes to party",
    "Afrosentric",
    "Likes Nigerian music",
  ];

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <>
      <div className="mobile-search md:hidden">
        <MobileSearch
          show={showMobileFilter}
          close={() => setShowMobileFilter(false)}
        />
      </div>
      <div className="container mt-7 md:mt-14">
        <section className="search-bar hidden md:block">
          <SearchBar />
        </section>

        <section className="no-results mt-20 mb-14 max-w-3xl hidden">
          <h2 className="text-4xl">
            We couldn’t find a trip that fits your search criteria.
          </h2>
          <p className="text-2xl pt-4">
            But we’ve suggested a few trips that you may like
          </p>
        </section>

        <section className="top-results mt-0 md:mt-14 flex items-center justify-between">
          <h2 className="text-gray-light2 text-2xl font-circular-bold">
            Top <span className="text-orange">results</span>
          </h2>
          <div
            className="filter-icon md:hidden cursor-pointer"
            onClick={() => setShowMobileFilter(true)}
          >
            <Icon icon="filter" />
            <span className="text-gray-light2 pl-3">Filter</span>
          </div>
        </section>

        <section className="search-results flex space-x-8 overflow-x-scroll xl:overflow-x-visible mt-7">
          <SimpleTripCard />
          <SimpleTripCard />
          <SimpleTripCard />
        </section>

        <div className="flex justify-between">
          <section className="other-results mt-10 w-full md:w-3/5 lg:w-70per">
            <h2 className="text-gray-light2 text-2xl font-circular-bold">
              Other results
            </h2>
            <MoreResults
              destination="Paraty, Rio De Janeiro"
              price={3150}
              date="Tuesday, October 22nd, 2021"
              buddies={buddies}
            />
            <MoreResults
              destination="Paraty, Rio De Janeiro"
              price={3150}
              date="Tuesday, October 22nd, 2021"
              buddies={buddies}
            />
          </section>

          <section className="filter mt-14 hidden md:block w-3/12 md:w-30per lg:w-3/12">
            <SearchFilter />
          </section>
        </div>
      </div>
    </>
  );
};

export default Search;
