import Link from "next/link";
import { useRouter } from "next/router";
import UserAvatar from "react-user-avatar";

import Icon from "./common/Icon";
import ShareTrip from "../components/ShareTrip"
import TripPhoto from "./TripPhoto";
import { useState, useEffect } from 'react';
import Button from "./common/Button";
import useData from "./hooks/useData";
import { getRequest } from "../actions/connection";
import { formatCurrency, formatAmount } from "../assets/js/utils";
import TravelCostBreakdown from "./TravelCostBreakdown";
import Login from '../components/LogIn';
import Modal from "./Modal";
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import { format } from "date-fns";
import moment from "moment";
import { postRequest } from "../actions/connection";
import { Mixpanel } from "../assets/js/mixpanel";
import JoinChat from "./JoinChat";

const AboutPreview = ({ trip,  }) => {
  const { push } = useRouter();

   const {
    dispatch,
     data: { createTrip, user, tax },
   } = useData();
   

  const [authMode, setAutMode]  = useState('login');
  const [showModal, setShowModal]  = useState(false);
  const [share_modal, showShareModal]  = useState(false);
  const [user_is_buddy, setUserAsBuddy] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    query: { slug },
  } = useRouter();

    
  useEffect(async() => {

  }, []);

  const amount = [
    createTrip.travel_amount,
    createTrip.accommodation_amount,
    createTrip.miscellaneous_amount,
  ];

  const fixDivision = (num) => {
    num = num.toString();
    if (num.indexOf('.') > -1) {
      const index_of_dot = num.indexOf('.');
      const after_dot = num.substring(index_of_dot + 1, 4);
      const significant = num.substring(0, index_of_dot);
      return Number.parseFloat(significant +'.' +after_dot);
    }

    return Number.parseFloat(num).toPrecision(2)
  }
  const subTotal = parseFloat(amount.reduce((acc, obj) => acc + obj, 0));

  const total = parseFloat(subTotal);

  return (
    <>

      <Modal showModal={share_modal} close={() => showShareModal(false)}>
        <ShareTrip trip={trip}/>
      </Modal>
      <Modal showModal={showModal} close={() => setShowModal(false)}>
        {authMode === 'login' && (
          <Login setActive={authMode === 'login'} close={() => setShowModal(false)} />
        )}
        {authMode === 'register' && (
          <Register setActive={authMode === 'register'} close={() => setShowModal(false)} />
        )}
        {authMode === 'forgot' && (
          <ForgotPassword setActive={authMode === 'forgot'} close={() => setShowModal(false)} />
        )}
      </Modal>
      <div className="about-trip lg:flex justify-between lg:space-x-8">
      <section className="trip-details mt-8 lg:w-6/12 sm:w-full ">
        <div className="about-trip-header md:flex md:items-center">
          <h1 className="font-circular-black text-black text-2xl md:pr-14">
            {createTrip.title}
            <span className=""> -</span> {formatCurrency(createTrip.currency)}
            {formatAmount(total)}
          </h1>
          
            
          
        </div>

        <div className="trip-info flex mt-8 justify-between">
          <div  className="profile flex items-center mr-5">
            {!user.profile_image_url && (
              <Icon icon="profile" cname="pr-3 flex-none" />
            )}
            {user.profile_image_url && (
            <UserAvatar
                className="pr-3"
                  size="28"
                  name={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                  color="#5CD6C0"
                  src={user.profile_image_url || ''}
                />
            )}
            <a className="xl:whitespace-nowrap cursor-pointer">{user.firstname + ' ' + user.lastname}</a>
          </div>
          <div  className="buddies flex items-center mr-5">
            <Icon icon="buddies" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap mr-10">
              {createTrip.buddies}{" "}
              {`${createTrip.buddies === 1 ? " Buddy" : " Buddies"}`}{" "}
              {`(0 paid)`}
            </p>
          </div>
          < div  className="date flex items-center mr-5">
            <Icon icon="calendar" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {format(new Date(createTrip.start_date), "MMMM do, y")}
            </p>
          </div>
          <div  className="profile flex items-center justify-end">
            <Icon icon="share"  cname="cursor-pointer" />
          </div>
        </div>

        <div className="trip-description mt-8">
          <p className="max-w-full md:max-w-4xl">{createTrip.description}</p>
        </div>

        <div className="buddies-checklist mt-10">
          <h2 className="font-circular-bold">Buddies Checklist</h2>
          <div className="buddies-list grid md:grid-cols-3 md:gap-8 grid-cols-2">
            {createTrip.checklists && createTrip.checklists.map((item, index) => (
              <div className="flex items-center" key={index}>
                <Icon icon="checkmark" cname="flex-none" />
                <p className="pl-1 whitespace-nowrap">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="meeting-point mt-10 mb-10">
          <h2 className="font-circular-bold ">Meeting point</h2>
          <p className="">{createTrip.meeting_point}</p>
        </div>

       
            
      </section>

      <section className="final-travel-info mt-10 xl:max-w-lg">
        <TripPhoto images={createTrip.images} />
        <div className="travel-cost-breakdown mt-10">
          <TravelCostBreakdown
            currency={createTrip.currency}
            travel={createTrip.travel_amount}
            accommodation={createTrip.accommodation_amount}
            misc={createTrip.miscellaneous_amount}
            total={total}
          />
        </div>
      </section>
    </div>
    </>
  );
};
export default AboutPreview;
