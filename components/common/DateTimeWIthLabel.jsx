import DateTime from "react-datetime";
import moment from "moment";

const DateTimeWithLabel = ({ label, type, placeholder, onChange }) => {
    return (
      <div className="input-with-label rounded outline-none mb-6 bg-white p-4">
        <p className="font-bold text-sm">{label}</p>
        <DateTime
            border="none"
            closeOnSelect
            timeFormat={false}
            dateFormat="YYYY-MM-DD"
            className="outline-none box-border text-black-content w-full"
            inputProps={{
              placeholder: placeholder,
              className: "outline-none box-border text-black-content w-full",
            }}
            onChange={(v) => {
              onChange(v);
            }}
            isValidDate={(current) => current.isAfter(moment())}
        />
      </div>
    );
  };
  
  export default DateTimeWithLabel;
  