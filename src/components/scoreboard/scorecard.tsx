import './scoreboard.scss';

import Image from 'next/image';

type scoreCardData = {
  title: string;
  state: string;
  logo_url: string;
  team_name: string;
  abbr: string;
  score: string;
};

const ScoreCard = (props: scoreCardData) => {
  return (
    <div className='score-card'>
      <a href='#' className='score-card-container'>
        <div className='score-card-header'>
          <div className='title'>{props.title}</div>
          <div className='state'>{props.state}</div>
        </div>
        <div className='score-card-team_container'>
          <Image
            className='logo'
            src={props.logo_url}
            alt={props.team_name + ' logo'}
            width={25}
            height={25}
          />
          <div className='team'>{props.abbr}</div>
          <div className='score'>{props.score}</div>
        </div>
        <div className='score-card-team_container'>
          <Image
            className='logo'
            src={props.logo_url}
            alt={props.team_name + ' logo'}
            width={25}
            height={25}
          />
          <div className='team'>{props.abbr}</div>
          <div className='score'>{props.score}</div>
        </div>
      </a>
    </div>
  );
};

export default ScoreCard;
