import Rating from '@mui/material/Rating';
import UserAvatar from "react-user-avatar";

function TripReviews({reviews}) {
    return(
        <>
        {reviews && reviews.length > 0 && reviews.map((review, index) => (

            <div style={{padding: "15px 2px", marginTop: "20px", borderBottom: "0.5px dotted lightgrey"}} key={index}>

                <div className="flex flex-row items-center mb-2">
                {!review.reviewer.profile_image_url && (

                    <UserAvatar
                        className="mr-5"
                        size="35"
                        name={`${review.reviewer.firstname.toUpperCase()} ${review.reviewer.lastname.toUpperCase()}`}
                        color="#5CD6C0"
                        //src={profile_image_url || ''}
                    />
                )}

                {review.reviewer.profile_image_url && (
                    <img className="mr-5"  style={{borderRadius: "50%", width: "35px", height: "35px" }} src={review.reviewer.profile_image_url} alt={`${review.reviewer.firstname.toUpperCase()}`}></img>
                )}
                <p>{review.reviewer.firstname} {review.reviewer.lastname}</p>
                </div>
                <div>
                <Rating className="sizeSmall" name="read-only" value={review.trip_rating} readOnly />
                </div>
                <div>
                    <p className="text-sm" style={{fontStyle: 'bold'}}><strong>{review.Trip.title}</strong></p>
                    <p className="text-sm">{review.trip_rating_narration}</p>
                </div>
            </div>
            )
        )}

        
        </>
    )
}


export default TripReviews;
