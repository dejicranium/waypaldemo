import Icon from "../../../components/common/Icon";
import DetailTripCard from "../../../components/DetailTripCard";
import PersonalReviews from "../../../components/PersonalReviews";
import TripReviews from "../../../components/TripReviews";
import Tabs from "../../../components/Tabs";
import Footer from "../../../components/common/Footer";
import { useState, useEffect } from 'react';
import { getRequest } from '../../../actions/connection';
import { useRouter } from "next/router";
import UserAvatar from "react-user-avatar";
import Rating from '@mui/material/Rating';
import Modal from "./../../../components/Modal"
import Spinner from "./../../../components/Spinner"


const UserProfile = ({user, trips, notFound}) => {
  const { push } = useRouter();
  const [loading_reviews, setLoadingReviews] = useState(false);
  const [show_reviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [no_reviews, setNoReviews] = useState(false);

  const goTo = async (where) => {
    if (where === 'facebook') {
      window.open(`https://facebook.com/${user.facebook}`)
    }
    else if (where === 'twitter') {
      window.open(`https://twitter.com/${user.twitter}`)
    }
    else if (where === 'instagram') {
      window.open(`https://instagram.com/${user.instagram}`)
    }

  }
  const getReviews = async () => {
      setLoadingReviews(true);
      const reviews = await getRequest(`/user/${user.id}/reviews`);
      if (reviews.status) {
        if (reviews.data.length < 1) {
          setNoReviews(true)
        }
        setReviews(reviews.data)
      }
      else {
        setNoReviews(true)
      }
      setLoadingReviews(false);
  }
  useEffect(() => {
    getReviews()
  }, [])
  if(notFound) {
    push("/404");
  }
  const tabs = [
    {
      name: "PERSONAL",
      render: <PersonalReviews reviews={reviews}  />,
    },
    {
      name: "TRIPS",
      render: <TripReviews reviews={reviews} />,
    },
   
  ];
  return (
    
    <>
    {user && 
      <div>
        <Modal showModal={show_reviews} close={() => setShowReviews(false)}>
          {loading_reviews && (
              <Spinner size={1.7} color={"#EA4524"} />

          )}
          {!loading_reviews && (
            <>
            {reviews && reviews.length > 0 && reviews.map((review, index) => {
              return (
                <div style={{padding: "15px 2px", borderBottom: "0.5px dotted lightgrey"}} key={index}>
                  <Tabs data={tabs} />
                </div>
              
              )
            })}
            </>
          )}
        </Modal>

        <div className="user-profile container lg:flex space-x-8 justify-between mt-14">
          <section className="lg:max-w-xl xl:max-w-3xl">
            <div className="intro">
              <div className="intro-header flex items-center text-3xl">
              <div className="profile-photo flex-none mb-11 md:mb-0 mr-3">
                {user.profile_image_url ? (
                  <>
                    <div
                      className="border border-gray-light7 round-img p-8  mb-6 relative"
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${
                         user.profile_image_url
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
            <div className="socials py-9 border-b border-gray-light6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="reviews flex flex-col" onClick={async() => {
                    if (reviews && reviews.length > 0) {
                      
                        setShowReviews(true)
                      
                    }
                                     
                  }}>
                <Rating name="read-only" value={Number(user.rating / user.no_of_ratings) || 0 } readOnly />
                <div className="flex flex-row mt-2" >
                  <span className="text-gray-light pl-2">{parseFloat((user.rating / user.no_of_ratings) || 0).toFixed(1) } stars</span>
                  <span onClick={async() => {
                    if (reviews && reviews.length > 0) {
                      
                      setShowReviews(true)
                    
                  }                   
                  }} style={{cursor: user.no_of_ratings > 0 ? 'pointer' : '', textDecoration: user.no_of_ratings ? 'underline': 'none' }} className="text-gray-light pl-2">({user.no_of_ratings} {user.no_of_ratings && user.no_of_ratings > 1 ? 'reviews' : 'review'})</span>
                </div>
              </div>
              {/*<div className="links flex items-center">
                <Icon icon="link"></Icon>
                <span className="text-gray-light pl-2">21 Reviews</span>
                    </div>*/}
                {user.facebook && 
                <div className="facebook flex items-center">
                  <Icon icon="facebook-icon" cname="flex-none"></Icon>
                  <span onClick={() =>goTo('facebook')} className="text-gray-light cursor-pointer pl-2 overflow-ellipsis overflow-hidden">
                    {user.facebook}
                  </span>
                </div>}
            
              {user.twitter && 
                <div className="twitter flex items-center">
                  <Icon icon="twitter-icon"></Icon>
                  <span  onClick={() =>goTo('twitter')}  className="text-gray-light cursor-pointer pl-2">@{user.twitter}</span>
                </div>
              }
              {user.instagram && 
                <div className="twitter flex items-center">
                  <Icon icon="instagram-logo"></Icon>
                  <span  onClick={() =>goTo('instagram')}  className="text-gray-light cursor-pointer pl-2">@{user.instagram}</span>
                </div>
              }
            </div>
            <div className="user-trips py-6">
              <h3 className="text-2xl font-circular-bold">{user.firstname}'s Trips</h3>
              {!trips || (trips && trips.length === 0) && (
                <p className="text-xl mt-10">User has not hosted any trips</p>
              )}
              {trips && trips.length > 0 && trips.map((trip, index) => {
                return (

                  <div className="trip-card" key={index}>
                    <DetailTripCard
                        tax={trip.tax_percent}
                        privatelink={false}
                        no_groupchat_view="1"
                        no_dashboard_view="1"
                        no_public_view="1"
                        key={trip.id}
                        title={trip.title}
                        destination={trip.destination}
                        date={trip.start_date}
                        currency={trip.currency}
                        image={trip.images && trip.images[0] ? trip.images[0]: ""}
                        buddies={trip.joined_buddies}
                        price={[
                          trip.travel_amount,
                          trip.accommodation_amount,
                          trip.miscellaneous_amount,
                        ]}
                        slug={trip.slug}
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