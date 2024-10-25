import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/common/form/Form';
import './styles.scss';

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='btn-return'>
        <i
          className="pi pi-arrow-left"
          style={{ fontSize: '1rem' }}
          onClick={() => navigate('/products')}
        > Regresar</i>
      </div>
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