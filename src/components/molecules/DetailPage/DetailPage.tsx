import "./style.scss";
import WelcomePage from "../WelcomePage/WelcomePage";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import { useNavigate } from "react-router";
const DetailPage = () => {
  const isHomePage: boolean = window.location.href.includes("home")
    ? true
    : false;  const {firstName} = useSelector((state:IState)=>state.user)
    const navigate = useNavigate();
  return (
    <div className="detailContainer">
      {isHomePage && (
        <WelcomePage
          title={` Welcome ${firstName}, let's get you started!`}
          subTitle="Take your software delivery processes to the next level using our
          Harness modules"
          btnName="Organization"
          onClickHandler={()=>navigate('/organization')}
        />
      )}
    </div>
  );
};

export default DetailPage;
