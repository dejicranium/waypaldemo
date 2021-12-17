import { useState, useEffect } from "react";
import Icon from "../../components/common/Icon";
import SearchBar from "../../components/SearchBar";
import MoreResults from "../../components/MoreResults";
import MobileSearch from "../../components/MobileSearch";
import SearchFilter from "../../components/SearchFilter";
import SimpleTripCard from "../../components/SimpleTripCard";
import Spinner from '../../components/Spinner';
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
import { useForm, Controller } from "react-hook-form";
import { getRequest } from "../../actions/connection";

import useData from "../../components/hooks/useData";
import {init} from "../../store"


const Search = () => {
  const buddies = [
    "Doesn't smoke",
    "Likes to party",
    "Afrosentric",
    "Likes Nigerian music",
  ];
  

  const [loadingResults, setLoadingResults] = useState(false);

  const  {
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {

    }
  })

  const {
    dispatch,
    data: {
      topSearchResults,
    },
  } = useData();
  const [showMobileFilter, setShowMobileFilter] = useState(false);



  useEffect(async() => {
    // get query string
    dispatch({topSearchResults: []})

    const querystring = window.location.href.split('?')[1];
    if (querystring) {
      setLoadingResults(true);
      await getRequest('/search?' + querystring).then(async response => {
        alert(JSON.stringify(response.data.items))
        await dispatch({topSearchResults: response.data.items})
        setLoadingResults(false)
      }).catch(e=> {
        console.log(e.message)
      })
    }
  }, []);

  return (
    <>
      <div className="mobile-search md:hidden">
        <MobileSearch
          show={showMobileFilter}
          close={() => {
            setShowMobileFilter(false);
            enableBodyScroll(document.getElementsByClassName('content')[0])
          }}
        />
      </div>
      <div className="container mt-7 md:mt-14">
        <section className="search-bar hidden md:block">
          <SearchBar />
        </section>

      
        <section className={loadingResults ? "mt-20 mb-14 max-w-3xl": "hidden"}>
          <Spinner size={1.7} color={"#EA4524"} />
        </section>
        <section className={!loadingResults && topSearchResults.length < 1 ? "no-results mt-20 mb-14 max-w-3xl" : "hidden"}>
          <h2 className="text-4xl">
            We couldn’t find a trip that fits your search criteria.
          </h2>
          <p className="text-2xl pt-4">
            But we’ve suggested a few trips that you may like
          </p>
        </section>
        
        
        <section className="top-results mt-0 md:mt-14 flex items-center justify-between">
          {topSearchResults.length > 0 && 
            <h2 className="text-gray-light2 text-2xl font-circular-bold">
              Top <span className="text-orange">results</span>
            </h2>
          }
          <div
            className="filter-icon md:hidden cursor-pointer"
            onClick={() => {
              setShowMobileFilter(true)
              console.log(document.getElementsByClassName('content')[0])
              disableBodyScroll(document.getElementsByClassName('content')[0])
              document.getElementsByClassName('content')[0].style.height = '100%';
              //document.getElementsByClassName('content')[0].style.overflowY = 'hidden';
                
            }}
          >
            <Icon icon="filter" />
            <span className="text-gray-light2 pl-3">Filter</span>
          </div>
        </section>
        
        <section className="search-results flex space-x-8 overflow-x-scroll xl:overflow-x-visible mt-7">
          { topSearchResults.length > 0 &&
            topSearchResults.map((trip) => {
              return <SimpleTripCard key={trip.id} trip={trip} />
            })
          }

        </section>
        {topSearchResults.length > 0 &&
          <div className="flex justify-between hidden">
            <section className="other-results mt-10 w-full md:w-3/5 lg:w-70per">
              <h2 className="text-gray-light2 text-2xl font-circular-bold">
                Other results
              </h2>
              {topSearchResults.length > 0 ? topSearchResults.map((trip) => {

            
                 <MoreResults
                 trip={trip}
                />
              }) : <p>Nothin</p>}
            </section>

            <section className="filter mt-14 hidden md:block w-3/12 md:w-30per lg:w-3/12">
              <SearchFilter />
            </section>
          </div>
        
        }
      </div>
    </>
  );
};

export default Search;
