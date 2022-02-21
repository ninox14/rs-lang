import AudioPlayer from 'components/Audio/Audio';
import { FC, useEffect, useState, MouseEvent } from 'react';
import { useAppSelector } from 'redux/hooks';
import { IWord, WordDifficulty } from 'redux/types/types.d';
import { getAndUpdateUserWord } from 'api/ApiService';
import { baseURL } from 'api/http';

import Collapse from '@mui/material/Collapse';
import Popover from '@mui/material/Popover';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';

import { ReactComponent as SoundIcon } from 'assets/icons/card-volume.svg';
import { ReactComponent as StarIcon } from 'assets/icons/card-star.svg';
import { ReactComponent as ChartIcon } from 'assets/icons/card-chart.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/svg-check.svg';
import { ReactComponent as CollapseIcon } from 'assets/icons/collapse.svg';

import './WordCard.scss';

const CardTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#3C4758',
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'inherit',
    padding: '5px 10px',
  },
  [`& .${tooltipClasses.tooltip}.${tooltipClasses.tooltipPlacementBottom}`]: {
    marginTop: 10,
  },
});

interface CardWordInterface extends IWord {
  wordId: string;
  isHardPage: boolean;
  handleAddLearned: () => void;
  handleRemoveLearned: () => void;
}

export const WordCard: FC<CardWordInterface> = ({
  wordId,
  word,
  transcription,
  wordTranslate,
  image,
  textMeaning,
  textMeaningTranslate,
  textExample,
  textExampleTranslate,
  audio,
  audioMeaning,
  audioExample,
  userWord,
  isHardPage,
  handleAddLearned,
  handleRemoveLearned,
}) => {
  const userId = useAppSelector((state) => state.word.userId);
  const words = useAppSelector((state) => state.word.words);
  const player = AudioPlayer.getInstance();

  const [isCardExpanded, setCardExpanded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const open = Boolean(popoverAnchorEl);
  const id = open ? 'word-statistic' : undefined;

  const [difficulty, setDifficulty] = useState<WordDifficulty>(
    WordDifficulty.DEFAULT
  );
  const [isInitial, setIsInitial] = useState(true);

  const handleCardExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.classList.toggle('btn_expand_opened');
    setCardExpanded(!isCardExpanded);
  };

  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const updateLearnedCount = (
    oldDifficulty: WordDifficulty,
    newDifficulty: WordDifficulty
  ) => {
    if (isHardPage) {
      setIsRemoved(!isRemoved);
    }
    if (oldDifficulty === newDifficulty) {
      queueMicrotask(() => handleRemoveLearned());
    } else if (oldDifficulty === WordDifficulty.DEFAULT) {
      queueMicrotask(() => handleAddLearned());
    }
  };

  const getNewDifficulty = (
    oldDifficuly: WordDifficulty,
    newDifficulty: WordDifficulty
  ) => {
    updateLearnedCount(oldDifficuly, newDifficulty);
    return oldDifficuly === newDifficulty
      ? WordDifficulty.DEFAULT
      : newDifficulty;
  };

  const handleDifficultyChange = (newDifficulty: WordDifficulty) => {
    setIsInitial(false);
    setDifficulty((state) => getNewDifficulty(state, newDifficulty));
  };

  useEffect(() => {
    if (userWord) {
      if (userWord.difficulty !== WordDifficulty.DEFAULT) {
        setDifficulty(userWord.difficulty);
      }
    }
  }, [words]);

  // word update to server

  useEffect(() => {
    if (userWord) {
      if (!isInitial) {
        getAndUpdateUserWord({
          userId,
          wordId,
          difficulty,
          userWord,
        });
      }
    }
  }, [difficulty]);

  return (
    <div className={`wordcard ${isRemoved ? 'wordcard_hidden' : ''}`}>
      <div className="wordcard-top">
        <div className="wordcard-top__content">
          <div className="wordcard-top__heading">
            <h4 className="wordcard__word">{word}</h4>
            <button className="wordcard__btn btn_sound">
              <SoundIcon
                className="wordcard__icon_sound"
                onClick={() => {
                  player.updatePlaylist([audio, audioMeaning, audioExample]);
                  player.startPlaylist();
                }}
              />
            </button>
          </div>
          <p className="wordcard__trsc">{transcription}</p>
          <p className="wordcard__trnsl">{wordTranslate}</p>
        </div>
        <div
          className={`wordcard-top__controls-wrapper ${
            userId ? 'wordcard-top_auth' : ''
          }`}
        >
          <div className="wordcard-top__controls">
            <CardTooltip
              title="Отметить как изученное"
              disableInteractive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <button
                className="wordcard__btn btn_learned"
                onClick={() => {
                  handleDifficultyChange(WordDifficulty.LEARNED);
                }}
              >
                <CheckIcon
                  className={`wordcard__icon_check ${
                    difficulty === WordDifficulty.LEARNED
                      ? 'wordcard__icon_check_active'
                      : ''
                  }`}
                />
              </button>
            </CardTooltip>
            <CardTooltip
              title="Добавить в “Сложные слова”"
              disableInteractive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <button
                className="wordcard__btn btn_hard "
                onClick={() => {
                  handleDifficultyChange(WordDifficulty.HARD);
                }}
              >
                <StarIcon
                  className={`wordcard__icon_star ${
                    difficulty === WordDifficulty.HARD
                      ? 'wordcard__icon_star_active'
                      : ''
                  }`}
                />
              </button>
            </CardTooltip>
            <CardTooltip
              className="wordcard__tooltip"
              title="Статистика в играх"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              disableInteractive
            >
              <button
                className="wordcard__btn btn_stats"
                onClick={handlePopoverClick}
                aria-describedby={id}
              >
                <ChartIcon className="wordcard__icon_chart" />
              </button>
            </CardTooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={popoverAnchorEl}
              onClose={handlePopoverClose}
              disableScrollLock
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              elevation={3}
              marginThreshold={15}
              sx={{
                top: 10,
              }}
            >
              <div className="wordcard__popover">
                <p className="popover__title">Ответы в играх:</p>
                <div className="popover__audiocall">
                  <p className="popover__subtitle">Аудиовызов</p>
                  <p className="popover__score">
                    {`${userWord?.optional.audiocall.right || 0}/${
                      userWord?.optional.audiocall.total || 0
                    }`}
                  </p>
                </div>
                <div className="popover__sprint">
                  <p className="popover__subtitle">Спринт</p>
                  <p className="popover__score">
                    {`${userWord?.optional.sprint.right || 0}/${
                      userWord?.optional.sprint.total || 0
                    }`}
                  </p>
                </div>
              </div>
            </Popover>
          </div>
          <button
            className="wordcard__btn btn_expand"
            onClick={handleCardExpand}
          >
            <CollapseIcon className="icon_expand" />
          </button>
        </div>
      </div>
      <Collapse in={isCardExpanded}>
        <div className="wordcard-bottom">
          <img
            className="wordcard__img"
            src={`${baseURL}/${image}`}
            alt={word}
          />

          <div className="wordcard-bottom__content">
            <div className="wordcard__desc wordcard__meaning">
              <p className="meaning__title">Значение:</p>
              <div className="meaning__text">
                <p
                  className="meaning__en"
                  dangerouslySetInnerHTML={{ __html: textMeaning }}
                ></p>
                <p className="meaning__ru">{textMeaningTranslate}</p>
              </div>
            </div>
            <div className="wordcard__desc wordcard__example">
              <p className="example__title">Пример:</p>
              <div className="example__text">
                <p
                  className="example__en"
                  dangerouslySetInnerHTML={{ __html: textExample }}
                ></p>
                <p className="example__ru">{textExampleTranslate}</p>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
