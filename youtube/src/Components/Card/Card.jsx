/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = ({
  id, thumbnail, title, channel, date, views, description,
}) => (
  <li className="card">
    <img className="card__thumbnail" src={thumbnail} alt={title.slice(0, 50)} />
    <div className="card__title">
      <a className="card__title-link" href={`https://www.youtube.com/watch?v=${id}`}>
        {title.slice(0, 50)}
      </a>
    </div>
    <div className="card__info card__info_channel">{channel}</div>
    <div className="card__info card__info_date">{date.slice(0, 10)}</div>
    <div className="card__info card__info_views">{views}</div>
    <div className="card__description">{description.slice(0, 100)}</div>
  </li>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
