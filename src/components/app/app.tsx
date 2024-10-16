import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/burger/ingredients/ingredientsSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUser } from '../../services/slices/auth/thunk';
import { Title } from '../title/title';
import { ModalWithParams } from '../modal-with-params/modal-with-params';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state?.background;

  const handleClose = () => {
    navigate(-1); // нужно ли прерывать загрузку ордера на сервер?
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/'>
          <Route index element={<ConstructorPage />} />
          <Route path='feed'>
            <Route index element={<Feed />} />
            <Route
              path=':number'
              element={
                <Title>
                  <OrderInfo />
                </Title>
              }
            />
          </Route>
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='profile'>
            <Route
              index
              element={
                <ProtectedRoute onlyAuthorized>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='orders'>
              <Route
                index
                element={
                  <ProtectedRoute onlyAuthorized>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':number'
                element={
                  <ProtectedRoute onlyAuthorized>
                    <Title>
                      <OrderInfo />
                    </Title>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <Title content='Детали ингредиента'>
              <IngredientDetails />
            </Title>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={<ModalWithParams onClose={handleClose} />}
          />
          <Route
            path='/profile/orders/:number'
            element={<ModalWithParams onClose={handleClose} />}
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
