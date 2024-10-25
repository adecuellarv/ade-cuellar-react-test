
import React, { useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import Pagination from './pagination/Pagination';
import { Product } from '../../models';
import './styles.scss';

interface TableProps {
  products: Product[];
  currentPage: number;
  setCurrentPage: any;
}
let PageSize = 5;
const Table: React.FC<TableProps> = ({ products, currentPage, setCurrentPage }) => {

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products])

  const formatCurrency = (value: any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const titleBodyTemplate = (product: Product) => {
    return (
      <div className='title-product'>
        <p>{product.title}</p>
        <span>{product.description.length > 10
          ? `${product.description.slice(0, 50)}...`
          : product.description}</span>
      </div>
    );
  };

  const imageBodyTemplate = (product: Product) => {
    return <img src={product.image} alt={product.image} className="img-product" />;
  };

  const priceBodyTemplate = (product: Product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product: Product) => {
    return <Rating value={product.rating.rate} readOnly cancel={false} />;
  };

  const handleRowClick = (event: any) => {
    const clickedProduct = event.data;
    console.log('Clicked product:', clickedProduct);
  };

  return (
    <>
      <div className="card">
        <DataTable
          value={currentTableData}
          sortMode="multiple"
          tableStyle={{ minWidth: '60rem' }}
          onRowClick={handleRowClick}
        >
          <Column field="title" header="Nombre" body={titleBodyTemplate} sortable></Column>
          <Column header="Imagen" body={imageBodyTemplate}></Column>
          <Column field="price" header="Precio" body={priceBodyTemplate} sortable></Column>
          <Column field="category" header="Categoría" sortable></Column>
          <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
        </DataTable>
      </div>
      <div className="pagination-component">
        <Pagination
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default Table;