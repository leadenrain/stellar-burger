import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectIsAuthorized } from '../../services/slices/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getBun,
  getOtherIngredients
} from '../../services/slices/burger/constructor/constructorSlice';
import {
  selectIsOrderLoading,
  selectOrder,
  clearOrder
} from '../../services/slices/order/order/orderSlice';
import { postOrder } from '../../services/slices/order/order/thunk';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: useSelector(getBun) || null,
    ingredients: useSelector(getOtherIngredients) || []
  };

  const authorizedUser = useSelector(selectIsAuthorized);
  const orderRequest = useSelector(selectIsOrderLoading);
  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!authorizedUser) {
      navigate('/login');
    } else if (authorizedUser) {
      const newOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id)
      ];
      dispatch(postOrder(newOrder));
    }
  };

  const closeOrderModal = () => {
    // ? по х не закрывается модалка с лоадером
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
