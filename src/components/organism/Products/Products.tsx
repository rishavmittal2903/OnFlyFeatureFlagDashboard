import InformationBar from "../../molecules/InformationBar/InformationBar";
import NavigationBar from "../../molecules/NavigationBar/NavigationBar";
import ProductPage from "../../molecules/ProductPage/ProductPage";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProjectsByOrgId } from "../../../store/actions/ProjectAction";
import { toggleLoader } from "../../../store/actions/commonAction";
import ProductsPage from "../../molecules/ProductsPage/ProductsPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";

const Products = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const {defaultOrgId} = useSelector((state:IState)=>state.common)
  const navigate= useNavigate();
  const organizationChangeHandler = (event: any, type:string) => {
    if (event && event?.target?.value) {
      navigate('/projects');
      const orgId: string = event.target.value;
      dispatch(toggleLoader(true));
      getProjectsByOrgId(orgId, dispatch);
    }
  };
  useEffect(()=>{
    getProjectsByOrgId(defaultOrgId, dispatch);
     // eslint-disable-next-line 
  },[])
  return (
    <div className="flexContainer">
      <NavigationBar />
      <InformationBar
        eventHandler={organizationChangeHandler}
      />
      {projectId ? (
        <ProductPage projectId={projectId}/>
      ) : (
        <ProductsPage
        />
      )}
    </div>
  );
};

export default Products;
