import { useParams } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { FC } from 'react';
import { TMProps } from './type';

export const ModalWithParams: FC<TMProps> = ({ onClose, children }) => {
  const { number } = useParams();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalWithParams;
