import Icon from "./common/Icon";

import { useEffect } from "react";

const Toast = ({ message, type, close, toaststyle }) => {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 5000);
  }, []);

  if (type === "error") {
    toaststyle += " text-red bg-red-white";
  } else if (type === "success") {
    toaststyle += " text-green bg-green-light";
  } else if (type === "warning") {
    toaststyle += " text-yellow bg-yellow-white";
  } else if (type === "info") {
    toaststyle += " text-blue bg-blue-white";
  }

  return (
    <div className="toast fixed top-4 left-0 w-screen px-5 z-20 max-w-sm">
      <div
        className={`border rounded-md flex items-start justify-between p-3 ${toaststyle}`}
      >
        <p>{message}</p>
        <Icon icon="x" cname="cursor-pointer" handleClick={close} />
      </div>
    </div>
  );
};

export default Toast;
