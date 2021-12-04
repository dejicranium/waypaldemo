import React, { useState } from "react";

const Tabs = ({ data, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  const Render = () => data[activeTab].render;

  return (
    <div className="tabs">
      <ul
        className={`${className} tabbed-navigation flex space-x-6 md:space-x-16 font-circular-bold text-black-content`}
      >
        {data.map((tab, i) => (
          <li
            key={i}
            className={
              (activeTab === i ? "active-tab text-orange relative" : "") +
              " cursor-pointer text-14 no-wrap"
            }
            onClick={() => {
              setActiveTab(i);
            }}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      <div className="outlet">
        <Render />
      </div>
    </div>
  );
};
export default Tabs;
