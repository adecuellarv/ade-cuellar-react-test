
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Product } from '../../models';
import './styles.scss';

interface TableProps {
  products: Product[];
}

const Table: React.FC<TableProps> = ({ products }) => {

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
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const handleRowClick = (event: any) => {
    const clickedProduct = event.data;
    console.log('Clicked product:', clickedProduct);
  };

  return (
    <div className="card">
      <DataTable
        value={products}
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
  );
}

export default Table;