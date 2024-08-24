"use client";
import React, { useState, useRef, useEffect } from "react";

import ScoreCard from "./scorecard";

import { gameData } from "@/lib/getGameData";

const getWindowDimensions = () => {
  const width = window.innerWidth;
  return width;
};

const ScoreBoard = ({ gameData }: any) => {
  const [index, setIndex] = useState(0);
  const scoreboardList = useRef<null | HTMLUListElement>(null);
  let [numOfScoreboardItems, setNum] = useState<number>(0);
  let [slideValue, setSlideValue] = useState<number>(0);
  let [data, setData] = useState<gameData[]>(gameData);
  let [scoreCardWidth, setScoreCardWidth] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(0);

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
    updateScoreCardWidth();
    setSlideValue(0);
    setIndex(0);
  };

  useEffect(() => {
    if (scoreboardList.current) {
      setScoreCardWidth(scoreboardList.current?.children[0].clientWidth);
      setNum(scoreboardList.current?.childNodes.length);
    }
    setData(gameData);
    setWindowDimensions(getWindowDimensions());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [gameData, windowDimensions]);

  const slideLeft = (): void => {
    windowDimensions > 767
      ? setSlideValue(slideValue + scoreCardWidth! * 2)
      : setSlideValue(slideValue + scoreCardWidth! * 1);
    setIndex(index - 1);
  };
  const slideRight = (): void => {
    windowDimensions > 767
      ? setSlideValue(slideValue - scoreCardWidth! * 2)
      : setSlideValue(slideValue - scoreCardWidth! * 1);
    setIndex(index + 1);
  };

  const updateScoreCardWidth = () => {
    if (scoreboardList.current)
      setScoreCardWidth(scoreboardList.current?.children[0].clientWidth);
  };

  return (
    <div className="scoreboard">
      <button
        className="arrowContainer left"
        onClick={slideLeft}
        disabled={index === 0 ? true : false}
        aria-label="left button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-chevron-left arrow"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
      <ul
        className="scoreboard-list"
        ref={scoreboardList}
        style={{
          transition: "transform 400ms ease-in-out 0s",
          overflow: "unset",
          transform: `translate3d(${slideValue}px, 0px, 0px)`,
        }}
      >
        {data!.map((item) => (
          <ScoreCard
            team_name_home={item.HomeTeamInfo.team_name}
            abbr_home={item.HomeTeamInfo.team_abbreviation}
            title={item.Date.toString().substring(0, 10)}
            logo_url_home={item.HomeTeamInfo.logo_url}
            score_home={item.PTS_Home}
            state={item.Start ? item.Start : "Final"}
            abbr_away={item.AwayTeamInfo.team_abbreviation}
            logo_url_away={item.AwayTeamInfo.logo_url}
            score_away={item.PTS_Away}
            team_name_away={item.Visitor}
            key={item._id.toString()}
          />
        ))}
      </ul>
      <button
        className="arrowContainer right"
        onClick={slideRight}
        disabled={
          windowDimensions > 767
            ? Math.ceil(numOfScoreboardItems / 2) - 1 === index
              ? true
              : false
            : Math.ceil(numOfScoreboardItems / 1) - 1 === index
            ? true
            : false
        }
        aria-label="right button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-chevron-right arrow"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScoreBoard;
