import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { bindDefaultProjectId, toggleLoader } from "../../../store/actions/commonAction";
import { getProjectsByOrgId } from "../../../store/actions/ProjectAction";
import EnvironmentPage from "../../molecules/EnvironmentPage/EnvironmentPage";
import { IState } from "../../../model/interfaces/IState";
import { useEffect } from "react";

const FeatureFlagsEnvironments = () => {
  const dispatch = useDispatch();
  const {projectData} = useSelector((state:IState)=>state.project)

  const organizationChangeHandler = (event: any, type:string) => {
    if (event && event?.target?.value) {
      const id: string = event.target.value;
      if (type === "org") {
        dispatch(toggleLoader(true));
        getProjectsByOrgId(id, dispatch);
      } else {
        dispatch(bindDefaultProjectId(id));
      }
    }
  };
  useEffect(()=>{
    if(projectData.length)
    {
      dispatch(bindDefaultProjectId(projectData[0].projectId));
    }
     // eslint-disable-next-line 
  },[projectData.length])
  return (
    <div className="flexContainer">
      <NavigationBar />
      <InformationBar
        eventHandler={organizationChangeHandler}
      />
      <EnvironmentPage/>
    </div>
  );
};

export default FeatureFlagsEnvironments;
