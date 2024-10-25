import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/restProducts';
import Form from '../../components/common/form/Form';
import './styles.scss';

const Product: React.FC = () => {
  const [infoProduct, setInfoProduct] = useState<any>(null);
  const { id } = useParams()

  useEffect(() => {
    const getProductFunc = async () => {
      const resp: any = await getProduct(id);
      if (resp?.data) setInfoProduct(resp?.data);
    }
    if (id) getProductFunc();
  }, [id]);
  console.log('#prid', infoProduct)
  return (
    <>
      {infoProduct?.title &&
        <div className='content-product-single'>
          <div className='header-product'>
            <h1 className='title-product'>{infoProduct.title}</h1>
            <div>
              <img src={infoProduct.image} alt={infoProduct.title} className='img-thm' />
            </div>
          </div>
          <Form
            infoProduct={infoProduct}
          />
        </div>
      }
    </>
  )
}

export default Product;