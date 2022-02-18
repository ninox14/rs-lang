import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTextbookHardWords,
  getTextbookWords,
  getUserTextbookWords,
} from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { WordDifficulty } from 'redux/types/types.d';
import { WordCard } from './Components/WordCard';

import './WordList.scss';
import GameMenu from './Components/GameMenu/GameMenu';

const WordList: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.word.userId);
  const page = useAppSelector((state) => state.word.page);
  const group = useAppSelector((state) => state.word.group);
  const words = useAppSelector((state) => state.word.words);
  const isLoading = useAppSelector((state) => state.word.loading);
  const hardGroupId = 6;
  const maxPageCount = 30;
  const isNoWords = !words.length;

  const [isHardPage, setIsHardPage] = useState(false);

  const maxHardPageNumber = useAppSelector((state) => {
    if (state.word.maxHardWordsPages === 0) {
      return 1;
    }
    return state.word.maxHardWordsPages;
  });

  const navigate = useNavigate();

  const [learnedCount, setLearnedCount] = useState(0);
  const [isLearned, setIsLearned] = useState(false);

  useEffect(() => {
    if (learnedCount < 20) {
      setIsLearned(false);
    } else {
      setIsLearned(true);
    }
  }, [learnedCount]);

  useEffect(() => {
    if (!user) {
      setIsLearned(false);
    } else {
      const markedWords = words.filter(
        (word) =>
          word.userWord && word.userWord.difficulty !== WordDifficulty.DEFAULT
      );

      setLearnedCount(markedWords.length);
      if (markedWords.length === 20) {
        setIsLearned(true);
      } else {
        setIsLearned(false);
      }
    }
  }, [words]);

  const handleAddLearned = () => setLearnedCount((state) => state + 1);
  const handleRemoveLearned = () => setLearnedCount((state) => state - 1);

  useEffect(() => {
    if (!user) {
      dispatch(getTextbookWords({ group: group, page: page }));
      setIsHardPage(false);
    } else {
      if (group === hardGroupId) {
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

  function handlePageSwitch(event: React.ChangeEvent<unknown>, value: number) {
    navigate(`/textbook/${group}/${value - 1}`, { replace: true });
  }

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
        className={`wordlist__pagination ${
          isLearned ? 'wordlist__pagination_learned' : ''
        }`}
        count={isHardPage ? maxHardPageNumber : maxPageCount}
        page={page + 1}
        onChange={handlePageSwitch}
        renderItem={(item) => (
          <PaginationItem
            className="pagination_item"
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'var(--color)',
              },
              '& .MuiTouchRipple-ripple .MuiTouchRipple-child': {
                backgroundColor: 'var(--color)',
              },
            }}
            {...item}
          />
        )}
      />
      <div className="wordlist-cards">
        {isNoWords ? (
          <div className="wordslist-cards__tip">
            В этом разделе пока нет слов
          </div>
        ) : null}
        {isLearned && !isHardPage ? (
          <div className="wordslist-cards__tip">Отлично! Все слова изучены</div>
        ) : null}
        {words.map((el) => {
          return (
            <WordCard
              key={el.word}
              wordId={el.id}
              word={el.word}
              transcription={el.transcription}
              wordTranslate={el.wordTranslate}
              image={el.image}
              textMeaning={el.textMeaning}
              textExample={el.textExample}
              textMeaningTranslate={el.textMeaningTranslate}
              textExampleTranslate={el.textExampleTranslate}
              audio={el.audio}
              audioMeaning={el.audioMeaning}
              audioExample={el.audioExample}
              userWord={el.userWord}
              group={el.group}
              page={el.page}
              isHardPage={isHardPage}
              handleAddLearned={handleAddLearned}
              handleRemoveLearned={handleRemoveLearned}
            />
          );
        })}
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
