import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrderList } from '../../services/slices/order/order/orderSlice';
import { getOrderList } from '../../services/slices/order/order/thunk';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectOrderList);

  return <ProfileOrdersUI orders={orders} />;
};
