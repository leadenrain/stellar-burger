import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthorized,
  selectIsLoading
} from '../../services/slices/auth/userSlice';
import { Preloader } from '../ui/preloader/preloader';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyAuthorized
}: ProtectedRouteProps) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyAuthorized && !isAuthorized) {
    return (
      <Navigate to='/login' state={{ from: location.state?.from }} replace />
    );
  }

  if (!onlyAuthorized && isAuthorized) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
