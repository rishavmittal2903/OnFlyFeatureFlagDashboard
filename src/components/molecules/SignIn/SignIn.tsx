import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import { AiOutlineUser, AiTwotoneLock } from "react-icons/ai";
import SocialMedia from "../../atoms/SocialMedia/SocialMedia";
import logo from "../../../shared/icons/logo.png";

interface IProps {
  actionHandler: (data: any) => void;
}
const SignIn = (props: IProps) => {
  const { actionHandler } = props;
  return (
    <form onSubmit={actionHandler} className="sign-in-form">
      <div className="companyLogo">
        <img src={logo} width="100px" height="100px" alt={"logo"} />
      </div>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <AiOutlineUser className="icons" />
        <CustomTextBox type="email" placeholder="Email" name="email" required/>
      </div>
      <div className="input-field">
        <AiTwotoneLock className="icons" />
        <CustomTextBox type="password" placeholder="Password" name="password" required/>
      </div>
      <CustomTextBox type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <SocialMedia />
    </form>
  );
};

export default SignIn;
