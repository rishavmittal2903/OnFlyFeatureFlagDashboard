import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import {
  IEnvironmentType,
  IProjectDetail,
} from "../../../shared/interfaces/IProjectDetail";
import {
  encode,
  getAllFlagDataForNewEnvironment,
  getFilteredProjectData,
} from "../../../shared/Utility";
import { toggleLoader } from "../../../store/actions/commonAction";
import { saveProject } from "../../../store/actions/ProjectAction";
import EnvironmentTile from "../../atoms/EnvironmentTite/EnvironmentTile";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import FeatureFlagModalContent from "../FeatureFlagModalContent/FeatureFlagModalContent";
import "./style.scss";

const EnvironmentPage = () => {
  const isSDK: boolean = window.location.href.includes("sdk") ? true : false;
  const [isEnvPopOpen, setEnvFlagPopup] = useState<boolean>(false);
  const { projectData } = useSelector((state: IState) => state.project);
  const dispatch = useDispatch();
  const { defaultProjectId, defaultOrgId } = useSelector(
    (state: IState) => state.common
  );
  const filteredProjectData: IProjectDetail | any = getFilteredProjectData(
    projectData,
    defaultProjectId
  );

  const saveEnvironments = (environmentName: string, value: boolean) => {
    if (filteredProjectData && filteredProjectData?.environments) {
      const isExists: number = filteredProjectData.environments.findIndex(
        (data: IEnvironmentType) => data.envType === environmentName
      );
      if (isExists === -1) {
        const envData: IEnvironmentType = {
          envType: environmentName,
          envId: encode(defaultOrgId, defaultProjectId, environmentName),
          flagData: getAllFlagDataForNewEnvironment(
            filteredProjectData.environments[0]?.flagData || []
          ),
        };
        delete filteredProjectData["_id"];
        filteredProjectData.environments.push(envData);
        dispatch(toggleLoader(true));
        saveProject(filteredProjectData, dispatch, environmentName);
        setEnvFlagPopup(false);
      }
    }
  };
  return (
    <div className="organizationContainer">
      <div className="featureHead">
        <div>{isSDK ? "SDK Keys" : "Environments"}</div>
        <div></div>
      </div>
      {!isSDK && <div
        className={`filterContent ${
          !filteredProjectData?.projectName ? "disable" : ""
        }`}
      >
          <div className={`orgBtn`}>
            <button
              className="orgActionBtn"
              onClick={() => setEnvFlagPopup(true)}
            >
              <div>
                <BiPlus className="plus" />
              </div>
              <div>New Environment</div>
            </button>
          </div>
        {!filteredProjectData?.projectName && (
          <div className="noProjectFound mrgR30RM">
            No projects found. Please create a project
          </div>
        )}
      </div>}
      {filteredProjectData?.environments?.length ? (
        <div className="envContainer">
          {filteredProjectData?.environments?.map(
            (envData: IEnvironmentType, envIndex: number) => {
              return (
                <EnvironmentTile
                  name={envData.envType}
                  key={envIndex}
                  clientId={isSDK ? envData.envId : ""}
                />
              );
            }
          )}
        </div>
      ) : null}
      <ModalPopup
        isOpen={isEnvPopOpen}
        isAction={false}
        confirmBtnText="Save and Continue"
        onSaveHandler={() => null}
        onCloseHandler={() => setEnvFlagPopup(false)}
        modelContentComponent={
          <FeatureFlagModalContent
            title="About the Environment"
            placeholder="Environment name"
            description="An Environment is the representation of your production or non-production infrastructure"
            saveHandler={saveEnvironments}
          />
        }
        className=""
      />
    </div>
  );
};

export default EnvironmentPage;
