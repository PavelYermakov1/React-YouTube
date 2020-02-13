import React from 'react';
import PropTypes from 'prop-types';

import './buttons.css';

const Buttons = ({
  numberOfPages, page, onPageChange, onPreload,
}) => {
  const handleMoveToPreviousPage = () => {
    onPageChange(page - 1);
  };

  const handleMoveToNextPage = () => {
    if (page >= numberOfPages - 3) onPreload();

    onPageChange(page + 1);
  };

  return (
    <div className="container_buttons">
      <button type="button" className="button_previous" onClick={handleMoveToPreviousPage} />
      <div className="button_current">{page >= 0 ? page + 1 : 1}</div>
      <button type="button" className="button_next" onClick={handleMoveToNextPage} />
    </div>
  );
};

Buttons.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPreload: PropTypes.func.isRequired,
};

export default Buttons;
