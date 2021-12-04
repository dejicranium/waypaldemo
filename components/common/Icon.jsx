import Image from "next/image";
import { icons } from "../../assets/svg";

export default function Icon({ icon, type = ".svg", handleClick, cname = "" }) {
  return (
    <span className={`icon ${cname}`} onClick={handleClick}>
      <Image src={icons[`${icon}${type}`].default} alt={icon} />
    </span>
  );
}
