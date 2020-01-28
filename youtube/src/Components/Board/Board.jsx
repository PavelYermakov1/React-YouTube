/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Card from '../Card/Card';

import './Board.css';

const Board = ({
  cards, numberOfPages, page, onPageChange, onPreload,
}) => {
  if (page < 0) setTimeout(() => onPageChange(0), 250);

  const [slideState, setSlideState] = useState(false);
  const [slideValue, setSlideValue] = useState('0px');
  const [xOnStart, setXOnStart] = useState(0);

  const handlePointerDown = (event) => {
    if (!event.target.closest('.card') || event.target.closest('.card__title-link')) return;

    setSlideState(true);
    setXOnStart(event.clientX);
  };

  const handlePointerMove = (event) => {
    event.preventDefault();

    if (!slideState) {
      setSlideValue('0px');
      return;
    }

    event.persist();

    requestAnimationFrame(() => {
      setSlideValue(`${event.clientX - xOnStart}px`);
    });
  };

  const handlePointerUp = (event) => {
    if (!slideState) return;

    const direction = -Math.sign(event.clientX - xOnStart);

    if ((page > 0 || direction > 0) && (page < numberOfPages || direction < 0)) {
      onPageChange(page + direction);
    }

    if (page >= numberOfPages - 3) onPreload();

    setSlideState(false);
    setSlideValue('0px');
  };

  const className = slideState ? ' sliding' : '';
  const style = {
    '--cards': cards.length,
    '--page': page,
    '--slide': slideValue,
  };

  return (
    <>
      <ul
        className={`board${className}`}
        style={style}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerUp}
        onPointerUp={handlePointerUp}
      >
        {cards.map((card, index) => {
          const key = card.id + index;
          return <Card {...card} key={key} />;
        })}
      </ul>
    </>
  );
};
Board.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      channel: PropTypes.string,
      date: PropTypes.string,
      views: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  numberOfPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPreload: PropTypes.func.isRequired,
};
export default Board;
