import Icon from "./common/Icon";
import { useState } from "react";

const InputField = (props) => {
  const {
    cname,
    className,
    innerref,
    helptext,
    leadingicon,
    trailingicon,
    helptextstyle,
    trailingtext,
    onChange,
  } = props;
  const [show_password, setShowPassword] = useState(false);
  return (
    <div className={`input-field ${className} relative`}>
      {props.type === 'password' &&
        <input
            {...props}
            {...innerref}
            className={`input-element w-full ${cname} ${
              leadingicon ? "leading-icon" : ""
            }`}
            onChange={onChange}
            type={show_password ? 'text': 'password'}
        />
      }

      {!props.type || props.type !== "password" && 
            <input
              {...props}
              {...innerref}
              className={`input-element w-full ${cname} ${
                leadingicon ? "leading-icon" : ""
              }`}
              onChange={onChange}
          />
      }
      
      {trailingicon && <Icon icon={trailingicon} cname="absolute top-2 right-2" />}
      {trailingtext && show_password &&  <p onClick="showPassword" onClick={() => setShowPassword(false)} className="input-trailing-text">Hide</p>}
      {trailingtext && !show_password &&  <p onClick="showPassword" onClick={() =>setShowPassword(true)} className="input-trailing-text">Show</p>}
      
      
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
  );
};

export default InputField;
