import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dashboardData } from "../../../constants/AppConstant";
import { IState } from "../../../model/interfaces/IState";
import { INavigationBar } from "../../../shared/interfaces/INavigationBar";
import { getInitials } from "../../../shared/Utility";
import "./style.scss";
const NavigationBar = () => {
  const navigate = useNavigate();
  const {firstName} = useSelector((state:IState)=>state.user)
  return (
    <div className="navContainer">
      <div className="mainContent">
        {dashboardData.map((data: INavigationBar, index: number) => {
          return (
            <div
              className={`navBox ${window.location.href?.includes(data.navigate)?"selected":""}`}
              key={`${data.name}_${index}`}
              role="button"
              onClick={() => navigate(data.navigate)}
            >
              <div>{data.image}</div>
              <div>{data.name}</div>
            </div>
          );
        })}
      </div>
      <div className="profile">
        <div>{getInitials(firstName)}</div>
      </div>
    </div>
  );
};

export default NavigationBar;
