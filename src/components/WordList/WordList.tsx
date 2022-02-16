import { FC, useEffect } from 'react';
import {
  getTextbookHardWords,
  getTextbookWords,
  getUserTextbookWords,
} from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { WordCard } from './Components/WordCard';

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

  return (
    <div className="wordlist-container">
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
