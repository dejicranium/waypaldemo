const TextAreaField = (props) => {
  const { cname, className, innerref, helptext, helptextstyle } = props;

  return (
    <div className={`input-field ${className}`}>
      <textarea
        {...props}
        {...innerref}
        className={`input-element w-full resize-none ${cname}`}
        rows="3"
      />
      {helptext && (
        <small className={`${helptextstyle} block`}>{helptext}</small>
      )}
    </div>
  );
};

export default TextAreaField;
