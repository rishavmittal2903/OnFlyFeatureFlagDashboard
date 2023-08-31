import { useRef } from "react";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import "./style.scss";

interface IProps {
  onSaveHandler: (value: string) => void;
  onCloseHandler: () => void;
}
const EnvironmentModalContent = (props: IProps) => {
  const { onSaveHandler, onCloseHandler } = props;
  const inputRef: any = useRef();
  const saveHandler = () => {
    const value = inputRef.current?.value;
    if (value) {
      onSaveHandler(value);
    }
  };
  return (
    <div className="environmentContainer">
      <div className="heading">Create an Environment</div>
      <div className="subHeading">
        An Environment is the representation of application deployment server
        stage
      </div>
      <div className="envFieldBox">
        <div>Environment Name</div>
        <CustomTextBox
          type="text"
          placeholder="Environment name"
          name="envName"
          required
          ref={inputRef}
        />
      </div>
      <div className="footer">
        <div>
          <button onClick={saveHandler}>Create</button>
        </div>
        <div>
          <button className="cancel" onClick={onCloseHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentModalContent;
