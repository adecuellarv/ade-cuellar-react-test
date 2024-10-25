import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { useAuth } from '../../context/AuthContext';
import { selectProducts } from '../../store/selectors/productsSelector';
import { getProducts } from '../../api/restProducts';
import Table from '../../components/table/Table';
import { searchFilter } from '../../helpers/common';
import './styles.scss';


const Products: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const products = useSelector(selectProducts);
  const [productsFilter, setProductsFilter] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated])

  useEffect(() => {
    setCurrentPage(1);
    if (searchWord) {
      const filter: any = searchFilter(searchWord, products);
      setProductsFilter(filter);
    } else setProductsFilter(products);
  }, [searchWord]);

  useEffect(() => {
    if (products?.length) setProductsFilter(products);
  }, [products]);

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
    <>
      <div className='div-add'>
        <Button onClick={() => navigate('/agregar')}>Agregar nuevo</Button>
      </div>
      <div className='div-search'>
        <div className='container-input'>
          <input
            type='text'
            placeholder='Ej Snikers'
            onChange={(e) => setSearchWord(e?.target?.value)}
          />
        </div>
      </div>
      <div className='div-table'>
        <Table
          products={productsFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}

export default Products