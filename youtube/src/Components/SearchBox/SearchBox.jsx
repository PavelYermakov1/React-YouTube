/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './SearchBox.css';

const useInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => setValue(event.target.value);

  return { value, onChange: handleChange };
};

const Searchbox = ({ className, onSubmit }) => {
  const inputState = useInput();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <form className={`searchbox${className}`} onSubmit={onSubmit}>
        <input className="searchbox__submit" type="submit" value="" />
        <input
          className="searchbox__input"
          type="text"
          name="inputText"
          {...inputState}
          ref={inputRef}
        />
      </form>
    </>
  );
};
Searchbox.propTypes = {
  className: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbox;
