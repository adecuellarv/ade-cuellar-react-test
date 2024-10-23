
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
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

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );
  const footer = `In total there are ${products ? products.length : 0} products.`;

  return (
    <div className="card">
      <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
        <Column field="title" header="Name" body={titleBodyTemplate}></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column field="category" header="Category"></Column>
        <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}

export default Table;