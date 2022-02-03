
import React from 'react';
import {useEffect} from 'react';
import Autocomplete from "react-google-autocomplete";

const InputWithLabel = ({ id, isdestination_input, label, value, type, placeholder, setInput, onChange, cname }) => {
    
  const reloadAutoComplete =() => {
      let input = document.getElementById(id);
      if (input instanceof HTMLInputElement) {
        let complete = new google.maps.places.Autocomplete(input, {
          fields: ['name']
        });
          google.maps.event.addListener(complete, 'place_changed', function () {
            let place = complete.getPlace();

            let address = place.name;
            //input.value = address;
            onChange(address);
          })

          input.addEventListener('input', function(e) {
            onChange(e.target.value)
          })
      }
      
      
  }
  
  const initializeAutoComplete = () => {
      const events = ['load'];
      
      
      events.forEach(event=> {
        window.addEventListener(event, function() {
            let input = document.getElementById(id);
            if (input instanceof HTMLInputElement) {
  
              let complete = new google.maps.places.Autocomplete(input, {
                fields: ['name']
              });
              google.maps.event.addListener(complete, 'place_changed', function () {
                let place = complete.getPlace();
  
                let address = place.name;
                onChange(address);
              })
            }
  
        })
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
          autoComplete="off"
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
          onClick={reloadAutoComplete}
          //onChange={(e) => onChange(e)}
          className={`outline-none  box-border text-black-content w-full ${cname}`}/>
      }
    </div>
  );
};

export default InputWithLabel;
