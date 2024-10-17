import { useParams } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { FC } from 'react';
import { TMProps } from './type';

export const ModalWithParams: FC<TMProps> = ({ onClose }) => {
  const { number } = useParams();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

export default ModalWithParams;
