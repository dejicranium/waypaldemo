import Icon from "./Icon";
import Link from "next/link";
import Button from "./Button";

export default function ShowLuggage() {
  return (
    <div className="plan-trip-upsell h-32 mx-10 px-4 rounded-10 bg-orange mb-12 hidden md:flex">
      <div className="luggage">
        <Icon
          icon="luggage"
          cname="relative bottom-20 left-8 lg:bottom-32 lg:left-8"
        />
      </div>
      <div className="plan-trip flex">
        <div className="plan-trip-text ml-20 flex flex-col justify-center">
          <h3 className="font-circular-black text-xl">Dont fancy this trip?</h3>
          <p className="mr-52 text-sm">
            Plan your own trip. Build, organize, and map out your next best
            trip.
          </p>
        </div>

        <div className="plan-trip-button flex items-center">
          <div className="plan-trip">
            <Link href="/create">
              <a>
                <Button
                  btnText="Plan your trip"
                  btnStyle="bg-white text-orange px-6 py-2.5 rounded mr-4"
                />
              </a>
            </Link>
          </div>
          <p className="text-sm">Learn More</p>
        </div>
      </div>
    </div>
  );
}
