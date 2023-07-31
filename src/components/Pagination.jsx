import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({pageCount, selectCurrentPage, changePageFlag}) => {
    return (
        <ReactPaginate
        className='pagination'
        activeClassName='activePage'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={event => {selectCurrentPage(`https://rickandmortyapi.com/api/character/?page=${event.selected + 1}`); changePageFlag()}}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    );
}

export default Pagination;
