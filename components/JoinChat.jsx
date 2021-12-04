import Icon from "./common/Icon";
import Button from "./common/Button";
import Link from "next/link";

const JoinChat = () => {
  return (
    <div className="flex bg-orange-white py-8 px-4 rounded border border-gray-light6 max-w-2xl">
      <Icon icon="group-chat" cname="hidden md:block pr-8"></Icon>
      <div className="join-chat">
        <p className="max-w-md">
          Join the conversation with the other travel buddies for this trip to
          be up-to-date on the progress of this trip.
        </p>
        <div className="mt-4">
          <Link href="/messaging">
            <a>
              <Button btnType="fill" btnText="Join group chat" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinChat;
