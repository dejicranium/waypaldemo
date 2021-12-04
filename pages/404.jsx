import Link from "next/link";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="not-found container">
      <div className="mt-14">
        <h1 className="text-3xl md:text-6xl font-circular-bold">
          Hey buddy, are you lost ? 😔
        </h1>
        <p className="pt-6">
          You&apos;re seeing this because the page you tried to navigate to was
          moved, removed, renamed or never even existed.
        </p>

        <div className="mt-10">
          <Link href="/">
            <a>
              <Button btnType="fill" btnText="Go Home" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
