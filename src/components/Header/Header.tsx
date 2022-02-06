import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = (props) => (
  <header>
    <Link to="/">Главная</Link>
    <Link to="/auth">Аутентификация</Link>
    <Link to="/team">Окоманде</Link>
    <Link to="/textbook">Учебник</Link>
    <Link to="/games">Игры</Link>
  </header>
);
