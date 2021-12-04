import Icon from "./common/Icon";

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
  } = props;

  return (
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
  );
};

export default InputField;
