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
import { setPage } from 'redux/word.slice';
import { WordCard } from './Components/WordCard';
import './WordList.scss';

const WordList: FC = () => {
  const user = useAppSelector((state) => state.word.userId);
  const page = useAppSelector((state) => state.word.page);
  const group = useAppSelector((state) => state.word.group);
  const dispatch = useAppDispatch();

  const groupType = 'default';

  // choose which words to use

  useEffect(() => {
    if (!user) {
      dispatch(getTextbookWords({ group: group, page: page }));
    } else {
      if (group === 6) {
        dispatch(getTextbookHardWords({ userId: user, page: page }));
      } else {
        dispatch(
          getUserTextbookWords({ userId: user, group: group, page: page })
        );
      }
    }
  }, [page, group, dispatch, user]);

  const words = useAppSelector((state) => state.word.words);

  const isLoading = useAppSelector((state) => state.word.loading);

  // pagination
  const navigate = useNavigate();
  const [paginationPage, setPaginationPage] = useState(page + 1);

  const maxHardPageNumber = useAppSelector(
    (state) => state.word.maxHardWordsPages
  );
  const maxPageNumber = groupType === 'default' ? 30 : maxHardPageNumber;

  function handlePageSwitch(event: React.ChangeEvent<unknown>, value: number) {
    setPaginationPage(value);
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
            transcription={el.transcription}
            wordTranslate={el.wordTranslate}
            textMeaningTranslate={el.textMeaningTranslate}
            textExampleTranslate={el.textExampleTranslate}
          />
        ))}
      </div>
    </div>
  );
};

export default WordList;
