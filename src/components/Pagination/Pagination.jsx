import React, { useState } from "react";
import "./pagination.scss";

const Pagination = ({
  totalItems = 90,
  itemsPerPage = 6,
  totalPagesNum,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = totalPagesNum || Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-button ${
              currentPage === i ? "pagination-button-active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
      }

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key={1}
            className={`pagination-button ${
              currentPage === 1 ? "pagination-button-active" : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(
            <span key="start-ellipsis" className="pagination-ellipsis">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-button ${
              currentPage === i ? "pagination-button-active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <span key="end-ellipsis" className="pagination-ellipsis">
              ...
            </span>
          );
        }
        pageNumbers.push(
          <button
            key={totalPages}
            className={`pagination-button ${
              currentPage === totalPages ? "pagination-button-active" : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
