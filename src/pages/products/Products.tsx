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
      <div>
        <Table products={products} />
      </div>
    </div>
  )
}

export default Products