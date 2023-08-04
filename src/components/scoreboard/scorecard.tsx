import './scoreboard.scss';

import Image from 'next/image';

type scoreCardData = {
  title: string;
  state: string;
  logo_url_home: string;
  team_name_home: string;
  abbr_home: string;
  score_home: number;
  logo_url_away: string;
  team_name_away: string;
  abbr_away: string;
  score_away: number;
};

const ScoreCard = (props: scoreCardData) => {
  let homeWon: boolean | null = null;
  let gameFinished: boolean;

  if (props.state === 'Final') {
    gameFinished = true;
  } else {
    gameFinished = false;
  }
  console.log(gameFinished);
  if (props.state !== 'Final') {
    homeWon = null;
  } else if (props.score_home > props.score_away) {
    homeWon = true;
  } else {
    homeWon = false;
  }

  const gameState = () => {
    if (gameFinished && props.score_home > props.score_away) {
      return 'home won';
    } else if (gameFinished && props.score_home < props.score_away) {
      return 'visitor won';
    } else {
      return '';
    }
  };

  return (
    <div className='score-card'>
      <a href='#' className='score-card-container'>
        <div className='score-card-header'>
          <div className='title'>{props.title}</div>
          <div className='state'>{props.state}</div>
        </div>
        <div
          className={
            'score-card-team_container' +
            (gameState() === 'home won' ? ' winner' : '')
          }
        >
          <Image
            className='logo'
            src={props.logo_url_home}
            alt={props.team_name_home + ' logo'}
            width={25}
            height={25}
          />
          <div className='team'>{props.abbr_home}</div>
          <div className='score'>{props.score_home}</div>
        </div>
        <div
          className={
            'score-card-team_container' +
            (gameState() === 'visitor won' ? ' winner' : '')
          }
        >
          <Image
            className='logo'
            src={props.logo_url_away}
            alt={props.team_name_away + ' logo'}
            width={25}
            height={25}
          />
          <div className='team'>{props.abbr_away}</div>
          <div className='score'>{props.score_away}</div>
        </div>
      </a>
    </div>
  );
};

export default ScoreCard;
