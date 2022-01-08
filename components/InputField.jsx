import Icon from "./common/Icon";
import Autocomplete from "react-google-autocomplete";
import {useEffect} from 'react';

const InputField = (props) => {
  const {
    id, 
    type,
    cname,
    className,
    innerref,
    helptext,
    leadingicon,
    trailingicon,
    helptextstyle,
    onChange,
    placeholder,
    isdestination_input
  } = props;


  useEffect(()=> {

    initializeAutoComplete();
  }, []);


  const initializeAutoComplete = () => {
    window.addEventListener('load', function() {
        let input = document.getElementById(id);
        if (input instanceof HTMLInputElement) {

          let complete = new google.maps.places.Autocomplete(input);
          google.maps.event.addListener(complete, 'place_changed', function () {
            let place = complete.getPlace();

            let address = place.formatted_address;
            //input.value = address;
            onChange(address);
          })
        }

    })
  }

  const reloadAutoComplete =() => {
    let input = document.getElementById(id);
    if (input instanceof HTMLInputElement) {
      let complete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(complete, 'place_changed', function () {
          let place = complete.getPlace();

          let address = place.formatted_address;
          //input.value = address;
          onChange(address);
        })
    }
    
  }


  return (
    <>
    {!isdestination_input &&
      <div className={`input-field ${className} relative`}>
        <input
          {...props}
          {...innerref}
          className={`input-element w-full ${cname} ${
            leadingicon ? "leading-icon" : ""
          }`}
          onChange={onChange}
        />
        {trailingicon && <Icon icon={trailingicon} cname="absolute top-2 right-2" />}
        {leadingicon && (
          <Icon
            icon={leadingicon}
            cname="absolute top-2 left-3"
          />
        )}
        {helptext && (
          <small className={`${helptextstyle} block`}>{helptext}</small>
        )}
      </div>
    }
    {isdestination_input &&
      <div className={`input-field ${className} relative`}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          onClick={reloadAutoComplete}
          //onChange={(e) => onChange(e)}
          className={`input-element w-full ${cname}`}
          {...innerref}/>


        {helptext && (
            <small className={`${helptextstyle} block`}>{helptext}</small>
          )}
      </div>
    }
    </>
  );
};

export default InputField;