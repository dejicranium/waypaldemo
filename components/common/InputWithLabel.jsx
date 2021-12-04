const InputWithLabel = ({ label, type, placeholder }) => {
  return (
    <div className="input-with-label rounded outline-none mb-6 bg-white p-4">
      <p className="font-bold text-sm">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        // onChange={(e) => {
        //   setValue(e.target.value);
        // }}
        className="outline-none box-border text-black-content w-full"
      />
    </div>
  );
};

export default InputWithLabel;
