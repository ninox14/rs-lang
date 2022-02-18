import { FC } from 'react';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = (props) => {
  const { text, url, className, onClick } = props;
  return (
    <a href={url} className={`button ${className ?? ''}`} onClick={onClick}>
      {text}
      {props.children}
    </a>
  );
};

export default Button;
