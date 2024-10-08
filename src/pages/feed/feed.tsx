import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/order/feed/feedSlice';
import { fetchFeed } from '../../services/slices/order/feed/thunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
