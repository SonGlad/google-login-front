import { SharedLayout } from "./SharedLayout";
import { Route, Routes, Navigate} from "react-router-dom";
import { lazy, useEffect } from "react";
// import { PrivateRoute } from "../routes/PrivateRoute";
import { RestrictedRoute } from "../routes/RestrictedRoute";
import { useAuth } from "../hooks/useAuth";
import { useDispatch} from "react-redux";
import { refreshCurrentUser } from "../redux/Auth/auth-operation";
import { RefreshLoading } from "../components/CustomLoaders/CustomLoaders";
import { Toaster } from "./ToastContainer/ToastContainer";



const HomePage = lazy(() => import('../pages/Home/Home'));
const RegisterPage = lazy(() => import('../pages/Register/Register'));
const LoginPage = lazy(() => import('../pages/Login/Login'));


export const App= () => {
  const dispatch = useDispatch();
  const {isLoadingAuth, isRefreshing} = useAuth();

  useEffect(() => {
    dispatch(refreshCurrentUser());
  },[dispatch])


  return isRefreshing ? (
    <RefreshLoading/>
  ) : (
   <>
      {isLoadingAuth && <RefreshLoading />}
      <Toaster/>
      <Routes>
        <Route path='/' element = {<SharedLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='*' element = {<Navigate to="/"/>}/>
          <Route path="/signup" element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage/>} />
          }/>
          <Route path="/signin" element={
            <RestrictedRoute redirectTo="/" component={<LoginPage/>} />
          }/>
        </Route>    
      </Routes>
    </>
  );
};
