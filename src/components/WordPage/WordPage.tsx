import AudioPlayer from 'components/Audio/Audio';
import { FC, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setGroup, setPage } from 'redux/word.slice';

import { groupsColorThemes, groupsLinksData } from './Components/WordPageData';

import './WordPage.scss';

const WordPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = !!useAppSelector((state) => state.word.userId);
  const groupId = Number(useParams().groupId || '0');
  const pageId = Number(useParams().pageId || '0');

  useEffect(() => {
    dispatch(setGroup(Number(groupId)));
    dispatch(setPage(0));
  }, [groupId]);

  useEffect(() => {
    dispatch(setPage(pageId));
  }, [pageId]);

  // stop audio if page changes

  const player = AudioPlayer.getInstance();

  const location = useLocation();

  useEffect(() => {
    player.stopAudio();
  }, [location]);

  useEffect(() => {
    return () => {
      player.stopAudio();
    };
  }, []);

  return (
    <div
      className={`page page_wordpage page_header wordpage_${groupsColorThemes[groupId]}`}
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

export default WordPage;
