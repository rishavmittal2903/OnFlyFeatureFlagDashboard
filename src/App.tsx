import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toast";
import { Loader } from "./components/atoms/Loader/Loader";
import { IState } from "./model/interfaces/IState";
import NavigationRouter from "./shared/Routing/NavigationRouter";
import { toggleLoader } from "./store/actions/commonAction";
import { getOragnizationsData } from "./store/actions/organizationAction";
import { getProjectsByOrgId } from "./store/actions/ProjectAction";

const App = () => {
  const { isLoading } = useSelector((state: IState) => state.common);
  const { email } = useSelector((state: IState) => state.user);

  const { organizationData } = useSelector(
    (state: IState) => state.organization
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if(email){
    dispatch(toggleLoader(true));
    getOragnizationsData(email, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [organizationData.length,email]);
  React.useEffect(() => {
    if (organizationData.length) {
      dispatch(toggleLoader(true));
      getProjectsByOrgId(organizationData[0].organizationId, dispatch);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
// eslint-disable-next-line
  }, [organizationData.length]);
  return (
    <>
      <NavigationRouter />
      {isLoading && <Loader />}
      <ToastContainer delay={3000} position={"top-right"}/>
    </>
  );
};

export default App;
