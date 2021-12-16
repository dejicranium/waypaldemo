import Icon from "./common/Icon";

const Modal = ({ children, showModal, close, cancellable=true }) => {
  return (
    <>
      {showModal ? (
        <div className="modal-mask fixed z-20 top-0 left-0 w-full h-full table">
          <div className="modal-wrapper table-cell align-middle">
            <div className="modal-container max-w-lg rounded-md p-10 mx-2 relative">
              {cancellable && 
                <Icon
                  cname="cursor-pointer absolute right-4 top-4"
                  icon="close-icon"
                  handleClick={() => close(false)}
                />
              }
              <div className="modal-content overflow-y-scroll md:overflow-y-hidden my-auto set_h">
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
