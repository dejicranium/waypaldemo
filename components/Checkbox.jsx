const CheckBox = (props) => {
  return (
    <div className="flex items-center">
      <div className="checkbox-wrapper">
        <input
          {...props}
          type="checkbox"
          id={props.checkfor}
          className="check hidden"
        />
        <label className="checkmark" htmlFor={props.checkfor}></label>
      </div>
      <span className="pl-1 text-gray-light2">{props.checkfn}</span>
    </div>
  );
};

export default CheckBox;
