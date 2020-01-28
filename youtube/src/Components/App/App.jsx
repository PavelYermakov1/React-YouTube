/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';

import Searchbox from '../SearchBox/SearchBox';
import Board from '../Board/Board';
import Buttons from '../Buttons/Buttons';

import process from '../../Services/apiService';

import './App.css';
import './mediaQueries.css';


const App = () => {
  const [searchboxClassName, setSearchboxClassName] = useState(' searchbox_initial');
  const [query, setQuery] = useState(null);
  const [nextChunk, setNextChunk] = useState(null);
  const [cards, setCards] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setCardsPerPage(+getComputedStyle(document.body).getPropertyValue('--cards-per-page'));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerPage = +getComputedStyle(document.body).getPropertyValue('--cards-per-page');

      if (newCardsPerPage !== cardsPerPage) {
        const newPage = Math.floor((page * cardsPerPage) / newCardsPerPage);
        setCardsPerPage(newCardsPerPage);
        setPage(newPage);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [cardsPerPage, page]);

  const handleQuerySubmit = async (event) => {
    event.preventDefault();

    const input = event.target.inputText.value;
    const { data, nextChunkToken } = await process(input);

    setSearchboxClassName('');
    setQuery(input);
    setNextChunk(nextChunkToken);
    setCards(data);
    setPage(0);
  };

  const handleDataPreload = async () => {
    const { nextChunkToken, data } = await process(query, nextChunk);

    setNextChunk(nextChunkToken);
    setCards((prevData) => [...prevData, ...data]);
  };

  return (
    <>
      <Searchbox className={searchboxClassName} onSubmit={handleQuerySubmit} />
      {cards && (
        <>
          <Board
            cards={cards}
            numberOfPages={cards.length / cardsPerPage}
            page={page}
            onPageChange={setPage}
            onPreload={handleDataPreload}
          />
          <Buttons />
        </>
      )}
    </>
  );
};

export default App;
