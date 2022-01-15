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
 
 

  const [loadingResults, setLoadingResults] = useState(false);
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [buddies, setBuddies] = useState("");

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
      tax
    },
  } = useData();
  const [showMobileFilter, setShowMobileFilter] = useState(false);



  useEffect(async() => {
    // get query string
    dispatch({topSearchResults: []})
    if (!tax) {
      await getRequest('/taxes')
          .then(resp=> {
            //setTax(resp.data)
            dispatch({tax: resp.data})
          })
          .catch(e => {
            
          })
      }
    
    const querystring = new URLSearchParams(window.location.search);
    if (querystring) {
      setLoadingResults(true);  
      await getRequest('/search?' + querystring).then(async response => {
        console.log(response.data.data);
        await dispatch({topSearchResults: response.data})
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
          setLoading={setLoadingResults}
          show={showMobileFilter}
          close={() => {
            setShowMobileFilter(false);
            enableBodyScroll(document.getElementsByClassName('content')[0])
          }}
        />
      </div>
      <div className="container mt-7 md:mt-14">
        <section className="search-bar hidden md:block">
          <SearchBar setLoading={setLoadingResults} p_destination={destination} p_travel_date={travelDate} p_buddies={buddies} />
        </section>

      
        <section className={loadingResults ? "mt-20 mb-14 max-w-3xl": "hidden"}>
          <Spinner size={1.7} color={"#EA4524"} />
        </section>
        <section className={!loadingResults && topSearchResults && topSearchResults.length < 1 ? "no-results mt-20 mb-14 max-w-3xl" : "hidden"}>
          <h2 className="text-4xl">
            We couldn’t find a trip that fits your search criteria.
          </h2>
          <p className="text-2xl pt-4">
          </p>
        </section>
        
        
        <section className="top-results mt-0 md:mt-14 flex items-center justify-between">
          { topSearchResults && topSearchResults.length > 0 && 
            <h2 className="hidden text-gray-light2 text-2xl font-circular-bold">
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
          
        
        <section className="hidden search-results flex space-x-8 overflow-x-scroll xl:overflow-x-visible mt-7">
          {topSearchResults &&topSearchResults.length > 0 &&
            topSearchResults.map((trip) => {
              return <SimpleTripCard key={trip.id} trip={trip} />
            })
          }

        </section>
        {topSearchResults && topSearchResults.length > 0 &&
          <div className="flex justify-between">
            <section className="other-results mt-10 w-full md:w-3/5 lg:w-70per flex flex-wrap">
              <div className="flex flex-col w-full">
                <h2 className="text-gray-light2 text-2xl font-circular-bold mb-10">
                  Top results
                  
                </h2>
                <div className="md:grid-cols-1 lg:grid-cols-1 gap-4 w-full grid">  
                { topSearchResults && topSearchResults.length > 0 ? topSearchResults.map((trip) => {
                  
                  return <MoreResults key={trip.id} trip={trip} />
                  
                }) : <p>Nothin</p>}
              </div>
              </div>
            </section>

            <section className="filter mt-10 hidden md:block w-3/12 md:w-30per lg:w-3/12">
              <SearchFilter />
            </section>
          </div>
        
        }
      </div>
    </>
  );
};

export default Search;
