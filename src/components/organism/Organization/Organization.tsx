import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import OrganizationPage from "../../molecules/OrganizationPage/OrganizationPage";
import "./style.scss";
const Organization = () => {
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
