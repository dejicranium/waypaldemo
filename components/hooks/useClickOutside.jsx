import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function useClickOutside(handler, ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// export function ClickOutside({ children, ...props }) {
//   const { children, onClickOutside } = props;
//   const ref = useRef(null);
//   useClickOutside(onClickOutside, ref);
//   return (
//     <div {...props} ref={ref}>
//       {children}
//     </div>
//   );
// }