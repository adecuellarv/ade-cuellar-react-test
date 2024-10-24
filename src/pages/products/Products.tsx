import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { selectProducts } from '../../store/selectors/productsSelector';
import { getProducts } from '../../api/restProducts';
import Table from '../../components/table/Table';
import './styles.scss';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const products = useSelector(selectProducts); console.log('products', products)

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated])

  useEffect(() => {
    const getProductsFunc = async () => {
      const resp = await getProducts();
      if (resp?.data) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: resp?.data,
        });
      }
    }
    getProductsFunc();
  }, [])

  return (
    <div>
      <div className='div-search'>
        <div className='container-input'>
          <input
            type='text'
            placeholder='Ej Snikers'
          //onChange={(e) => setEmail(e.target.value)}
          //onBlur={() => setEmailValid(emailRegex.test(email))}
          //className={!emailValid ? 'border-error' : ''}
          />
        </div>
        <div>
          <button className='button b-blue'>Buscar</button>
        </div>
      </div>
      <div className='div-table'>
        <Table products={products} />
      </div>
    </div>
  )
}

export default Products