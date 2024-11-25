import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectIsAuthorized,
  selectIsLoading,
  selectUser
} from '../../services/slices/auth/userSlice';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyAuthorized
}) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (user === undefined || isLoading) {
    return <Preloader />;
  }

  if (onlyAuthorized && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!onlyAuthorized && isAuthorized) {
    const from = location.state?.from || '/';
    return (
      <Navigate
        to={from}
        state={{ background: from?.state?.background }}
        replace
      />
    );
  }

  return children;
};
