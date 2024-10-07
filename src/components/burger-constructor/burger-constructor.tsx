import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectIsAuthorized } from '../../services/slices/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getBun,
  getOtherIngredients
} from '../../services/slices/burger/constructor/constructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(getBun) || null,
    ingredients: useSelector(getOtherIngredients) || []
  };
  const authorizedUser = useSelector(selectIsAuthorized);

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!authorizedUser) {
      navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
