import { FiMoreVertical, FiCopy } from "react-icons/fi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./style.scss";
import { useState } from "react";
import { toast } from "react-toast";
interface IProps {
  name: string;
  key: number;
  clientId?: string;
  onCardClickHandler?: (envName: string) => void;
}
const EnvironmentTile = (props: IProps) => {
  const { name, key, clientId } = props;
  const [isHidden, toggleHidden] = useState<boolean>(true);
  const menuOptionHandler = () => {
    if (clientId) {
      navigator.clipboard.writeText(clientId);
      toast.success("Client id copied to clipboard");
    } else {
    }
  };
  return (
    <div className="environmentCardContainer" key={`${key}_${name}`}>
      <div className="environmentNameSection">
        <div className="envTitle">
          {!clientId ? "Environment" : "Client Id"}
        </div>
        <div className="envName">{name}</div>
      </div>
      {clientId && (
        <div className="secretContainer">
          <div className="ellipsis">{isHidden? "xxxxxxxxxxxxxxxxxxxxxxxxxxx":clientId}</div>
          <div onClick={() => toggleHidden((prev) => !prev)}>
            {isHidden ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
      )}
      <div className="environmentMenuSection" onClick={menuOptionHandler}>
        {!clientId ? <FiMoreVertical /> : <FiCopy />}
      </div>
    </div>
  );
};

export default EnvironmentTile;
