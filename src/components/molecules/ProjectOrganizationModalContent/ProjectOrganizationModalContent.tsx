import { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import { IOrganization } from "../../../shared/interfaces/IOrganization";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import Card from "../Card/Card";
import "./style.scss";
interface IProps {
  saveHandler: (value: string, orgId?: string) => void;
  title: string;
  subTitle?: string;
  organizationData?: Array<IOrganization>;
  placeholder:string;
}

const ProjectOrganizationModalContent = (props: IProps) => {
  const { saveHandler, title, subTitle, organizationData,placeholder } = props;
  const [value, setValue] = useState<string>("");
  const { email, firstName } = useSelector((state: IState) => state.user);
  const { defaultOrgId } = useSelector((state:IState)=>state.common);
  let orgId: string = defaultOrgId;
  const orgChangeHandler = (event: any) => {
    if (event?.target?.value) {
      orgId = event.target.value;
    }
  };
  const eventHandler = () => {
    if (value) {
      saveHandler(value, orgId);
    }
  };
  return (
    <div className="orgModalContainer">
      <div className="orgModalInfoSection">
        <div>{title}</div>
      </div>
      <div className="orgModalContentSection">
        <div className="addOrgSection">
          <h1>{title}</h1>
          <div className="fieldBox">
            <div>Name</div>
            <CustomTextBox
              type="text"
              placeholder={placeholder}
              name="modalFieldName"
              onChange={(event: any) => setValue(event?.target?.value || "")}
              required
              value={value}
            />
            {subTitle && organizationData && (
              <div className="fieldBox">
                <div>{subTitle}</div>
                <div className="selectorg">
                  <select onChange={orgChangeHandler}>
                    {organizationData.map(
                      (org: IOrganization, keyIndex: number) => (
                        <option
                          key={`${org.organizationId}_${keyIndex}`}
                          value={org.organizationId}
                          selected={defaultOrgId === org.organizationId}
                        >
                          {org.organizationName}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="actionSection">
          <button onClick={eventHandler}>Save and Continue</button>
        </div>
      </div>
      <div className="orgDetailSection">
        {value && (
          <Card
            title={"Organization Name"}
            subTitle={value}
            key={value}
            project={0}
            owners={[{ email, name: firstName }]}
            contributors={[]}
            onCardClickHandler={() => null}
            id="test"
            className="wdth300"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectOrganizationModalContent;
