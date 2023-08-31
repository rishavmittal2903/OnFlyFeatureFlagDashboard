import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import OrganizationPage from "../../molecules/OrganizationPage/OrganizationPage";
import "./style.scss";
const Organization = () => {
  const { organizationData } = useSelector(
    (state: IState) => state.organization
  );
  return (
    <div className="flexContainer">
      <NavigationBar />
        <InformationBar
        />
        <OrganizationPage
        />
    </div>
  );
};

export default Organization;
