import { useState } from "react";


import Toast from "./Toast";
import Icon from "./common/Icon";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

const ShareTrip = ({ trip, cname}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://waypal-eight.vercel.app';
  let shareUrl = `${baseUrl}/trip/${trip.slug}`;
  if (!trip.is_public) {
    shareUrl += `?pcd=${trip.passcode}`
  }

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = (tripUrl) => {
    const el = document.createElement("textarea");
    el.value = tripUrl;
    document.body.appendChild(el);
    el.select();
    navigator.clipboard.writeText(el.value);
    document.body.removeChild(el);
    setCopySuccess(true);
  };

  return (
    <>
      {copySuccess && (
        <Toast
          message={`Link successfully copied`}
          type="success"
          close={() => setCopySuccess(false)}
        />
      )}
      <div className={"border-2 border-dashed border-gray-light3 rounded-md py-6 px-20 max-w-md mx-auto " +cname}>
        <h4 className="text-black-content text-center text-lg font-circular-bold">
          Share trip:
        </h4>
        <div className="share-links flex items-center justify-between pt-6">
          <EmailShareButton
            subject={`Invitation to ${trip.title}`}
            body={`Please I take God beg you`}
            separator=""
            url={shareUrl}
          >
            <Icon cname="cursor-pointer" icon="email"></Icon>
          </EmailShareButton>
          <Icon
            cname="cursor-pointer"
            icon="share-link"
            handleClick={() => copyToClipboard(shareUrl)}
          ></Icon>
          <FacebookShareButton
            quote={`Invitation to ${trip.title}`}
            hashtag={`#${trip.title}`}
            url={shareUrl}
          >
            <Icon cname="cursor-pointer" icon="facebook"></Icon>
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={`Invitation to ${trip.title}`}
            via={`${trip.title}`}
            hashtags={[`${trip.title}`]}
            related={[`@Cnwadiogbu`]}
          >
            <Icon cname="cursor-pointer" icon="twitter"></Icon>
          </TwitterShareButton>
        </div>
      </div>
    </>
  );
};

export default ShareTrip;
