import Spinner from '../Spinner';

const Button = ({
  disabled,
  loading,
  btnType,
  btnStyle,
  btnText,
  onClick,
  type = 'button',
}) => {
  if (btnType === 'fill') {
    btnStyle += ' bg-orange text-white';
  } else if (btnType === 'outline') {
    btnStyle += ' border-2 border-orange text-orange';
  }
  return (
    <div>
      <button
        type={type}
        disabled={loading || disabled}
        loading={''}
        className={
          btnType === 'plain'
            ? btnStyle
            : btnStyle +
              ' font-circular-bold px-4 py-2 rounded' +
              ' ' +
              (loading || disabled ? 'bg-opacity-50 cursor-not-allowed' : '')
        }
        onClick={onClick}
      >
        {loading ? <Spinner color={'#fff'} size={1.1} /> : <>{btnText}</>}
      </button>
    </div>
  );
};

export default Button;
