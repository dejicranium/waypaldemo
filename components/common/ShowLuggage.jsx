import Icon from "./Icon";
import Link from "next/link";
import Button from "./Button";
import useData from '../../components/hooks/useData';
import { useRouter } from "next/router";
import Login from '../../components/LogIn'
import Register from '../../components/Register';
import Modal from '../../components/Modal';
import ForgotPassword from '../../components/ForgotPassword';
import {useState} from 'react';

export default function ShowLuggage() {
  const { push } = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [active, setActive] = useState("login");


  const {
    dispatch,
    data: {
      user,
      isLoggedIn,
    },
  } = useData();

  return (<>
  <Modal showModal={showAuthModal} close={setShowAuthModal}>
      {active === "login" && (
        <Login setActive={setActive} close={() => setShowAuthModal(false)} />
      )}
      {active === "register" && (
        <Register
          setActive={setActive}
          close={() => setShowAuthModal(false)}
        />
      )}
      {active === "forgot" && (
        <ForgotPassword
          setActive={setActive}
          close={() => setShowAuthModal(false)}
        />
      )}
    </Modal>
    <div className="plan-trip-upsell h-32 mx-10 px-4 rounded-10 bg-orange mb-12 hidden md:flex">
      <div className="luggage">
        <Icon
          icon="luggage"
          cname="relative bottom-20 left-8 lg:bottom-32 lg:left-8"
        />
      </div>
      <div className="plan-trip flex">
        <div className="plan-trip-text ml-20 flex flex-col justify-center">
          <h3 className="font-circular-black text-xl">Dont fancy any of these trips?</h3>
          <p className="mr-52 text-sm">
            Plan your own trip. Create, organize, and map out your next best
            trip.
          </p>
        </div>

        <div className="plan-trip-button flex items-center">
          <div className="plan-trip">
              <a>
                <Button
                  onClick={() => {
                    if (isLoggedIn) {
                      push('/create')
                      return 
                    }
                    setShowAuthModal(true)
                  }}
                  btnText="Plan your trip"
                  btnStyle="bg-white text-orange px-6 py-2.5 rounded mr-4"
                />
              </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
