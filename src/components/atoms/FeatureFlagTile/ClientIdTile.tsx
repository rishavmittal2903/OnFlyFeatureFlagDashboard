import { FiDelete } from "react-icons/fi";
import "./style.scss";
interface IProps {
  clientId:string
}
const ClientIdTile = (props: IProps) => {
  const {clientId } = props;
  return (
    <div
      className="feeatureTileCardContainer"
    >
      <div className="featureTileNameSection">
        <div className="featureFlagName">
          <div>
            ClientId
          </div>
          <div>{clientId}</div>
        </div>
      </div>
      <div className="featureMenuSection">
        <FiDelete />
      </div>
    </div>
  );
};

export default ClientIdTile;
