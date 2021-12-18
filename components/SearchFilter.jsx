import Icon from "./common/Icon";
import Button from "./common/Button";
import Checkbox from "./Checkbox";
import { postRequest,getRequest } from "../actions/connection";
import qs from "qs";
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import useData from "../components/hooks/useData";

const SearchFilter = (props) => {
  const [checked, setChecked] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const {
    dispatch,
    data: {
      topSearchResults,
    },
  } = useData();
  useEffect(() => {
    // get query string

    const querystring = window.location.href.split('?')[1];
    if (querystring) {
      setLoadingResults(true)
      
    }
    
    
  });

  const handleCheckboxChange = (e) => {
    return setChecked(() => e.target.checked);
  };


  const changeValue = (e) =>  {
    this.setState({value: e.target.value});
  }
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showBuddiesFilter, setShowBuddiesFilter] = useState(true);
  const [min_price_filter, setMinPrice] = useState("");
  const [max_price_filter, setMaxPrice] = useState("");


  const getMaxPrice = () => {
    return "$" + max_price_filter;
  }

  const getMinPrice = () => {
    return "$" + min_price_filter;
  }

  

  const togglePriceRange = () => {
    return setShowPriceRange((prev) => !prev);
  };

  const toggleBuddiesFilter = () => {
    return setShowBuddiesFilter((prev) => !prev);
  };

  const filter = async () => {
    let params = new URLSearchParams(window.location.search) || '';
    let query = {destination: params.get('destination'), travel_date: params.get('travel_date'), buddies: params.get('buddies'), max_price: max_price_filter, min_price: min_price_filter}; 
    let query_string = "";


    Object.keys(query).forEach((key, i)=> {
      if (query[key]){
        if (!query_string) query_string += `?${key}=${query[key]}&`
        else query_string += `${key}=${query[key]}`
      }
    })
    
    await getRequest('/search' + query_string).then(response => {
      dispatch({topSearchResults: response.data.items})
    }).catch(e=> {
    })
  }

  return (
    <div className="mb-10">
      <h3 className="text-lg md:text-2xl font-circular-bold text-gray-light2">
        Filter
      </h3>
      <div className="price-range border border-gray-light6 rounded py-5 px-4">
        <div className="price-range-header flex justify-between items-center">
          <p>Price range</p>
          <div onClick={togglePriceRange}>
            <Icon icon="down-caret" cname="cursor-pointer" />
          </div>
        </div>
        <div
          className={
            showPriceRange
              ? `price-range-body h-full block overflow-hidden`
              : `h-0 hidden`
          }
        >
          <div className="min-price input-with-label bg-white rounded p-3 mt-4">
            <p className="text-xs font-bold">Min price</p>
            <input
              placeholder="$0"
              value={min_price_filter}
              className="outline-none box-border text-black-content w-full pl-3"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="max-price input-with-label bg-white rounded p-3 mt-4">
            <p className="text-xs font-bold">Max price</p>
            <input
              placeholder="$0"
              value={max_price_filter}
              className="outline-none box-border text-black-content w-full pl-3"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between max-w-xxs mt-8">
            <Button
              btnType="plain"
              btnText="Clear"
              btnStyle="text-orange font-bold"
            />
            <Button btnType="fill" onClick={() => {
              filter()
            }} btnText="Apply filter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
