import { FC } from 'react';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = (props) => {
  const { text, url, className, tabIndex, onClick } = props;
  return (
    <a
      href={url}
      className={`button ${className ?? ''}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {text}
      {props.children}
    </a>
  );
};

export default Button;
