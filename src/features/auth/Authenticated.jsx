import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utils/local-storage";

export default function Authenticated({ children }) {
  if (!getAccessToken()) {
    return <Navigate to="/" />;
  }
  return children;
}