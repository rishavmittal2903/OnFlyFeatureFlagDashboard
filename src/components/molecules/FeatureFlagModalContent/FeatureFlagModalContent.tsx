import { useState } from "react";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import "./style.scss";
interface IProps {
  saveHandler: (value: any, fieldValue: boolean) => void;
  title: string;
  subTitle?: string;
  placeholder: string;
  description?:string;
}

const FeatureFlagModalContent = (props: IProps) => {
  const { saveHandler, title, subTitle, placeholder,description } = props;
  const [value, setValue] = useState<string>("");
  let fieldValue: boolean = false;
  const orgChangeHandler = (event: any) => {
    if (event?.target?.value) {
        fieldValue = event.target.value ==="true"?true:false;
    }
  };
  const eventHandler = () => {
    if (value) {
      saveHandler(value,fieldValue);
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
              name="modalFeatureName"
              onChange={(event: any) => setValue(event?.target?.value || "")}
              required
              value={value}
            />
            {subTitle  && (
              <div className="fieldBox">
                <div>{subTitle}</div>
                <div className="selectorg">
                  <select onChange={orgChangeHandler}>
                    <option value={"false"}>false</option>
                    <option value={"true"}>true</option>
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
      <div className="orgDetailSection pd4Rm">
        {description}
          </div>
    </div>
  );
};

export default FeatureFlagModalContent;
