import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const WordPage: FC = () => (
  <div>
    <h1>Page</h1>
    <Outlet />
  </div>
);
