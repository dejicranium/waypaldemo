import Icon from "../../../components/common/Icon";
import DetailTripCard from "../../../components/DetailTripCard";
import RecommendedTrips from "../../../components/RecommendedTrips";
import Footer from "../../../components/common/Footer";
import { useState, useEffect } from 'react';
import { getRequest } from '../../../actions/connection';
import { useRouter } from "next/router";
import UserAvatar from "react-user-avatar";
import Rating from '@mui/material/Rating';


const UserProfile = ({user, trips, notFound}) => {
  const { push } = useRouter();

  if(notFound) {
    push("/404");
  }
  
  return (
    
    <>
    {user && 
    
      <div className="user-profile container lg:flex space-x-8 justify-between mt-14">
        <section className="lg:max-w-xl xl:max-w-3xl">
          <div className="intro">
            <div className="intro-header flex items-center text-3xl">
            <div className="profile-photo flex-none mb-11 md:mb-0 mr-3">
              {user.profile_image_url ? (
                <>
                  <div
                    className="border border-gray-light7 rounded p-8 h-36 md:h-24 mb-6 relative max-w-1/2"
                    style={{
                      backgroundSize: "cover",
                      backgroundImage: `url(${
                        profileImage || user.profile_image_url
                      })`,
                      backgroundPosition: "top center",
                    }}
                  ></div>
                </>
                  ) : (
                    <UserAvatar
                      size="100"
                      name={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                      color="#5CD6C0"
                      className="text-5xl"
                    />
                  )}
                    
              </div>
                  
              <h2 className="text-orange pl-6">{user.firstname} {user.lastname}</h2>
            </div>
            <div className="intro-text text-lg text-gray-light4 pt-5 pb-8 border-b border-gray-light6">
              <p>
                {user.bio}
                {/*<span className="text-orange">My trips</span>.*/}
              </p>
            </div>
          </div>
          <div className="socials py-9 border-b border-gray-light6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="reviews flex items-center">
              <Rating name="read-only" value={(user.rating / user.no_of_ratings) || 0 } readOnly />

              <span className="text-gray-light pl-2">{parseFloat((user.rating / user.no_of_ratings) || 0).toFixed(1) } stars</span>
              <span className="text-gray-light pl-2">{user.no_of_ratings} {user.no_of_ratings && user.no_of_ratings > 1 ? 'reviews' : 'review'}</span>
            </div>
            {/*<div className="links flex items-center">
              <Icon icon="link"></Icon>
              <span className="text-gray-light pl-2">21 Reviews</span>
                  </div>*/}
            {user.facebook && 
              <div className="facebook flex items-center">
                <Icon icon="facebook-icon" cname="flex-none"></Icon>
                <span className="text-gray-light pl-2 overflow-ellipsis overflow-hidden">
                  facebook.com/jagaban
                </span>
              </div>
            }
            {user.twitter && 
              <div className="twitter flex items-center">
                <Icon icon="twitter-icon"></Icon>
                <span className="text-gray-light pl-2">@{user.twitter}</span>
              </div>
            }
          </div>
          <div className="user-trips py-6">
            <h3 className="text-2xl font-circular-bold">{user.firstname} Trips</h3>
            {trips && trips.length > 0 && trips.map((trip, index) => {
              return (

                <div className="trip-card" key={index}>
                  <DetailTripCard
                      key={trip.id}
                      title={trip.title}
                      destination={trip.destination}
                      date={trip.start_date}
                      image={trip.images && trip.images[0] ? trip.images[0]: ""}
                      buddies={trip.joined_buddies}
                      price={[
                        trip.travel_amount,
                        trip.accommodation_amount,
                        trip.miscellaneous_amount,
                      ]}
                      slug={trip.slug}
                      options
                    />
                    
                </div>
              )
            })}

          </div>
        </section>

        <section className="recommended-trips hidden lg:block flex-none min-w-400">
          {/*<RecommendedTrips />*/}
        </section>
      </div>
      }
      <Footer />
    </>
  );
};


export default UserProfile;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const url = `${process.env.NEXT_PUBLIC_API_LOCATION}/user/${id}`;
  const user =  await getRequest(url);
  if (user.status) {
    return {
      props: {
        user: user.data,
        trips: user.data.trips
      },
    };
  }
  return {
    props: {
      notFound: true,
    },
  };
}