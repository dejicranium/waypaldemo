import { useState, useEffect, useRef } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import dynamic from 'next/dynamic';
import Header from './common/Header';

// import Footer from "./common/Footer";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const targetRef = useRef();

  useEffect(() => {
    if (open) {
      disableBodyScroll(targetRef);
      window.scrollTo({ top: 0 });
    } else {
      enableBodyScroll(targetRef);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  });
  return (
    <div
      className={`content relative w-full overflow-x-hidden`}
      ref={targetRef}
    >
      <div
        className={`relative w-full ${
          open ? 'transition duration-500 left-3/4' : ''
        }`}
      >
        <Header setOpen={setOpen} open={open} />
        <div className={`${open ? 'opacity-50' : 'opacity-100'}`}>
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
