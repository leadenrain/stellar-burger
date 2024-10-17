import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

export const Title: FC<PropsWithChildren<{ content?: string }>> = ({
  content,
  children
}) => {
  const { number } = useParams<{ number?: string }>();

  const displayContent = content || (number ? `#${number}` : '');

  return (
    <div>
      <h1
        className={`text text_type_main-large`}
        style={{ textAlign: 'center', marginTop: '120px' }}
      >
        {displayContent}
      </h1>
      {children}
    </div>
  );
};
