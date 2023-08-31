import DetailPage from "../../molecules/DetailPage/DetailPage";
import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import "./style.scss"
const Home = () => {
  return <div className="flexContainer">
      <NavigationBar />
  <InformationBar/>
  <DetailPage/>
  </div>
};

export default Home;
