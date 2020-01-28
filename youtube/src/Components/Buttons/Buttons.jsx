/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable linebreak-style */
import React from 'react';
// import PropTypes from 'prop-types';

import './Buttons.css';

const Buttons = () => (
  <div className="container_buttons">
    <button type="button" className="button_previous" />
    <div className="button_current" />
    <button type="button" className="button_next" />
  </div>
);

Buttons.propTypes = {

};

export default Buttons;
