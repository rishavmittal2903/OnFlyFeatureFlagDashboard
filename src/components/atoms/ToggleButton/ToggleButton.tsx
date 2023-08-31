import CustomTextBox from "../CustomTextBox/CustomTextBox";
import "./style.scss";

interface IProps {
  className?: string;
  value:boolean;
  onChangeHandler: (event: any) => void;
}
const ToggleButton = (props: IProps) => {
  const { className, onChangeHandler, value } = props;
  return (
    <label className={`switch ${className}`}>
      <CustomTextBox type="checkbox" checked={value} onChange={onChangeHandler} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleButton;
