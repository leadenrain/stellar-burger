import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/auth/thunk';
import { useDispatch } from '../../services/store';
import { clearConstructor } from '../../services/slices/burger/constructor/constructorSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearConstructor()); // верное ли поведение?
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
