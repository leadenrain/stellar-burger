import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderList } from '../../services/slices/order/order/thunk';
import { selectOrderList } from '../../services/slices/order/order/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const orders = useSelector(selectOrderList);

  return <ProfileOrdersUI orders={orders} />;
};
