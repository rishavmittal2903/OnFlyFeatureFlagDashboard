import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai";
import { BsFillEnvelopeFill } from "react-icons/bs";
import SocialMedia from "../../atoms/SocialMedia/SocialMedia";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import logo from "../../../shared/icons/logo.png";

interface IProps {
  actionHandler: (data: any) => void;
}
const SignUp = (props: IProps) => {
  const { actionHandler } = props;
  return (
    <form action="#" onSubmit={actionHandler} className="sign-up-form">
      <div className="signUpLogo">
        <img src={logo} width="150px" height="150px"  alt={"logo"}/>
      </div>
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <AiOutlineUser className="icons" />
        <CustomTextBox type="text" placeholder="Full Name" name="userName" required />
      </div>
      <div className="input-field">
        <BsFillEnvelopeFill className="icons" />
        <CustomTextBox type="email" placeholder="Email" name="email" required />
      </div>
      <div className="input-field">
        <AiTwotoneLock className="icons" />
        <CustomTextBox type="password" placeholder="Password" name="password" required/>
      </div>
      <CustomTextBox type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <SocialMedia />
    </form>
  );
};

export default SignUp;
