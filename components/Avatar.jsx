import Icon from "./common/Icon";

const Avatar = ({
  icon = "",
  name = "",
  size = "md",
  radius = "full",
  url = "",
  cname = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center rounded-${radius} avatar-${size} ${cname}`}
      style={{
        ...(!icon &&
          url !== "" && {
            background: `url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }),
        ...(name && {}),
      }}
    >
      {!url && name && (
        <h3 className="text-yellow text-xl font-bold text-center">{name}</h3>
      )}
      {icon && <Icon icon={icon} />}
    </div>
  );
};

export default Avatar;
