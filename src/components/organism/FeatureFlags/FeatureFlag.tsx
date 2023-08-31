import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import { useDispatch } from "react-redux";
import {
  bindDefaultEnvType,
  bindDefaultProjectId,
  toggleLoader,
} from "../../../store/actions/commonAction";
import { getProjectsByOrgId } from "../../../store/actions/ProjectAction";
import FeatureFlagPage from "../../molecules/FeatureFlagPage/FeatureFlagPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";

const FeatureFlag = () => {
  const dispatch = useDispatch();
  const {projectData} = useSelector((state:IState)=>state.project)

  const organizationChangeHandler = (event: any, type: string) => {
    if (event && event?.target?.value) {
      const id: string = event.target.value;
      if (type === "org") {
        dispatch(toggleLoader(true));
        getProjectsByOrgId(id, dispatch);
      } else {
        dispatch(bindDefaultProjectId(id));
      }
      dispatch(bindDefaultEnvType());
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
      <InformationBar eventHandler={organizationChangeHandler} />
      <FeatureFlagPage />
    </div>
  );
};

export default FeatureFlag;
