import {io} from "socket.io-client";
import UserAvatar from "react-user-avatar";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useChannel } from '../../../components/hooks/AblyEffect';
import useData from "../../../components/hooks/useData";
import Button from "../../../components/common/Button";
import ChatSideBar from "../../../components/ChatSidebar";
import { getRequest, postRequest } from "../../../actions/connection";

import dynamic from 'next/dynamic'



const Messaging = ({ trip, messages, notFound }) => {
  /*const socket = io('/', {
    rejectUnauthorized: false
  });*/

  const {
    data: { user },
  } = useData();

  const { push } = useRouter();
  if ( trip && trip.user_id !== user.id && trip.buddieslist.filter(b => b.user_id === user.id).length < 1) {
    console.log("USER HAS NO BUSINESS")
    push("/404");

  }
  if (notFound) {
    console.log("not found")
    push("/404");
  }
  const [channel, ably] = useChannel(`${trip.id}-messages`, (message) => {
    setMessageList([...messageList,message]);
    var element = document.getElementById('chatarea');
    element.scrollTop = element.scrollHeight - element.clientHeight;
  })
  const [chatMessage, setChatMessage] = useState("");
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    
    if (notFound) {
      return;
    }

    
    setMessageList(messages);
    var element = document.getElementById('chatarea');
    element.scrollTop = element.scrollHeight - element.clientHeight;
    /*socket.emit("join_room", trip.id);
    socket.on("connect_error", (err) => {
      console.log(`connect error due to ${err.message}`)
    })
    socket.on("trip", async (tripData) => {
      const newMessages = [...messageList, tripData.message];
      setMessageList(newMessages);
    });*/
  }, []);

  const sendMessage = async () => {
    if (chatMessage.trim() === "") return;
    const tripMessage = await postRequest("chat/create", {
      trip_id: trip.id,
      message: chatMessage,
    });
    if (tripMessage.status) {
      const userMessage = {
            "id": tripMessage.id,
            "message": chatMessage,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "user_id": user.id,
            "trip_id": trip.id,
            "User": {
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "profile_image_url": user.profile_image_url,
            }
      }
      //socket.emit("trip_route", { message: userMessage, id: trip.id, user });
      channel.publish({name: `${trip.id}-${process.env.NODE_ENV}-messages`, data: userMessage})
      setChatMessage("");
    } else {
      console.log("an error occured");
    }
  };

  return (
    <>
      {!notFound && (
        <>
          <div className="container mt-14 md:flex md:space-x-8">
            <aside className="max-w-xs hidden md:block">
              <ChatSideBar trip={trip} />
            </aside>

            <section className="chat w-full md:w-3/4 mb-5">


              <div id="chatarea" className="chat-area overflow-y-scroll h-60v md:h-70v">
                {messageList.map((data, index) => (
                  <div key={index}>
                    {/* User message */}
                      <div className={data.user_id === user.id ? 'flex items-start justify-end px-2' : 'flex items-start justify-start px-2'}>
                        {data.user_id !== user.id && (
                          <div className="pr-2">
                            <UserAvatar
                              size="48"
                              name={`${data.User.firstname} ${data.User.lastname}`}
                              color="#5CD6C0"
                              src={
                                data.User.profile_image_url
                                  ? data.User.profile_image_url
                                  : ""
                              }
                          />
                          </div>
                        )}
                        <div className={data.user_id === user.id ? 'bg-orange text-white p-3 mb-5 rounded-2xl rounded-tr-md' : 'bg-blue text-white p-3 mb-5 rounded-2xl rounded-tr-md'}>
                          <p>{data.message}</p>
                        </div>
                        {data.user_id === user.id && (
                          <div className="pl-2">
                          <UserAvatar
                            size="48"
                            name={data.user_id === user.id ? `${user.firstname} ${user.lastname}` : `${data.User.firstname} ${data.User.lastname}`}
                            color="#5CD6C0"
                            src={data.user_id === user.id ? user.profile_image_url || "" : data.User.profile_image_url || ""}
                              
                          />
                         </div>

                        )}
                        
                      </div>
                    
                  </div>
                ))}
              </div>
              {/* chatbox */}
              <div className="chat-input rounded border border-gray-light7 p-1 bg-white flex w-full mt-4">
                <input
                  placeholder="Type your message"
                  className="outline-none box-border text-black-content w-full"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <div className="smiley flex mr-4 justify-center items-center">
                  <Button
                    btnText="Send"
                    btnType="fill"
                    onClick={sendMessage}
                    disabled={chatMessage === ""}
                  />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Messaging;

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const tripData = await getRequest(`${process.env.NEXT_PUBLIC_API_LOCATION}/trip/by/slug/${slug}`);

  if (tripData.status) {
    const tripMessages = await getRequest(`/trip/${tripData.data.id}/chats`);

    return {
      props: {
        trip: tripData.data,
        messages: tripMessages.data,
      },
    };
  }
  return {
    props: {
      notFound: true,
    },
  };
}
