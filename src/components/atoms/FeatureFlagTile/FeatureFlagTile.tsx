import { FiMoreVertical } from "react-icons/fi";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./style.scss";
interface IProps {
  name: string;
  key: number;
  value: boolean;
  onCardClickHandler?: () => void;
  onChangeHandler: (event: string,envType:string) => void;
  envType:string;
}
const FeatureFlagTile = (props: IProps) => {
  const { name, key, value, onChangeHandler,envType } = props;
  return (
    <div
      className="feeatureTileCardContainer"
      key={`${key}_${name}`}
    >
      <div className="featureTileNameSection">
        <div className="featureFlagName">
          <div>
            <ToggleButton value={value} onChangeHandler={(event:any)=>onChangeHandler(event,envType)} />
          </div>
          <div>{name}</div>
        </div>
      </div>
      <div className="featureMenuSection">
        <FiMoreVertical />
      </div>
    </div>
  );
};

export default FeatureFlagTile;
