import SpeedDial from '@mui/material/SpeedDial';
import { FC } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { groupsColorThemes, groupsLinksData } from './Components/WordPageData';
import './WordPage.scss';

export const WordPage: FC = () => {
  const groupId = Number(useParams().groupId || '0');
  const isLogged = true;

  return (
    <div
      className={`page page_wordpage wordpage_${groupsColorThemes[groupId]}`}
    >
      <div className="wordpage-container">
        <h4 className="wordpage__title">Разделы</h4>
        <div className="groups-container">
          {groupsLinksData.map((el) => {
            if (!el.isAuthReq || isLogged) {
              return (
                <Link
                  key={el.id}
                  to={el.path}
                  className={`groups__link groups__link_${
                    groupsColorThemes[el.id]
                  } ${groupId === el.id ? 'groups__link_active' : ''}`}
                >
                  {el.title}
                </Link>
              );
            }
          })}
        </div>
        <Outlet />
      </div>
    </div>
  );
};
