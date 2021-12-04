import Icon from "./common/Icon";
import Button from "./common/Button";
import Checkbox from "./Checkbox";

import { useState } from "react";

const SearchFilter = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    return setChecked(() => e.target.checked);
  };

  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showBuddiesFilter, setShowBuddiesFilter] = useState(true);

  const togglePriceRange = () => {
    return setShowPriceRange((prev) => !prev);
  };

  const toggleBuddiesFilter = () => {
    return setShowBuddiesFilter((prev) => !prev);
  };

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
              className="outline-none box-border text-black-content w-full pl-3"
            />
          </div>
          <div className="max-price input-with-label bg-white rounded p-3 mt-4">
            <p className="text-xs font-bold">Max price</p>
            <input
              placeholder="$0"
              className="outline-none box-border text-black-content w-full pl-3"
            />
          </div>
          <div className="flex items-center justify-between max-w-xxs mt-8">
            <Button
              btnType="plain"
              btnText="Clear"
              btnStyle="text-orange font-bold"
            />
            <Button btnType="fill" btnText="Apply filter" />
          </div>
        </div>
      </div>

      <div className="buddies-preferences border border-gray-light6 rounded py-5 px-4 mt-14">
        <div className="price-range-header flex justify-between items-center">
          <p>Buddies Preferences</p>
          <div onClick={toggleBuddiesFilter}>
            <Icon icon="down-caret" cname="cursor-pointer" />
          </div>
        </div>
        <div
          className={
            showBuddiesFilter
              ? `buddies-filter h-full overflow-hidden`
              : `h-0 hidden`
          }
        >
          <div className="flex justify-between md:flex-col xl:flex-row">
            <div className="col-1 flex-none mt-4">
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Likes to party"
              />
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Doesn't smoke"
              />
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Afrosentric"
              />
            </div>
            <div className="col-2 flex-none xl:mt-4">
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Married"
              />
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Not a racist"
              />
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                checkfn="Alcohol"
              />
            </div>
          </div>
          <div className="flex items-center justify-between max-w-xxs mt-8">
            <Button
              btnType="plain"
              btnText="Clear"
              btnStyle="text-orange font-bold"
            />
            <Button btnType="fill" btnText="Apply filter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
