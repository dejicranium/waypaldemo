
import React from 'react';
import Autocomplete from "react-google-autocomplete";

const InputWithLabel = ({ isdestination_input, label, value, type, placeholder, onChange, cname }) => {
  return (
    <div className="input-with-label rounded outline-none mb-6 bg-white p-4">
      <p className="font-bold text-sm">{label}</p>
      {!isdestination_input &&
        <input
          type={type}
          placeholder={placeholder}
          // onChange={(e) => {
          //   setValue(e.target.value);
          // }}
          onChange={(e) => onChange(e)}
          className={`outline-none box-border text-black-content w-full ${cname}`}
        />
      }
      {isdestination_input &&
        <Autocomplete
          apiKey="AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c"
          style={{ width: "100%" }}
          onPlaceSelected={(place) => {
            let destination = place.formatted_address;
            onChange(destination);
          }}
          
        />
      }
    </div>
  );
};

export default InputWithLabel;
