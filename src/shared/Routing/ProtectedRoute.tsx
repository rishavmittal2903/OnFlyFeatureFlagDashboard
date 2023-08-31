import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IState } from "../../model/interfaces/IState";
interface IProps {
  children: any;
}
const ProtectedRoute = (props: IProps) => {
  const { children } = props;
  const { isAuthenticated } = useSelector((state: IState) => state.user);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
