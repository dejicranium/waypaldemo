import Icon from "./common/Icon";

const MoreResults = ({ destination, price, date, buddies }) => {
  return (
    <div className="trip-card p-4 my-6 flex flex-col md:flex-row border rounded border-gray-light3">
      <div className="md:mr-5 md:w-1/4 flex-none">
        <div
          className="pt-2/3 bg-no-repeat bg-cover rounded"
          style={{ backgroundImage: "url('/landscape.jpg')" }}
        ></div>
      </div>
      <div className="trip-card__details pt-4">
        <h2 className="text-black-content font-circular-black text-base md:text-2xl">
          <span className="">{destination}</span> - <span>${price}</span>
        </h2>
        <p className="text-gray-light py-2">{date}</p>
        {buddies.map((bud, i) => {
          <p>{bud}</p>;
        })}
      </div>
    </div>
  );
};

export default MoreResults;
