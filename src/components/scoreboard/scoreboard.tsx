'use client';
import React, { useState, Children, useRef, useEffect } from 'react';

const ScoreBoard = ({ children }: any) => {
  const [index, setIndex] = useState(0);
  let [numOfScoreboardItems, setNum] = useState<number | undefined>(0);
  const scoreboardList = useRef<null | HTMLUListElement>(null);
  let slideValue: number | undefined = 0;

  useEffect(() => {
    setNum(scoreboardList.current?.children.length);
  }, []);

  const slideLeft = (): void => {
    console.log(numOfScoreboardItems);
    if (slideValue !== 0) {
      slideValue = scoreboardList.current?.scrollWidth;
    }
  };
  const slideRight = (): void => {
    // numOfScoreboardItems = scoreboardList.current?.children.length;
  };

  return (
    <div className='scoreboard'>
      <button className='arrowContainer left' onClick={slideLeft}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
          className='bi bi-chevron-left arrow'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
          />
        </svg>
      </button>
      <ul
        className='scoreboard-list'
        ref={scoreboardList}
        style={{
          transition: 'transform 400ms ease-in-out 0s',
          overflow: 'unset',
          transform: `translate3d(${slideValue}px, 0px, 0px)`,
        }}
      >
        {Children.map(children, (child, index) => (
          <li className='scoreboard-list-item' data-index={index}>
            {child}
          </li>
        ))}
      </ul>
      <button className='arrowContainer right' onClick={slideRight}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
          className='bi bi-chevron-right arrow'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
          />
        </svg>
      </button>
    </div>
  );
};

export default ScoreBoard;
