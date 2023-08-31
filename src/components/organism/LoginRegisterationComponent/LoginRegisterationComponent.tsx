import "./style.scss";
import SignIn from "../../molecules/SignIn/SignIn";
import SignUp from "../../molecules/SignUp/SignUp";
import SignBanner from "../../molecules/SignBanner/SignBanner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserState } from "../../../shared/interfaces/IUserState";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../../store/actions/commonAction";
import { registerUser, signInUser } from "../../../store/actions/userAction";
import { IState } from "../../../model/interfaces/IState";
const LoginRegisteration = () => {
  const [isSignUpEnable, toggleSignup] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: IState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signInHandler = (data: any) => {
    data.preventDefault()

    if (data && data?.target) {
      const emailId: string = data.target?.email?.value;
      const password: string = data.target?.password?.value;
      dispatch(toggleLoader(true));
      signInUser(emailId, password, dispatch);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);
  const signUpHandler = (data: any) => {
    data.preventDefault()
    if (data && data?.target) {
      const emailId: string = data.target?.email?.value;
      const password: string = data.target?.password?.value;
      const userName: string = data.target?.userName?.value;
      const userData: IUserState = {
        firstName: userName,
        lastName: userName,
        email: emailId,
        password,
      };
      dispatch(toggleLoader(true));
      registerUser(userData, dispatch);
      toggleSignup((prev) => !prev);
    }
  };
  return (
    <div className={`container ${isSignUpEnable ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {!isSignUpEnable ? (
            <SignIn actionHandler={signInHandler} />
          ) : (
            <SignUp actionHandler={signUpHandler} />
          )}
        </div>
      </div>
      <SignBanner
        isToggleEnable={isSignUpEnable}
        toggleSign={() => toggleSignup((prev) => !prev)}
      />
    </div>
  );
};

export default LoginRegisteration;
