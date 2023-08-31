import { useEffect, useState } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { HiFlag } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import {
  IEnvironmentType,
  IFlagData,
} from "../../../shared/interfaces/IProjectDetail";
import {
  getActiveFlags,
  getAllFlags,
  getClientId,
  getFilteredProjectData,
  getFlagData,
  getIndex,
} from "../../../shared/Utility";
import { toggleLoader } from "../../../store/actions/commonAction";
import { saveProject } from "../../../store/actions/ProjectAction";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import FeatureFlagTile from "../../atoms/FeatureFlagTile/FeatureFlagTile";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import FeatureFlagModalContent from "../FeatureFlagModalContent/FeatureFlagModalContent";
import "./style.scss";
const FeatureFlagPage = () => {
  const [featureName, setFeatureName] = useState<string>("");
  const [isFeatureFlagOpen, setFeatureFlagPopup] = useState<boolean>(false);
  const { projectData } = useSelector((state: IState) => state.project);
  const dispatch = useDispatch();
  const { defaultProjectId, defaultEnvType } = useSelector(
    (state: IState) => state.common
  );
  const filteredProjectData: any = getFilteredProjectData(
    projectData,
    defaultProjectId
  );

  const [environment, setEnvironment] = useState<string>(defaultEnvType);
  const filterHandler = (event: any) => {
    const value = event?.target?.value;
    setFeatureName(value);
  };

  useEffect(() => {
    setEnvironment(defaultEnvType);
    // eslint-disable-next-line
  }, [defaultEnvType]);

  const environmentChangeHandler = (event: any) => {
    const value = event?.target?.value;
    setEnvironment(value);
  };

  const flagToggleHandler = (event: any, index: number, envType: string) => {
    const projIndex: number = getIndex(filteredProjectData, envType);
    const cloneData = Object.assign({}, filteredProjectData);
    if (projIndex !== -1) {
      cloneData.environments[projIndex].flagData[index].isFlagEnabled =
        event.target.checked;
      delete cloneData["_id"];
      dispatch(toggleLoader(true));
      saveProject(
        cloneData,
        dispatch,
        environment
      );
    }
  };
  const saveFeatureFlag = (featureFlagName: string, value: boolean) => {
    if (
      filteredProjectData &&
      filteredProjectData?.environments &&
      featureFlagName
    ) {
      let isExists: boolean = false;
      filteredProjectData.environments?.forEach((data: IEnvironmentType) => {
        if (
          data?.flagData?.filter(
            (flag: IFlagData) =>
              flag.flagName === featureFlagName && flag.envType === environment
          ).length
        ) {
          isExists = true;
        }
      });
      if (!isExists) {
        const envData: IFlagData = {
          envType: environment,
          flagName: featureFlagName,
          isFlagEnabled: value,
        };
        filteredProjectData.environments?.forEach(
          (envFlag: IEnvironmentType) => {
            envFlag.flagData.push({ ...envData, envType: envFlag.envType });
          }
        );
        delete filteredProjectData["_id"];
        dispatch(toggleLoader(true));
        saveProject(
          filteredProjectData,
          dispatch,
          environment,
        );
        setFeatureFlagPopup(false);
      }
    }
  };
  return (
    <div className="organizationContainer">
      <div className="featureHead">
        <div>Feature Flags</div>
        <div>
          {filteredProjectData && filteredProjectData?.environments?.length ? (
            <div className="featureSelect">
              <select onChange={environmentChangeHandler}>
                <option
                  disabled
                  selected={environment === "true" || environment === "false"}
                >
                  Select Environment
                </option>
                {filteredProjectData?.environments?.map(
                  (env: IEnvironmentType, keyIndex: number) => (
                    <option
                      key={`${env.envType}_${keyIndex}`}
                      value={env.envType}
                      selected={env.envType === environment}
                    >
                      {env.envType}
                    </option>
                  )
                )}
              </select>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`filterContent ${
          !filteredProjectData?.projectName ||
          !filteredProjectData?.environments.length
            ? "disable"
            : ""
        }`}
      >
        <div className={`orgBtn`}>
          <button
            className="orgActionBtn"
            onClick={() => setFeatureFlagPopup(true)}
          >
            <div>
              <BiPlus className="plus" />
            </div>
            <div>New Feature Flag</div>
          </button>
        </div>
        {!filteredProjectData?.projectName && (
          <div className="noProjectFound">
            No projects found. Please create a project
          </div>
        )}
        {filteredProjectData?.projectName &&
        !filteredProjectData?.environments.length ? (
          <div className="noProjectFound">
            No environment found. Please create a environment to associate
            feature flag
          </div>
        ) : null}
        <div className="searchContainer">
          <div className="search-input-field">
            <BiSearch className="searchicons" />
            <CustomTextBox
              type="text"
              placeholder="Search feature flags by name"
              name="organization"
              value={featureName}
              onChange={filterHandler}
            />
          </div>
        </div>
      </div>
      {filteredProjectData && filteredProjectData?.environments.length ? (
        <div className="cardFeatureContainer">
          <div className="cardFeatureWrap">
            <div className="featurePageMainContent">
              <div className="envCount">Environments</div>
              <div className="flex">
                <div className="environmentFeatureCard">
                  <div className="flexEnd">
                    <HiFlag />
                  </div>
                  <div className="">All Flags</div>

                  <div className="envCount">
                    {getAllFlags(filteredProjectData, environment)}
                  </div>
                </div>
                <div className="environmentFeatureCard">
                  <div className="flexEnd">
                    <HiFlag />
                  </div>
                  <div className="">Enabled Flags</div>

                  <div className="envCount">
                    {getActiveFlags(filteredProjectData, environment)}
                  </div>
                </div>
              </div>

              <div className="featureFlagWrap">
                {getFlagData(filteredProjectData, environment).length ? (
                  <div className="headTitle">Feature Flags</div>
                ) : null}
                {getFlagData(filteredProjectData, environment).map(
                  (flag: IFlagData, indexFlag: number) => {
                    return (
                      <FeatureFlagTile
                        key={indexFlag}
                        name={flag.flagName}
                        value={flag.isFlagEnabled}
                        envType={flag.envType || environment}
                        onChangeHandler={(event: any, envType: string) =>
                          flagToggleHandler(event, indexFlag, envType)
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <ModalPopup
        isOpen={isFeatureFlagOpen}
        isAction={false}
        confirmBtnText="Save and Continue"
        onSaveHandler={() => null}
        onCloseHandler={() => setFeatureFlagPopup(false)}
        modelContentComponent={
          <FeatureFlagModalContent
            title="About the flag"
            placeholder="Feature flag name"
            subTitle="Value"
            description="A Feature Flag controls what you want to release, who receives it, and how it will be delivered."
            saveHandler={saveFeatureFlag}
          />
        }
        className=""
      />
    </div>
  );
};

export default FeatureFlagPage;
