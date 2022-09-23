import React, { useEffect, useState } from 'react';

interface PaginationProps {
  totalPages: number,
  page: number,
  setPage: Function
}

const Pagination = ({ totalPages, page, setPage } : PaginationProps) => {

  const [middleNumbers, setMiddleNumbers] = useState<{ first: number, middle: number, last: number}>({ first: 0, middle: 0, last: 0 });
  const [renderFirstButton, setRenderFirstButton] = useState<boolean>(true);
  const [renderLastButton, setRenderLastButton] = useState<boolean>(false);
  const currentPage = page + 1;

  useEffect(() => {
    if (currentPage + 2 >= totalPages) setRenderLastButton(true);
    else setRenderLastButton(false);
    if (currentPage - 2 <= 1) setRenderFirstButton(true);
    else setRenderFirstButton(false);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (renderFirstButton) {
      const middle = 4;
      setMiddleNumbers({ first: 3, middle, last: 5 });
    } else if (!renderFirstButton && !renderLastButton) {
      const middle = currentPage;
      setMiddleNumbers({ first: middle - 1, middle, last: middle + 1 });
    } else if (renderLastButton) {
      const middle = totalPages - 3;
      setMiddleNumbers({ first: middle - 1, middle, last: middle + 1 });
    }
  }, [currentPage, renderFirstButton, renderLastButton, totalPages]);

  const handleClickPrevious = () => {
    setPage(page-1);
  }
  const handleClickNext = () => {
    setPage(currentPage);
  }

  const handleButtonClick = (page: number) => {
    setPage(page-1);
  }

  return (
    <>
      <nav className='pagination-nav'>
        <ul className='pagination'>
          <li>
            <button
              className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handleClickPrevious()} disabled={currentPage === 1 ? true : false}
            >
              <svg className='' viewBox="0 0 24 24" >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              className={`pagination-button ${currentPage === 1 ? 'selected' : ''}`}
              onClick={() => handleButtonClick(1)}
            >
              1
            </button>
          </li>
          <li>
            {renderFirstButton ? (
              <button
                onClick={() => handleButtonClick(2)}
                className={`pagination-button ${currentPage === 2 ? 'selected' : ''}`}
              >
                2
              </button>
              ) :
              (
                <div className='pagination-button ellipsis'>...</div>
              )
            }
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(middleNumbers.first)}
              className={`pagination-button ${currentPage === middleNumbers.first ? 'selected' : ''}`}
            >
              {middleNumbers.first}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(middleNumbers.middle)}
              className={`pagination-button ${currentPage === middleNumbers.middle ? 'selected' : ''}`}
            >
              {middleNumbers.middle}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(middleNumbers.last)}
              className={`pagination-button ${currentPage === middleNumbers.last ? 'selected' : ''}`}
            >
              {middleNumbers.last}
            </button>
          </li>
          <li>
            {renderLastButton ? (
                <button
                  onClick={() => handleButtonClick(totalPages - 1)}
                  className={`pagination-button ${currentPage === totalPages-1 ? 'selected' : ''}`}
                >
                  {totalPages - 1}
                </button>
              ) :
              (
                <div className='pagination-button ellipsis'>...</div>
              )
            }
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(totalPages)}
              className={`pagination-button ${currentPage === totalPages ? 'selected' : ''}`}
            >
              {totalPages}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClickNext()}
              className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              disabled={currentPage === totalPages ? true : false}
            >
              <svg className="" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
