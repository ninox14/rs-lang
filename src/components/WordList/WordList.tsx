/* eslint-disable react-hooks/exhaustive-deps */
import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTextbookHardWords,
  getTextbookWords,
  getUserTextbookWords,
} from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { WordCard } from './Components/WordCard';
import './WordList.scss';
import GameMenu from './Components/GameMenu/GameMenu';
import { setPage } from 'redux/word.slice';
import { WordDifficulty } from 'redux/types/types';

const WordList: FC = () => {
  const user = useAppSelector((state) => state.word.userId);
  const page = useAppSelector((state) => state.word.page);
  const group = useAppSelector((state) => state.word.group);
  const dispatch = useAppDispatch();
  const [isHardPage, setIsHardPage] = useState(false);
  const hardGroupId = 6;

  const groupType = 'default';

  // choose which words to use

  useEffect(() => {
    if (!user) {
      dispatch(getTextbookWords({ group: group, page: page }));
      setIsHardPage(false);
    } else {
      if (group === hardGroupId) {
        console.log('fetch for hard');
        dispatch(getTextbookHardWords({ userId: user, page: page }));
        setIsHardPage(true);
      } else {
        dispatch(
          getUserTextbookWords({ userId: user, group: group, page: page })
        );
        setIsHardPage(false);
      }
    }
  }, [user, group, page]);

  const words = useAppSelector((state) => state.word.words);

  const isLoading = useAppSelector((state) => state.word.loading);

  const isLearned = useMemo(() => {
    if (!user) {
      return false;
    } else {
      return words.every(
        (word) =>
          word.userWord && word.userWord.difficulty !== WordDifficulty.DEFAULT
      );
    }
  }, [words]);

  // pagination
  const navigate = useNavigate();
  const [paginationPage, setPaginationPage] = useState(page + 1);

  const maxHardPageNumber = useAppSelector(
    (state) => state.word.maxHardWordsPages
  );
  const maxPageNumber = groupType === 'default' ? 30 : maxHardPageNumber;

  function handlePageSwitch(event: React.ChangeEvent<unknown>, value: number) {
    navigate(`/textbook/${group}/${value - 1}`, { replace: true });
  }

  useEffect(() => {
    dispatch(setPage(paginationPage - 1));
  }, [dispatch, paginationPage]);

  return (
    <div className="wordlist-container">
      <div
        className={`word-cards-loader ${
          isLoading ? 'word-cards-loader_active' : ''
        }`}
      >
        <div className="loader__circle"></div>
      </div>
      <Pagination
        className="wordlist__pagination"
        count={maxPageNumber}
        page={paginationPage}
        onChange={handlePageSwitch}
        renderItem={(item) => (
          <PaginationItem
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'var(--color)',
              },
              '& .MuiTouchRipple-child': {
                backgroundColor: 'var(--color)',
              },
            }}
            {...item}
          />
        )}
      />
      <div className="wordlist-cards">
        {words.map((el) => (
          <WordCard
            key={el.word}
            word={el.word}
            image={el.image}
            textMeaning={el.textMeaning}
            textExample={el.textExample}
            textMeaningTranslate={el.textMeaningTranslate}
            textExampleTranslate={el.textExampleTranslate}
            transcription={el.transcription}
            wordTranslate={el.wordTranslate}
          />
        ))}
      </div>
      <GameMenu
        isHardPage={isHardPage}
        isLearned={isLearned}
        userId={user}
        groupId={group}
        pageId={page}
      />
    </div>
  );
};

export default WordList;
