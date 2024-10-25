import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { getProduct, deleteProduct } from '../../api/restProducts';
import Form from '../../components/common/form/Form';
import './styles.scss';

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [infoProduct, setInfoProduct] = useState<any>(null);
  const { id } = useParams()

  const handleDeleteProduct = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, proceder',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteProduct(id);
        if(resp) navigate('/products')
      }
    });
  }

  useEffect(() => {
    const getProductFunc = async () => {
      const resp: any = await getProduct(id);
      if (resp?.data) setInfoProduct(resp?.data);
    }
    if (id) getProductFunc();
  }, [id]);
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
          <div className='delete-container'>
            <Button onClick={handleDeleteProduct} severity="danger">Eliminar producto</Button>
          </div>
        </div>
      }
    </>
  )
}

export default Product;