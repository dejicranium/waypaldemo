import Image from "next/image";
import { icons } from "../../assets/svg";
import {useEffect} from "react";
export default function Icon({ icon, type = ".svg", handleClick, cname = "" }) {

  useEffect(() => {
    if (!icons[`${icon}${type}`]) console.log(`${icon}${type} not found`)
  }, [])


  return (
    <>
    {icons[`${icon}${type}`] && 
  
      <span className={`icon ${cname}`} onClick={handleClick}>
        <Image src={icons[`${icon}${type}`].default} alt={icon} />
      </span>
    }
    </>
  );
}
