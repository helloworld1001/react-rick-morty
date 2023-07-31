import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';
import Preloader from '../components/Preloader';
import Pagination from '../components/Pagination';

import arrowUp from '../assets/img/arrowUpMini.png'


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
        .catch(error => console.log(`The following error occurred: ${error}`));
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
  }  

  useEffect(() => {
    document.addEventListener('scroll', toggleShowUpButton);
    return function () {
      document.removeEventListener('scroll', toggleShowUpButton);
    };
  }, []);

  useEffect(() => {
    getCharacters();
  }, [fetching]);

  useEffect(() => {
    if(!isOnPagination) {
        document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
    }
  }, [fetching, isOnPagination]);

  useEffect(() => {
    if(isOnPagination) {
      setCharacters([]);
      setCurrentPage('https://rickandmortyapi.com/api/character/?page=1');
      setFetching(true);
    }
     console.log(isOnPagination);
  },[isOnPagination])

  useEffect(() => {
    if(isOnPagination) {
      setCharacters([]);
      setCurrentPage(currentPage);
      setFetching(true);
      setChangePageFlag(false);
    }
     console.log(isOnPagination);
  },[changePageFlag])


  return (
    <>
    <button onClick={!isOnPagination? () => setIsOnPagination(true) : () => toggleToScrollMode()}>{isOnPagination? 'Pagination off' : 'Pagination on'}</button>
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
          <img src={arrowUp} alt="arrpowUp" />
        </div>
        {isOpenModal && <ModalWindow closeModal={() => setIsOpenModal(false)} props={dataForModal} />}
        <Preloader fetching={fetching}/>
        {isOnPagination && <Pagination pageCount={totalPagesCount} selectCurrentPage = {setCurrentPage} changePageFlag={() => setChangePageFlag(true)}/>}
      </div>
    </>
  );
};

export default Characters;
