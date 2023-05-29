import "./scoreboard.scss";

const ScoreCard = () => {
  return (
    <div className="score-card">
      <a href="#" className="score-card-container">
        <div className="score-card-header">
          <div className="title">Title</div>
          <div className="state">State</div>
        </div>
        <div className="score-card-team_container">
          <div className="logo">Logo</div>
          <div className="team">Team</div>
          <div className="score">Score</div>
        </div>
      </a>
    </div>
  );
};

export default ScoreCard;
