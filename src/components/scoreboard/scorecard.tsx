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
            src={props.logo_url_home}
            alt={props.team_name_home + ' logo'}
            width={25}
            height={25}
          />
          <div className='team'>{props.abbr_home}</div>
          <div className='score'>{props.score_home}</div>
        </div>
        <div className='score-card-team_container'>
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
