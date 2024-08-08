import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export default function UserRoute() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/sign-in" />;
  }

//   if (currentUser.isAdmin) {
//     // Redirect admin users to the admin dashboard or homepage
//     return <Navigate to="/admin" />;
//   }

  // Allow access to the route for non-admin users
  return <Outlet />;
}
