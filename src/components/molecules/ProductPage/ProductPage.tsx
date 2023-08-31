import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { HiFlag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toast";
import { IState } from "../../../model/interfaces/IState";
import { IOrganization } from "../../../shared/interfaces/IOrganization";
import {
  IEnvironmentType,
  IProjectDetail,
  IRole,
} from "../../../shared/interfaces/IProjectDetail";
import { RbacPermissions } from "../../../shared/rbac/rbacUtility";
import { encode, getInitials } from "../../../shared/Utility";
import { bindDefaultProjectId, toggleLoader } from "../../../store/actions/commonAction";
import { saveProject } from "../../../store/actions/ProjectAction";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import EnvironmentModalContent from "../EnvironmentModalContent/EnvironmentModalContent";
import RoleModalContent from "../RolesModalContent/RolesModalContent";
import WelcomePage from "../WelcomePage/WelcomePage";
import "./style.scss";

interface IProps {
  projectId: string;
}
const ProductPage = (props: IProps) => {
  const { projectId } = props;
  let projRole: string = "";

  const { projectData } = useSelector((state: IState) => state.project);
  const { email } = useSelector((state: IState) => state.user);

  const navigate = useNavigate();
  const { organizationData } = useSelector(
    (state: IState) => state.organization
  );
  const filteredProjectData: IProjectDetail | any  = projectData.find(
    (data: IProjectDetail) => data.projectId === projectId
  );
  const filteredOrgData: IOrganization | undefined = organizationData.find(
    (data: IOrganization) =>
      data.organizationId === filteredProjectData?.organizationId
  );
  const [isEnvPopOpen, setEnvModalPopup] = useState<boolean>(false);
  const [isProjRolePopupOpen, setProjRolePopup] = useState<boolean>(false);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    setEnvModalPopup(true);
  };
  const toggleProjRolePopup = (roleType: string) => {
    projRole = roleType;
    setProjRolePopup((prev) => !prev);
  };
  const saveEnvironmentHandler = (value: string) => {
    if (filteredOrgData?.organizationId && filteredProjectData && value) {
      const environment: IEnvironmentType = {
        envType: value,
        envId: encode(filteredOrgData?.organizationId, projectId, value),
        flagData: [],
      };
      delete filteredProjectData["_id"];
      if(!filteredProjectData?.environments?.filter((data:IEnvironmentType)=>data.envType === value)?.length)
      {
      filteredProjectData?.environments.push(environment);
      dispatch(toggleLoader(true));
      saveProject(filteredProjectData, dispatch);
      }
      setEnvModalPopup(false);
    }
  };
  const navigateToEnvironments=()=>{
    dispatch(bindDefaultProjectId(projectId));
    navigate('/featureFlag/environments')
  }
  const saveProjRoleHandler = (roleData: IRole) => {
    const userType: string = projRole === "admin" ? "owners" : "contributors";

    const emailExists = filteredProjectData[userType]?.findIndex(
      (rData: IRole) => rData.email === roleData.email
    );
    if (emailExists !== -1) {
      toast.error(`${roleData.email} email id already exists`);
    } else {
      filteredProjectData[userType]?.push(roleData);
      delete filteredProjectData["_id"];
      dispatch(toggleLoader(true));
      saveProject(filteredProjectData, dispatch);
    }
  };
  return (
    <div className="productPageContainer">
      <div className="productPageHeaderContainer">
        <div className="productPageHeader">
          <div className="productTitle rightBorder">
            Id: {filteredProjectData?.projectName}{" "}
          </div>{" "}
          <div className="productTitle rightBorder">
            Organization: {filteredOrgData?.organizationName}{" "}
          </div>
          <div className="productTitle">
            Created On {filteredProjectData?.createdOn}
          </div>
        </div>
        <div className="productPageMembers">
          <div className="productPageProductTitle">
            {filteredProjectData?.projectName}
          </div>
          <div className="ownersContainer">
            <div className="productcardMembers">
              <div className="productmembersTitle">
                Admin {filteredProjectData?.owners?.length}
              </div>

              <div className="productmembers">
                <div className="productinitial">
                  {getInitials(filteredProjectData?.owners[0]?.name || "")}
                </div>
                {RbacPermissions.isUserProjectAdmin(filteredProjectData, email) &&<div className="productmemberPlus" onClick={()=>toggleProjRolePopup("admin")}>
                  <BsPlus />
                </div>}
              </div>
            </div>
            {RbacPermissions.isUserProjectAdmin(filteredProjectData, email) &&<div className="productcardMembers">
              <div className="productmembersTitle">Collaborators</div>

              <div className="productmembers">
                <div className="productinitial">
                  {getInitials(
                    filteredProjectData?.contributors[0]?.name || ""
                  )}
                </div>
                <div className="productmemberPlus" onClick={()=>toggleProjRolePopup("contributor")}>
                  <BsPlus />
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="productPageMainContent" onClick={()=>navigateToEnvironments()}>
        <div className="envCount">Environments</div>
        <div className="environmentCard">
          <div className="flexEnd">
            <HiFlag />
          </div>
          <div className="envCount">
            {filteredProjectData?.environments?.length}
          </div>
          <div className="env">Environments</div>
        </div>
      </div>
      <WelcomePage
        title={`Environments! let's get you started!`}
        subTitle="Create environments for the project to use the OnFly feature flag functionality"
        btnName="Environment"
        onClickHandler={onClickHandler}
      />
      <ModalPopup
        isOpen={isEnvPopOpen}
        isAction={false}
        confirmBtnText="Save and Continue"
        onSaveHandler={() => null}
        onCloseHandler={() => setEnvModalPopup(false)}
        modelContentComponent={
          <EnvironmentModalContent
            onSaveHandler={saveEnvironmentHandler}
            onCloseHandler={() => setEnvModalPopup(false)}
          />
        }
        className=""
      />
      <ModalPopup
        isOpen={isProjRolePopupOpen}
        isAction={false}
        onCloseHandler={() => setProjRolePopup(false)}
        modelContentComponent={
          <RoleModalContent
            role={projRole}
            btnText={"Add Role"}
            saveHandler={saveProjRoleHandler}
          />
        }
        className=""
      />
    </div>
  );
};

export default ProductPage;
