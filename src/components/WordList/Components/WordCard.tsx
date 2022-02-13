import { FC, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Popover from '@mui/material/Popover';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';

import { ReactComponent as SoundIcon } from '../../../assets/icons/card-volume.svg';
import { ReactComponent as StarIcon } from '../../../assets/icons/card-star.svg';
import { ReactComponent as ChartIcon } from '../../../assets/icons/card-chart.svg';
import { ReactComponent as CheckIcon } from '../../../assets/icons/svg-check.svg';

import './WordCard.scss';

enum Difficulty {
  Default = 'default',
  Hard = 'hard',
  Learned = 'learned',
}

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

interface CardWordInterface {
  word: string;
  image: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export const WordCard: FC<CardWordInterface> = ({
  word,
  wordTranslate,
  transcription,
  image,
  textMeaning,
  textMeaningTranslate,
  textExample,
  textExampleTranslate,
}) => {
  // collapse
  const [expanded, setExpanded] = useState(false);
  const handleCardExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.classList.toggle('btn_expand_opened');
    setExpanded(!expanded);
  };

  // difficulty btns
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Default);
  const handleDifficulty = (type: string) => {
    if (type === 'hard' && difficulty !== Difficulty.Hard) {
      setDifficulty(Difficulty.Hard);
    } else if (type === 'learned' && difficulty !== Difficulty.Learned) {
      setDifficulty(Difficulty.Learned);
    } else {
      setDifficulty(Difficulty.Default);
    }
  };

  // popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'word-statistic' : undefined;
  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="wordcard">
      <div className="wordcard-top">
        <div className="wordcard-top__content">
          <div className="wordcard-top__heading">
            <h4 className="wordcard__word">{word}</h4>
            <button className="wordcard__btn btn_sound">
              <SoundIcon className="wordcard__icon_sound" />
            </button>
          </div>
          <p className="wordcard__trsc">{transcription}</p>
          <p className="wordcard__trnsl">{wordTranslate}</p>
        </div>
        <div className="wordcard-top__controls">
          <div className="wordcard-top__controls_auth">
            <CardTooltip
              title="Отметить как изученное"
              disableInteractive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <button
                className={`wordcard__btn btn_learned ${
                  difficulty === Difficulty.Learned ? 'btn_learned_active' : ''
                }`}
                onClick={() => {
                  handleDifficulty('learned');
                }}
              >
                <CheckIcon className="wordcard__icon_check" />
              </button>
            </CardTooltip>

            <CardTooltip
              title="Добавить в “Сложные слова”"
              disableInteractive
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <button
                className={`wordcard__btn btn_hard ${
                  difficulty === Difficulty.Hard ? 'btn_hard_active' : ''
                }`}
                onClick={() => {
                  handleDifficulty('hard');
                }}
              >
                <StarIcon className="wordcard__icon_star" />
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
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
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
                  <p className="popover__score">0/100</p>
                </div>
                <div className="popover__sprint">
                  <p className="popover__subtitle">Спринт</p>
                  <p className="popover__score">0/100</p>
                </div>
              </div>
            </Popover>
          </div>
          <button
            className="wordcard__btn btn_expand"
            onClick={handleCardExpand}
          >
            <svg
              width="27"
              height="11"
              viewBox="0 0 27 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 1L13.5 9.33333L1 0.999998"
                stroke="#3C4758"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <Collapse in={expanded}>
        <div className="wordcard-bottom">
          <img className="wordcard__img" src={`/${image}`} alt={word} />

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
