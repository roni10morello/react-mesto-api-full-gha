import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.isLogin ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
