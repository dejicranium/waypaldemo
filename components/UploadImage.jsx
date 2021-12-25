import { useRef } from "react";

import Icon from "./common/Icon";

const UploadImage = ({ onChange, className }) => {
  const uploadRef = useRef(null);

  // const onChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const urls = await Promise.all(files.map((e) => blobToURL(e)));
  //   getImage(urls);
  // };

  return (
    <div className={`border border-gray-light7 rounded ${className}`}>
      <input
        hidden
        multiple
        type="file"
        id="upload"
        ref={uploadRef}
        accept="image/png, image/jpeg"
        onChange={onChange}
      />
      <div
        className="upload-img flex justify-between items-center flex-col"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          uploadRef.current?.click();
        }}
      >
        <Icon icon="camera" cname="mr-2" />
        <label
          htmlFor="upload"
          className="text-gray-light2 text-lg text-center cursor-pointer"
        >
          Upload image
        </label>
      </div>
    </div>
  );
};

export default UploadImage;
