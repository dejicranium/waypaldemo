import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "./common/Icon";
import TripPhoto from "./TripPhoto";
import { useState } from 'react';
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

const About = ({ trip, user_is_owner=false }) => {
  // const {
  //   dispatch,
  //   data: { currentTrip },
  // } = useData();

  const [authMode, setAutMode]  = useState('login');
  const [showModal, setShowModal]  = useState(false);
  const {
    query: { slug },
  } = useRouter();

  // const setCurrentTrip = async () => {
  //   const trip = await getRequest(`/trip/by/slug/${slug}`);
  //   if (trip.status) {
  //     dispatch({ currentTrip: { ...trip.data } });
  //   }
  // };

  const amount = [
    trip.travel_amount,
    trip.accommodation_amount,
    trip.miscellaneous_amount,
  ];

  const subTotal = amount.reduce((acc, obj) => acc + obj, 0);

  const total = subTotal + (subTotal / 100) * 7.5;

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
      <section className="trip-details mt-8 w-6/12 ">
        <div className="about-trip-header md:flex md:items-center">
          <h1 className="font-circular-black text-black text-2xl md:pr-14">
            {trip.title}
            <span className="">-</span> {formatCurrency(trip.currency)}
            {formatAmount(total)}
          </h1>
          <div className="">
            <Link href={`${slug}/join`}>
              <a>
                <Button
                  onClick={() => {
                    //setAutMode("register")
                  }}
                  btnStyle="bg-orange font-circular-bold text-white px-4 py-2 mt-3 md:mt-0 rounded"
                  btnText="Join this trip"
                />
              </a>
            </Link>
          </div>
        </div>

        <div className="trip-info grid md:grid-cols-4 md:gap-8 grid-cols-2 mt-8 w-full">
          <div className="profile flex items-center">
            <Icon icon="profile" cname="pr-3 flex-none" />
            <p className="xl:whitespace-nowrap">Felix Obinna</p>
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
          
        </div>

        <div className="trip-description mt-8">
        <h2 className="font-circular-bold">Description</h2>
          <p className="max-w-full text-gray md:max-w-4xl">{trip.description}</p>
        </div>
        
        {/*
        <div className="buddies-checklist mt-10">
          <h2 className="font-circular-bold">Buddies Checklist</h2>
          <div className="buddies-list grid md:grid-cols-3 md:gap-8 grid-cols-2">
            {trip?.checklists?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <Icon icon="checkmark" cname="flex-none" />
                <p className="pl-1 whitespace-nowrap">{item}</p>
              </div>
            ))}
          </div>
            </div> */}

        <div className="meeting-point mt-10">
          <h2 className="font-circular-bold">Meeting point</h2>
          <p className="text-gray">{trip.meeting_point}</p>
        </div>

        <div className="travel-cost-breakdown mt-10">
          <TravelCostBreakdown
            currency={trip.currency}
            travel={trip.travel_amount}
            accommodation={trip.accommodation_amount}
            misc={trip.miscellaneous_amount}
            total={total}
          />
        </div>
        {user_is_owner && user_is_owner === true &&
        <div className="mt-10">
            <Link href={`${slug}/join`}>
              <a>
                <Button
                  btnStyle="bg-orange font-circular-bold text-white px-4 py-2 mt-3 md:mt-0 rounded"
                  btnText="Request for funds"
                />
              </a>
            </Link>
          </div>
        }
      </section>
      
    </div>
    </>
  );
};
export default About;
