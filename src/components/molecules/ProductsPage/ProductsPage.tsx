import { useState } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../model/interfaces/IState";
import { IProjectDetail } from "../../../shared/interfaces/IProjectDetail";
import {
  bindDefaultProjectId,
  toggleLoader,
} from "../../../store/actions/commonAction";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import ProjectOrganizationModalContent from "../ProjectOrganizationModalContent/ProjectOrganizationModalContent";
import "./style.scss";
import {
  deleteProjectByOrgIdAndProjId,
  saveProject,
  toggleProjPopup,
} from "../../../store/actions/ProjectAction";
const ProductsPage = () => {
  const { projectData, isProjectPopUpOpen } = useSelector(
    (state: IState) => state.project
  );
  const { organizationData } = useSelector(
    (state: IState) => state.organization
  );
  const [filterName, setFilterName] = useState<string>("");
  const { defaultOrgId } = useSelector((state: IState) => state.common);
  const { email, firstName } = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterOrganizationData = (event: any) => {
    const value = event?.target?.value;
    setFilterName(value);
  };
  const onCardClickHandler = (projectId: string) => {
    dispatch(bindDefaultProjectId(projectId));
    navigate(`/projects/${projectId}`);
  };
  const saveHandler = (value: string, orgId?: string) => {
    dispatch(toggleLoader(true));
    if (orgId && value) {
      const projectData: IProjectDetail = {
        organizationId: orgId,
        projectId: uuidv4(),
        projectName: value,
        environments: [],
        owners: [{ email, name: firstName }],
        contributors: [],
        createdBy: email,
        createdOn: new Date().toLocaleString(),
        updatedBy: "",
        updatedOn: "",
      };
      saveProject(projectData, dispatch);
    }
  };
  const handleProjFlag = (flag: boolean) => {
    dispatch(toggleProjPopup(flag));
  };
  const deleteProjHandler = (id: string, name: string) => {
    dispatch(toggleLoader(true));
    deleteProjectByOrgIdAndProjId(defaultOrgId, id, name, dispatch);
  };
  const projRoleHandler=(projData:IProjectDetail)=>{
    dispatch(toggleLoader(true));
    saveProject(projData,dispatch);
  }
  return (
    <div className="organizationContainer">
      <div className="head">Projects</div>
      <div className="filterContent">
        <div className="orgBtn">
          <button className="orgActionBtn" onClick={() => handleProjFlag(true)}>
            <div>
              <BiPlus className="plus" />
            </div>
            <div>New Project</div>
          </button>
        </div>
        <div className="searchContainer">
          <div className="search-input-field">
            <BiSearch className="searchicons" />
            <CustomTextBox
              type="text"
              placeholder="Search projects by name"
              name="organization"
              value={filterName}
              onChange={filterOrganizationData}
            />
          </div>
        </div>
      </div>
      <div className="cardContainer">
        <div className="cardWrap">
          {/** eslint-disable-next-line */}
          {projectData?.map((project: IProjectDetail, keyIndex: number) => {
            if (project.projectName?.includes(filterName)) {
              return (
                <Card
                  title={project.projectName}
                  subTitle={`${project.projectName} Project`}
                  owners={project.owners}
                  key={`${project.projectName}_${keyIndex}`}
                  project={0}
                  type="proj"
                  data={project}
                  roleHandler={projRoleHandler}
                  deleteHandler={deleteProjHandler}
                  id={project.projectId}
                  contributors={project.contributors}
                  onCardClickHandler={onCardClickHandler}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      <ModalPopup
        isOpen={isProjectPopUpOpen}
        isAction={false}
        confirmBtnText="Save and Continue"
        onSaveHandler={() => null}
        onCloseHandler={() => handleProjFlag(false)}
        modelContentComponent={
          <ProjectOrganizationModalContent
            title="About the project"
            placeholder="Project Name"
            saveHandler={saveHandler}
            subTitle="Organizations"
            organizationData={organizationData}
          />
        }
        className=""
      />
    </div>
  );
};

export default ProductsPage;
