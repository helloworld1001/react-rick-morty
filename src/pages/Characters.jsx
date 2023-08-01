import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';
import Preloader from '../components/Preloader';
import Pagination from '../components/Pagination';

import PaginateSwitcherBtn from '../components/PaginateSwitcherBtn';
import GoToTopBtn from '../components/GoToTopBtn';

const Characters = () => {
  const [currentPage, setCurrentPage] = useState('https://rickandmortyapi.com/api/character/?page=1');
  const [characters, setCharacters] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [totalPagesCount, setTotalPagesCount] = useState(0);
  const [showUpBtn, setShowUpBtn] = useState(false);
  const [isOnPagination, setIsOnPagination] = useState(false);
  const [changePageFlag, setChangePageFlag] = useState(false);

  const getCharacters = () => {
    if (fetching) {
      axios
        .get(currentPage)
        .then(response => {
          const data = response.data;
          setCharacters(prev => [...prev, ...data.results]);
          setCurrentPage(data.info.next);
          setTotalItemsCount(data.info.count);
          setTotalPagesCount(data.info.pages);
          setTimeout(() => {
            setFetching(false);
          }, 1000);
        })
        .catch(error => alert(`The following error occurred: ${error}`));
    }
  };

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
      characters.length < totalItemsCount
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

  const goToTopOfPage = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  const toggleToScrollMode = () => {
    setIsOnPagination(false);
    setCharacters([]);
    setCurrentPage('https://rickandmortyapi.com/api/character/?page=1');
    setFetching(true);
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleShowUpButton);
    return function () {
      document.removeEventListener('scroll', toggleShowUpButton);
    };
  }, []);

  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  useEffect(() => {
    if (!isOnPagination) {
      document.addEventListener('scroll', scrollHandler);
      return function () {
        document.removeEventListener('scroll', scrollHandler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, isOnPagination]);

  useEffect(() => {
    if (isOnPagination) {
      setCharacters([]);
      setCurrentPage('https://rickandmortyapi.com/api/character/?page=1');
      setFetching(true);
    }
  }, [isOnPagination]);

  useEffect(() => {
    if (isOnPagination) {
      setCharacters([]);
      setCurrentPage(currentPage);
      setFetching(true);
      setChangePageFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePageFlag]);

  return (
    <>
      <div className="container">
        <PaginateSwitcherBtn
          isOnPagination={isOnPagination}
          onClick={!isOnPagination ? () => setIsOnPagination(true) : () => toggleToScrollMode()}
        />
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

        <GoToTopBtn showUpBtn={showUpBtn} onClick={goToTopOfPage} />
        {isOpenModal && <ModalWindow closeModal={() => setIsOpenModal(false)} props={dataForModal} />}
        <Preloader fetching={fetching} />
        {isOnPagination && (
          <Pagination
            pageCount={totalPagesCount}
            selectCurrentPage={setCurrentPage}
            changePageFlag={() => setChangePageFlag(true)}
          />
        )}
      </div>
    </>
  );
};

export default Characters;
