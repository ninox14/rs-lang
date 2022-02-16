import { FC, useEffect } from 'react';
import { getUserTextbookWords, getWordsAudiocall } from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

export const Sprint: FC = () => {
  const disptach = useAppDispatch();
  const wordsAc = useAppSelector((state) => state.word.audiocallWords);
  const words = useAppSelector((state) => state.word.words);
  useEffect(() => {
    disptach(
      getUserTextbookWords({
        group: 1,
        page: 2,
        userId: '6209a810ea66240016e86548',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(words);
  return <h1>sprint</h1>;
};

export default Sprint;
