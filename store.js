export const init = {
  user: {
    id: 0,
    uuid: "",
    email: "",
    lastname: "",
    firstname: "",
    profile_image_url: null,
  },
  token: "",
  isLoggedIn: false,
  createTrip: {
    title: "",
    buddies: 0,
    images: [],
    end_date: "",
    currency: "USD",
    start_date: "",
    checklists: [],
    destination: "",
    itineraries: [],
    description: "",
    phone_number: "",
    travel_amount: 0,
    meeting_point: "",
    accommodation_amount: 0,
    miscellaneous_amount: 0,
  },
  currentTrip: {
    trip_id: 0,
    checklists: [],
    images: [],
    itineraries: [],
    id: 0,
    trip_no: "",
    title: "",
    slug: "",
    destination: "",
    buddies: 0,
    joined_buddies: 0,
    start_date: "",
    end_date: "",
    description: "",
    meeting_point: "",
    phone_number: "",
    currency: "",
    travel_amount: 0,
    accommodation_amount: 0,
    miscellaneous_amount: 0,
    is_delisted: false,
    total_paid_amount: 0,
    is_promoted: false,
    user_id: 0,
  },
};
