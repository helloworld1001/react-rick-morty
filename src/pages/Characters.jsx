import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';

import arrowUp from '../assets/img/arrowUpMini.png'

const Characters = () => {
  const [currentPage, setCurrentPage] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [characters, setCharacters] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [showUpBtn, setShowUpBtn] = useState(false);

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
      characters.length < totalCount
    ) {
      setFetching(true);
    }
  };

  const toggleShowUpButton = () => {
    if (window.scrollY > 700) {
      setShowUpBtn(true);
    } else {
      setShowUpBtn(false);
    }
  };

  const goToTopOfPage = () => (
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }));
  

  useEffect(() => {
    getCharacters();
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', toggleShowUpButton);
    return function () {
      document.removeEventListener('scroll', toggleShowUpButton);
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
          setFetching(false);
        })
        .catch(error => console.log(`The following error occurred: ${error}`));
    }
  };

  return (
    <div className="container">
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

      <div className={`scroll-top ${showUpBtn ? `isShowBtn` : `isHideBtn`}`} onClick={goToTopOfPage}>
        <img src={arrowUp} alt='arrpowUp'/>
      </div>
      {isOpenModal && <ModalWindow closeModal={() => setIsOpenModal(false)} props={dataForModal} />}

    </div>
  );
};

export default Characters;
