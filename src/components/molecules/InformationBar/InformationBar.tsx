import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IState } from "../../../model/interfaces/IState";
import { IInformationBar } from "../../../shared/interfaces/IInformationBar";
import { IOrganization } from "../../../shared/interfaces/IOrganization";
import { IProjectDetail } from "../../../shared/interfaces/IProjectDetail";
import "./style.scss";

const InformationBar = (props: IInformationBar) => {
  const { organizationData } = useSelector((state:IState)=>state.organization);
  const { projectData } = useSelector((state:IState)=>state.project);
  const { defaultOrgId, defaultProjectId } = useSelector((state:IState)=>state.common);

  const {eventHandler} = props;
  const isHomePage: boolean = window.location.href.includes("home")
    ? true
    : false;
  const isOrganization: boolean = window.location.href.includes("organization")
    ? true
    : false;
  const isProduct: boolean = window.location.href.includes("projects")
    ? true
    : false;
    const isFeatureFlag: boolean = window.location.href.includes("featureFlag") && !window.location.href.includes("environments")
    ? true
    : false;
    const isEnvironments: boolean = window.location.href.includes("environments")
    ? true
    : false;
    const isSDK: boolean = window.location.href.includes("sdk")
    ? true
    : false;
  return (
    <div className="infoContainer">
      <div className="mainContent">
        {isHomePage && <div className="welcomeContainer">Welcome</div>}
        {isOrganization && (
          <div className="welcomeContainer">Organizations</div>
        )}
        {isProduct && (
          <div className="projectOrgSection">
            <div className="white">Organizations</div>
            <div className="select">
              <select onChange={(event:any)=> eventHandler && eventHandler(event,"org")}>
                {organizationData.map(
                  (org: IOrganization, keyIndex: number) => (
                    <option
                      key={`${org.organizationId}_${keyIndex}`}
                      value={org.organizationId}
                      selected={org.organizationId === defaultOrgId}
                    >
                      {org.organizationName}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        )}
        {(isFeatureFlag || isEnvironments) && <div className="projectOrgSection">
            <div className="white">Organizations</div>
            <div className="select">
              <select onChange={(event:any)=>eventHandler && eventHandler(event, "org")}>
                {organizationData.map(
                  (org: IOrganization, keyIndex: number) => (
                    <option
                      key={`${org.organizationId}_${keyIndex}`}
                      value={org.organizationId}
                      selected={org.organizationId === defaultOrgId}
                    >
                      {org.organizationName}
                    </option>
                  )
                )}
              </select>
            </div>
            {projectData.length ?<div className="white">Projects</div>:null}
            {projectData.length ?<div className="select">
              <select onChange={(event:any)=> eventHandler && eventHandler(event, "proj")}>
                {projectData.map(
                  (proj: IProjectDetail, keyIndex: number) => (
                    <option
                      key={`${proj.projectId}_${keyIndex}`}
                      value={proj.projectId}
                      selected={proj.projectId === defaultProjectId}
                    >
                      {proj.projectName}
                    </option>
                  )
                )}
              </select>
            </div>:null}
            <div className={`welcomeContainer ${(isFeatureFlag && !isSDK)?"selectedFlag":"notSelected"}`}><Link to="/featureFlag">Feature Flags</Link></div>
            <div className={`welcomeContainer ${isEnvironments?"selectedFlag":"notSelected"}`} ><Link to="/featureFlag/environments">Environments</Link></div>
            <div className={`welcomeContainer ${isSDK?"selectedFlag":"notSelected"}`} ><Link to="/featureFlag/sdk">SDK Keys</Link></div>

          </div>
          
          }
      </div>
    </div>
  );
};

export default InformationBar;
