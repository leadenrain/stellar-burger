import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/order/feed/feedSlice';
import { fetchFeed } from '../../services/slices/order/feed/thunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const orders = useSelector(selectOrders);

  const handleFetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleFetFeeds} />;
};
