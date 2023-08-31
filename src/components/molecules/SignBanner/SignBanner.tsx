interface IProps {
  toggleSign: () => void;
  isToggleEnable: boolean;
}
const SignBanner = (props: IProps) => {
  const { toggleSign, isToggleEnable } = props;
  return (
    <div className="panels-container">
      {!isToggleEnable ? (
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
                Join Us! To integrate On Fly runtime feature flag functionality for your application!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={toggleSign}
            >
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      ) : (
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Enjoying the On Fly runtime feature flag functionality!
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={toggleSign}
            >
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default SignBanner;
