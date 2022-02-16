import { FC } from 'react';
import { WordCard } from './Components/WordCard';
import { CardWordData } from './Components/WordCardData';

const WordList: FC = () => {
  return (
    <div className="wordlist-container">
      <div className="wordlist-cards">
        {CardWordData.map((el) => (
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
