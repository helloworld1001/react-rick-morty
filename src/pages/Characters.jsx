import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';

const Characters = () => {
  const [currentPage, setCurrentPage] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [characters, setCharacters] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
      characters.length < totalCount
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    console.log(fetching);
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const getCharacters = () => {
    if (fetching) {
      axios
        .get(currentPage)
        .then(response => {
          const data = response.data;
          setCharacters(prev => [...prev, ...data.results]);
          setCurrentPage(data.info.next);
          setTotalCount(data.info.count);
          console.log(data.info);
          setFetching(false);
        })
        .catch(error => console.log(`The following error occurred: ${error}`));
    }
  };

  const printInfo = () => {
    console.log(characters);
  };

  return (
    <div className="container">
      <button onClick={printInfo}>Print info</button>

      <div className="characters-wrapper">
        {characters.map(data => (
          <Card
            key={data.id}
            openModal={() => setIsOpenModal(true)}
            setDataForModal={() => setDataForModal(data)}
            {...data}
          />
        ))}
      </div>
      {isOpenModal && <ModalWindow closeModal={() => setIsOpenModal(false)} props={dataForModal} />}
    </div>
  );
};

export default Characters;
