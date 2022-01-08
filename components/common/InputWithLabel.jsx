
import React from 'react';
import {useEffect} from 'react';
import Autocomplete from "react-google-autocomplete";

const InputWithLabel = ({ id, isdestination_input, label, value, type, placeholder, onChange, cname }) => {
    const initializeAutoComplete = () => {
      window.addEventListener('load', function() {
          let input = document.getElementById(id);
          if (input instanceof HTMLInputElement) {

            let complete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(complete, 'place_changed', function () {
              let place = complete.getPlace();

              let address = place.formatted_address;
              input.value = address;
              onChange(address);
            })
          }

      })
    }
  
  
    useEffect(()=> {
      initializeAutoComplete();
    }, [])
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
          id={id}
          onChange={(e) => onChange(e)}
          className={`outline-none box-border text-black-content w-full ${cname}`}
        />
      }
      {isdestination_input &&
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          //onChange={(e) => onChange(e)}
          className={`outline-none  box-border text-black-content w-full ${cname}`}/>
      }
    </div>
  );
};

export default InputWithLabel;
