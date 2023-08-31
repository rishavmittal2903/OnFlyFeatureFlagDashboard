import { useState } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { IOrganization } from "../../../shared/interfaces/IOrganization";
import { IProjectDetail } from "../../../shared/interfaces/IProjectDetail";
import { deleteOrganizationByOrgId, saveOrganization, toggleOrgPopup } from "../../../store/actions/organizationAction";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import { bindOrganizationId, toggleLoader } from "../../../store/actions/commonAction";
import ProjectOrganizationModalContent from "../ProjectOrganizationModalContent/ProjectOrganizationModalContent";
import { useNavigate } from "react-router-dom";
const OrganizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectData} = useSelector((state: IState) => state.project);
  const { organizationData, isOrgPopUpOpen } = useSelector(
    (state: IState) => state.organization
  );
  const { email, firstName } = useSelector((state: IState) => state.user);
  const [filterName, setFilterName] = useState<string>("");
  const filterOrganizationData = (event: any) => {
    const value = event?.target?.value;
    setFilterName(value);
  };

  const onCardClickHandler=(id:string)=>{
    dispatch(toggleLoader(true));
    dispatch(bindOrganizationId(id));
    navigate('/projects');
  }
  const saveHandler = (value: string) => {
    dispatch(toggleLoader(true));
    const orgData: IOrganization = {
      organizationId: uuidv4(),
      organizationName: value,
      owners: [{ email, name: firstName }],
      contributors: [],
      createdBy: email,
      createdOn: new Date().toLocaleString(),
      updatedBy: "",
      updatedOn: "",
    };
    saveOrganization(orgData, dispatch);
  };
  const handleOrgFlag=(flag:boolean)=>{
    dispatch(toggleOrgPopup(flag));
  }
  const deleteHandler=(id:string,name:string)=>{
    dispatch(toggleLoader(true));
   deleteOrganizationByOrgId(id,name,dispatch);
  }
  const orgRoleHandler=(orgData:IOrganization)=>{
    dispatch(toggleLoader(true));
    saveOrganization(orgData,dispatch)
  }
  return (
    <div className="organizationContainer">
      <div className="head">Organizations</div>
      <div className="filterContent">
        <div className="orgBtn">
          <button className="orgActionBtn" onClick={() => handleOrgFlag(true)}>
            <div>
              <BiPlus className="plus" />
            </div>
            <div>New Organization</div>
          </button>
        </div>
        <div className="searchContainer">
          <div className="search-input-field">
            <BiSearch className="searchicons" />
            <CustomTextBox
              type="text"
              placeholder="Search organizations by name"
              name="organization"
              value={filterName}
              onChange={filterOrganizationData}
            />
          </div>
        </div>
      </div>
      <div className="cardContainer">
        <div className="cardWrap">
          {organizationData.map((orgData: IOrganization, keyIndex: number) => {
            if (orgData.organizationName?.includes(filterName)){
              return (
                <Card
                  title={orgData.organizationName}
                  subTitle={`${orgData.organizationName} Organization`}
                  owners={orgData.owners}
                  contributors={orgData.contributors}
                  key={`${orgData.organizationName}_${keyIndex}`}
                  id={orgData.organizationId}
                  data={orgData}
                  roleHandler={orgRoleHandler}
                  onCardClickHandler={onCardClickHandler}
                  deleteHandler={deleteHandler}
                  type="org"
                  project={
                    projectData?.filter(
                      (proj: IProjectDetail) =>
                        proj.organizationId === orgData.organizationId
                    ).length
                  }
                />
              );
                }
                return null;
          })}
        </div>
      </div>
      <ModalPopup
        isOpen={isOrgPopUpOpen}
        isAction={false}
        confirmBtnText="Save and Continue"
        onSaveHandler={() => null}
        onCloseHandler={() => handleOrgFlag(false)}
        modelContentComponent={
          <ProjectOrganizationModalContent
            placeholder={"Organization Name"}
            title="About the Organization"
            saveHandler={saveHandler}
          />
        }
        className=""
      />
       
    </div>
  );
};

export default OrganizationPage;
