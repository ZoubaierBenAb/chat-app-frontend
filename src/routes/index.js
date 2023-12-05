import { Navigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH } from "../config";
import DashboardLayout from "../layouts/dashboard";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export const Router = () => {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <RegisterPage />, path: "register" },
        {element : <ResetPasswordPage/>,path : 'reset-password'},
        {element : <NewPasswordPage/> , path : 'new-password' },
        {element : <VerifyPage/>,path : 'verify'}
      ],
    },
    {
      element: <DashboardLayout />,
      path: "/",
      children: [
        {
          element: <Navigate to={DEFAULT_PATH.general.app} replace />,
          index: true,
        },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        {path : 'group',element : <GroupPage/>},
        {path : 'call', element : <CallPage/>},
        {path : 'profile',element : <ProfilePage/>}
        
      ],
    },
  ]);
};
//dynamic imports
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(lazy(()=>import('../pages/auth/ResetPassword')))
const NewPasswordPage = Loadable(lazy(()=>import('../pages/auth/NewPassword')))
const VerifyPage = Loadable(lazy(()=>import('../pages/auth/Verify')))
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const GroupPage = Loadable(lazy(()=>import('../pages/dashboard/Group')));
const CallPage = Loadable(lazy(()=>import('../pages/dashboard/Call')))
const ProfilePage = Loadable(lazy(()=>import('../pages/dashboard/Profile')))

