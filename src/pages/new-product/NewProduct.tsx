import React from 'react';
import Form from '../../components/common/form/Form';
import './styles.scss';

const NewProduct: React.FC = () => {
  return (
    <>

      <div className='content-product-single'>
        <div className='header-product'>
          <h1 className='title-product'>Nuevo producto</h1>
        </div>
        <Form
          infoProduct={{}}
        />
      </div>

    </>
  )
}

export default NewProduct;