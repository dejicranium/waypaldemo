import Link from "next/link";
import { useRouter } from "next/router";

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

const About = ({ trip,  }) => {
  const { push } = useRouter();

   const {
    dispatch,
     data: { currentTrip, user },
   } = useData();

  const [authMode, setAutMode]  = useState('login');
  const [showModal, setShowModal]  = useState(false);
  const [user_is_buddy, setUserAsBuddy] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    query: { slug },
  } = useRouter();

    
  useEffect(async() => {

      let buddies  = await getRequest(`/trip/${trip.id}/buddies`);
      buddies = buddies.data;

      if (buddies && buddies.length > 0) {
        const exists = buddies.find(b => b.user_id === user.id)
        if (exists) {
          setUserAsBuddy(true)
        }
        else {
          setUserAsBuddy(false)
        }
      }
      setLoading(false)
       
  
  }, []);

  const amount = [
    trip.travel_amount,
    trip.accommodation_amount,
    trip.miscellaneous_amount,
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

  const total = parseFloat(subTotal) + fixDivision((subTotal / 100) * 7.5);

  return (
    <>
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
            {trip.title}
            <span className=""> -</span> {formatCurrency(trip.currency)}
            {formatAmount(total)}
          </h1>
          
            <div className="">
                    {trip.user_id !== user.id && !user_is_buddy && !loading &&
                      <Button
                        onClick={() => {
                          setAutMode("register")
                          push(`/trip/${trip.slug}/join`)
                          
                          if (user && user.id) Mixpanel.identify(user.id);
                          Mixpanel.track("join-trip-clicked", { 
                            trip_id: trip.id,
                            trip_title: trip.title,
                            trip_destination: trip.destination,
                            trip_total_amount: parseFloat(trip.travel_amount) + parseFloat(trip.miscellaneous_amount) + parseFloat(trip.accommodation_amount),
                          })
                        }}

                        btnStyle="bg-orange font-circular-bold text-white px-4 py-2 mt-3 md:mt-0 rounded"
                        btnText="Join this trip"
                      />
                    }
                  
              
            </div>
          
        </div>

        <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8">
          <div className="profile flex items-center">
            <Icon icon="profile" cname="pr-3 flex-none" />
            <a className="xl:whitespace-nowrap cursor-pointer" onClick={() => push(`/user/${trip.user_id}`)}>{trip.user.firstname + ' ' + trip.user.lastname}</a>
          </div>
          <div className="buddies flex items-center">
            <Icon icon="buddies" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {trip.buddies}{" "}
              {`${trip.buddies.length === 1 ? " Buddy" : " Buddies"}`}{" "}
              {`(${trip.joined_buddies} paid)`}
            </p>
          </div>
          <div className="date flex items-center">
            <Icon icon="calendar" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">
              {format(new Date(trip.start_date), "MMMM do, y")}
            </p>
          </div>
          <div className="profile flex items-center justify-end">
            <Icon icon="like" cname="pr-3 cursor-pointer" />
            <Icon icon="share" cname="cursor-pointer" />
          </div>
        </div>

        <div className="trip-description mt-8">
          <p className="max-w-full md:max-w-4xl">{trip.description}</p>
        </div>

        <div className="buddies-checklist mt-10">
          <h2 className="font-circular-bold">Buddies Checklist</h2>
          <div className="buddies-list grid md:grid-cols-3 md:gap-8 grid-cols-2">
            {trip.checklists && trip.checklists.map((item, index) => (
              <div className="flex items-center" key={index}>
                <Icon icon="checkmark" cname="flex-none" />
                <p className="pl-1 whitespace-nowrap">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="meeting-point mt-10">
          <h2 className="font-circular-bold ">Meeting point</h2>
          <p className="">{trip.meeting_point}</p>
        </div>
      </section>

      <section className="final-travel-info mt-10 xl:max-w-lg">
        <TripPhoto images={trip.images} />
        <div className="travel-cost-breakdown mt-10">
          <TravelCostBreakdown
            currency={trip.currency}
            travel={trip.travel_amount}
            accommodation={trip.accommodation_amount}
            misc={trip.miscellaneous_amount}
            total={total}
          />
        </div>
      </section>
    </div>
    </>
  );
};
export default About;
