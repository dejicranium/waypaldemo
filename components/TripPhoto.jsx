import Image from "next/image";
import Icon from "./common/Icon";
import { useState } from "react";

export default function TripPhoto({ images }) {
  const [show_all, setShowAll] = useState(false);
  const isQualifiedSrc= (url) => {
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      return url;
    }
    return false;
  }
  const s_images = images;
  
  return (
    <>
      {images && (
        <>
          <>
            {show_all && (
              <>
                {s_images && s_images.map((image, index) => {

                    return (
                    <div className="w-full" >
                      <div className="w-full relative pt-8">
                        <div className="h-40 md:h-60 lg:h-40 xl:lg-60 w-full mb-1 md:mb-2">
                          <Image
                            src={isQualifiedSrc(image) || ""}
                            layout="fill"
                            className="rounded-10 object-cover"
                            alt="itinerary-image"
                          />
                        </div>
                      </div>
                    </div>
                    )
                  
                })}
              
              </>
            )}
          </>

          <>
          {!show_all && (
            <>
              {images.length === 1 && (
                <div className="w-full">
                  <div className="w-full relative pt-8">
                    <div className="h-40 md:h-60 lg:h-40 xl:lg-60 w-full mb-1 md:mb-2">
                      <Image
                        src={images[0]}
                        layout="fill"
                        className="rounded-10 object-cover"
                        alt="itinerary-image"
                      />
                    </div>
                  </div>
                </div>
              )}
              {images.length === 2 && (
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
                    <div className="h-40 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative hidden md:block">
                      <div className="left-img">
                        <Image
                          src={images[0]}
                          layout="fill"
                          className="rounded-10 object-cover"
                          alt="itinerary-image"
                        />
                      </div>
                    </div>
                    <div className="h-60 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative">
                      <div className="right-img">
                        <Image
                          src={images[1]}
                          layout="fill"
                          className="rounded-10 object-cover"
                          alt="itinerary-image"
                        />
                      </div>
                      <div className="absolute bg-black opacity-50 items-center p-2 rounded-3xl max-w-max bottom-4 right-5 cursor-pointer flex md:hidden">
                        <Icon icon="photos" />
                        <span className="text-xs text-white pl-1" onClick={() => setShowAll(true)}>
                          See all photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {images.length === 3 && (
                <>
                  <div className="w-full">
                    <div className="w-full relative hidden md:block">
                      <div className="h-40 md:h-60 lg:h-40 xl:lg-60 w-full mb-1 md:mb-2">
                        <Image
                          src={images[0]}
                          layout="fill"
                          className="rounded-10 object-cover"
                          alt="itinerary-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
                      <div className="h-40 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative hidden md:block">
                        <div className="left-img">
                          <Image
                            src={images[1]}
                            layout="fill"
                            className="rounded-10 object-cover"
                            alt="itinerary-image"
                          />
                        </div>
                      </div>
                      <div className="h-60 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative">
                        <div className="right-img">
                          <Image
                            src={images[2]}
                            layout="fill"
                            className="rounded-10 object-cover"
                            alt="itinerary-image"
                          />
                        </div>
                        <div className="absolute bg-black opacity-50 items-center p-2 rounded-3xl max-w-max bottom-4 right-5 cursor-pointer flex md:hidden">
                          <Icon icon="photos" />
                          <span className="text-xs text-white pl-1" onClick={()=> setShowAll(true)}>
                            See all photos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {images.length > 3 && (
                <>
                  <div className="w-full">
                    <div className="w-full relative hidden md:block">
                      <div className="h-40 md:h-60 lg:h-40 xl:lg-60 w-full mb-1 md:mb-2">
                        <Image
                          src={images[0]}
                          layout="fill"
                          className="rounded-10 object-cover"
                          alt="itinerary-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
                      <div className="h-40 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative hidden md:block">
                        <div className="left-img">
                          <Image
                            src={images[1]}
                            layout="fill"
                            className="rounded-10 object-cover"
                            alt="itinerary-image"
                          />
                        </div>
                      </div>
                      <div className="h-60 md:h-60 lg:h-40 xl:lg-60 col-span-1 overflow-x-hidden relative">
                        <div className="right-img">
                          <Image
                            src={images[2]}
                            layout="fill"
                            className="rounded-10 object-cover"
                            alt="itinerary-image"
                          />
                        </div>
                        <div className="absolute bg-black opacity-50 flex items-center p-2 rounded-3xl max-w-max bottom-4 right-5 cursor-pointer">
                          <Icon icon="photos" />
                          <span className="text-xs text-white pl-1" onClick={()=>setShowAll(true)}>
                            See all photos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
        </>
      )}
    </>
  );
}
