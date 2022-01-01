
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";
import Toast from "../../../components/Toast";
import { useEffect, useState } from "react";
import InputField from '../../../components/InputField'
import Button from '../../../components/common/Button'
import { postRequest, getRequest } from '../../../actions/connection'
import { parse } from "date-fns";
import Spinner from "../../../components/Spinner";
import { useFormState } from "react-hook-form";
import { useRouter } from "next/router";

const  ReviewTripAndCreator = ()  =>{
    const router = useRouter();
    const { isReady } = useRouter();

    const [loading, setLoading] = useState(true)
    const [trip, setTrip] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [creator_rating, setCreatorRating] = useState(0);
    const [creator_rating_narration, setCreatorRatingNarration] = useState('');

    const [trip_rating, setTripRating] = useState(0);
    const [trip_rating_narration, setTripRatingNarration] = useState('');

    const {slug}= router.query;
    useEffect(async() => {
        if (!slug) {
            return;
        }
        const result = await getRequest(`/trip/by/slug/${slug}`);
        if (result.status) {
            setLoading(false)
            setTrip(result.data);
        }
        else {
            setLoading(false);
        }
    
        
    }, [slug])
    return (
        <> 
        {error && (
         <Toast message={error} type="error" close={() => setError(null)} />
        )}
        {success && (
            <Toast message={success} type="success" close={() => setSuccess(null)} />

        )}
        <div className="container mt-14 lg:w-6/12 md:w-5/12 sm:w-12/12">
            {loading && 
                <Spinner size={1.7} color={"#EA4524"} />
            }
            {!loading && !submitted && trip && trip.user &&
                <>

                <div className="flex flex-col mb-10">
            <p>How would you rate the creator of the trip ({trip.user.firstname} {trip.user.lastname})?  <span className="text-red">*</span> </p>
                    <ReactStars
                        count={5}
                        size={24}
                        onChange={setCreatorRating}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        
                        activeColor="#ffd700"
                    />
                </div>
                <div className="flex flex-col mb-16">
                    <p>Please, explain your thoughts on {trip.user.firstname} {trip.user.lastname}</p>
                    <textarea onChange={(e) => setCreatorRatingNarration(e.target.value)} rows="5" style={{resize: 'none'}} className="input-element"></textarea>         
                </div>
                <div className="flex flex-col mb-10">
                    <p>How would you rate your trip? <span className="text-red">*</span> </p>
                    <ReactStars
                        count={5}
                        size={24}
                        onChange={setTripRating}
                        changeRating={null}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="flex flex-col mb-16">
                    <p>Please, explain your thoughts on the trip</p>
                    <textarea onChange={(e) => setTripRatingNarration(e.target.value)} rows="5" style={{resize: 'none'}} className="input-element"></textarea>         
                </div>
                <Button 
                btnText="Submit Review"
                btnType="fill"
                onClick={async() => {
                    setSuccess('');
                    setError('');
                    setLoading('true');
                    const result = await postRequest('/review',{   
                        trip_slug: router.query.slug,
                        reviewer_user_id: new URLSearchParams(window.location.search) ? parseInt(new URLSearchParams(window.location.search).get('uid')) : null,
                        trip_rating,
                        trip_rating_narration,
                        creator_rating,
                        creator_rating_narration
                    })
                    
                    if (result.status) { 
                        setSubmitted(true);
                        setLoading(false)
                        setSuccess("You've successfully entered a review for this trip")
                    } else {
                        setLoading(false)
                        setSubmitted(false);
                        setError(result.message)
                    }

                }}></Button>
                </>
            }
        </div>

        </>

    )
}

export default ReviewTripAndCreator;