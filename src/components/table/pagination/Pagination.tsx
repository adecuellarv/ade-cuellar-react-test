import React from 'react';
import { usePagination, DOTS } from '../../../hooks/usePagination';
import './styles.scss';

interface PaginationProps {
  classes?: string;
  onPageChange: (page: number) => void; 
  totalCount: number; 
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  classes,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize
}) => {
    const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage < lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className="pagination-container"
        >
            <li
                className="pagination-item"
                onClick={onPrevious}
            >
                <div><i className="pi pi-arrow-circle-left" style={{ color: 'slateblue', fontSize: 22 }}></i></div>
            </li>
            {paginationRange.map((pageNumber: any, key: number) => {
                if (pageNumber === DOTS) {
                    return <li key={key}>&#8230;</li>;
                }

                return (
                    <li
                        className={`pagination-item ${currentPage === pageNumber ? 'current-page' : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                        key={key}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className='pagination-item'
                onClick={onNext}
            >
                <div><i className="pi pi-arrow-circle-right" style={{ color: 'slateblue', fontSize: 22 }}></i></div>
            </li>
        </ul>
    );
};

export default Pagination;