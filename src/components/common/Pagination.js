import React from 'react';
import clsx from 'clsx';

import { useSelector, useDispatch } from 'react-redux';

const Pagination = ({ currentPage, totalPages, action }) => {

  const dispatch = useDispatch();
  const renderPagination = () => {
    let pages = [];

    if (totalPages <= 5) {
      // If there are 5 or less pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // For page 1 to 4, show pages 1-5, ellipsis, and the last page
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // For the last 4 pages, show the first page, ellipsis, and the last 5 pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // For page 5 and up, show the first page, ellipsis, current page - 1, current page, current page + 1, ellipsis, and the last page
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        className={clsx({
            'py-2 px-4 hover:bg-gray-200': true,
            'bg-blue-500 text-white rounded-full': page === currentPage,
        })}
        key={index}
        disabled={page === '...' || page === currentPage}
        onClick={() => page !== '...' && onPageChange(page)}
      >
        {page}
      </button>
    ));
  };

  const onPageChange = (page) => {
    // Update the current page state here or notify parent component
    // Implement the logic to update the current page
    dispatch(action(page));
    console.log('Page changed to: ', page);

  };

  return (
    <div className='flex space-x-2 text-slate-700'>
      {renderPagination()}
    </div>
  );
};

export default Pagination;
