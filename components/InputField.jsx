import Icon from "./common/Icon";
import Autocomplete from "react-google-autocomplete";

const InputField = (props) => {
  const {
    cname,
    className,
    innerref,
    helptext,
    leadingicon,
    trailingicon,
    helptextstyle,
    onChange,
    isdestination_input
  } = props;

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

        <Autocomplete
          apiKey="AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c"
          style={{ width: "100%" }}
          className={`input-element w-full ${cname} ${
            leadingicon ? "leading-icon" : ""
          }`}
          onPlaceSelected={(place) => {
            let destination = place.formatted_address;
            //onChange(destination);
          }}
          
        />
      </div>
    }
    </>
  );
};

export default InputField;