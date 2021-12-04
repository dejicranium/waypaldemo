import Icon from "./common/Icon";

const Testimonial = ({
  avatar,
  customerName,
  location,
  date,
  rating,
  testimony,
}) => (
  <div className="testimonial-wrapper flex container pt-7">
    <div className="pr-4 flex-none">
      <Icon icon={avatar} type=".png" />
    </div>
    <div className="">
      <p>{customerName}</p>
      <p className="text-gray-light2">
        {location} | {date}
      </p>
      {/* <Rating stars={rating} /> */}
      <p className="max-w-xxs">{testimony}</p>
    </div>
  </div>
);

export default Testimonial;
