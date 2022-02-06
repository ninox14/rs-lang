import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Games: FC = () => (
  <>
    <Link to="/games/sprint"> Спринт </Link>
    <Link to="/games/audiocall"> Аудиовызов </Link>
  </>
);
