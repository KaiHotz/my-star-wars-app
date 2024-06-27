import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../../Header';
import './MainLayout.scss';

export const MainLayout: FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__content">
        <Outlet />
      </div>
    </div>
  );
};
